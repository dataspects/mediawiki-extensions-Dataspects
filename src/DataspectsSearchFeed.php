<?php

namespace MediaWiki\Extension\DataspectsSearch;

use MeiliSearch\Client;
use MediaWiki\Logger\LoggerFactory;



class DataspectsSearchFeed {

  public function __construct(\Title $title) {
    $this->logger = LoggerFactory::getInstance( 'dataspects' );
    $this->title = $title;
	  $this->fullArticlePath = $GLOBALS['wgServer'].str_replace("$1", "", $GLOBALS['wgArticlePath']);
    $meiliClient = new \MeiliSearch\Client($GLOBALS['wgDataspectsSearchURL'], $GLOBALS['wgDataspectsSearchKey']);
    $this->index = $meiliClient->index($GLOBALS['wgDataspectsSearchIndex']);
    $this->elementsToBeRemoved = array(
      "tags" => ["editsection"],
      "classes" => [],
      "ids" => ["ds0__topicMetaTemplate"]
    );
  }

  static function deleteFromDatastore($id) {
		// Run this code immediately rather than through a job.
		$url = $GLOBALS['wgDataspectsApiURL'].$GLOBALS['wgDataspectsSearchID']."/pages/".$id;
		$req = \MWHttpRequest::factory(
		$url,
		[
			"method" => "delete"
		],
		__METHOD__
		);
		$req->setHeader("Authorization", "Bearer ".$GLOBALS['wgDataspectsApiKey']);
		$req->setHeader("content-type", "application/json");
		$req->setHeader("accept", "application/json");
		$status = $req->execute();
		if($status->isOK()) {
			
		} else {
			echo $status;
		}
	}

  public function sendToDatastore() {
    $this->logger->debug($this->title->mTextform);
    $this->annotations = [];
    $this->wikiPage = \WikiPage::factory($this->title);
    /*
    * The getMediaWikiPage's full.html expects $this->parsedWikitext.
    * However, for some namespaces we don't want $this->parsedWikitext.
    * That's why we default $this->parsedWikitext = ""; and if we want
    * $this->parsedWikitext for a specific namespace we set it by
    * $this->getParsedWikitext();.
    */
    $this->parsedWikitext = null;
    switch($this->title->mNamespace) {
      case 0:
      case 6:
        $this->getCategories();
        $this->getWikitext();
        $this->getParse();
        $this->parsedWikitext = $this->getParsedWikitext($this->wikitext);
        $this->getMediaWikiPageAnnotations();
        $this->getIncomingAndOutgoingLinks();
        $this->mediaWikiPage = $this->getMediaWikiPage();
	    break;
      case 4:
        $this->getCategories();
        $this->getWikitext();
        $this->parsedWikitext = $this->getParsedWikitext($this->wikitext);
        $this->getMediaWikiPageAnnotations();
        $this->getIncomingAndOutgoingLinks();
        $this->mediaWikiPage = $this->getMediaWikiPage();
        break;
      case 102:
        $this->getCategories();
        $this->getPredicateAnnotations();
        $this->mediaWikiPage = $this->getMediaWikiPage();
        break;
      case 10:
      case 108:
      case 102:
      case 106:
      case 828:
        $this->getCategories();
        $this->getWikitext();
        $this->mediaWikiPage = $this->getMediaWikiPage();
        break;
      default:
        echo "ERROR in determining namespace ".$this->title->mNamespace."\n";
        break;
    }
    $this->addPage();
  }

  /*
    LEX2106251826: https://search.dataspects.com/understand/
  */
  private function getCategories() {
    $this->categories = array();
    $categories = $this->wikiPage->getCategories();
    foreach($categories as $category) {
      $this->categories[] = $this->fullArticlePath.$category->mTextform;
    }
  }

  private function getWikitext() {
    $revision = $this->wikiPage->getRevision();
    if(empty($revision)) {
      $this->wikitext = '';
    } else {
      $content = $revision->getContent( \Revision::RAW );
      $this->wikitext = \ContentHandler::getContentText( $content );
    }
  }

  private function getParsedWikitext($wikitext) {
    $parser = new \Parser();
    $parserOptions = new \ParserOptions();
    $parsedWikitext = $parser->parse($wikitext, $this->title, $parserOptions);
    if($parsedWikitext->mText) {
      return $parsedWikitext->mText;
    }
  }

  private function getParse() {
    $params = new \FauxRequest(
      array(
        'action' => 'parse',
	'page' => $this->title,
	# The following prop list is also used in dataspects-cli/mediawiki/loaders.go (LEX2106281051)
        "prop" => "categories|templates|images|externallinks|sections",
        "disablelimitreport" => "yes",
        "disableeditsection" => "yes",
      )
    );
    $api = new \ApiMain( $params );
    $api->execute();
    $data = $api->getResult()->getResultData();
    foreach($data["parse"]["sections"] as $i => $section) {
      if(is_numeric($i)) {
            $this->sections[] = $section;
      }
    }
    foreach($data["parse"]["templates"] as $template) {
      if(is_array($template)) {
        $this->templates[] = $template;
      }
    }
    $this->images = array();
    foreach($data["parse"]["images"] as $i => $image) {
    	if(is_numeric($i)) {
        $this->images[] = $image;
      }
    }
    foreach($data["parse"]["externallinks"] as $i => $externalLink) {
	    if(is_numeric($i)) {
                $this->outgoingLinks[] = $externalLink;
        }
    }
  }

  private function getMediaWikiPageAnnotations() {
    $data = $this->browseBySubject($this->title);
    foreach($data['query']['data'] as $property) {
      if(is_array($property)) {
        $propertyName = $property['property'];
        if($propertyName[0] != '_') {
		foreach($property['dataitem'] as $object) {
			if(is_array($object)) {
			$source = str_replace('#0##', '', $object['item']);
			$smwLiteral = $source;
			  if($object['type'] == 9) {
				$source = $this->fullArticlePath.$source;
			  }
              $this->annotations[] = array(
                'subject' => strtolower($this->title->getFullURL()),
                'predicate' => $propertyName,
                'objectLiteral' => $source,
                'objectLiteralHTML' => $this->getParsedWikitext($source),
                'smwPropertyType' => $object['type']
              );
            }
          }
        }
      }
    }
  }

  private function getIncomingAndOutgoingLinks() {
    foreach($this->title->getLinksFrom() as $linkFrom) {
	$this->outgoingLinks[] = $linkFrom->getInternalURL();
    }
    foreach($this->title->getLinksTo() as $linkTo) {
        $this->incomingLinks[] = $linkTo->getInternalURL();
    }
  }

  private function getPredicateAnnotations() {
    $data = $this->browseBySubject($this->title);
    foreach($data['query']['data'] as $property) {
      if(is_array($property)) {
        $propertyName = $property['property'];
        foreach($property['dataitem'] as $object) {
          if(is_array($object)) {
            $this->annotations[$propertyName] = array(
              'objectLiteral' => $object['item'],
              'smwPropertyType' => $object['type']
            );
          }
        }
      }
    }
  }

  

  

  

  // private function updatePage($pageID) {
  //   $req = \MWHttpRequest::factory(
  //     $this->url."/".$pageID,
  //     [
  //       "method" => "post",
  //       "postData" => $this->mediaWikiPage
  //     ],
  //     __METHOD__
  //   );
  //   $req->setHeader("Authorization", "Bearer ".$GLOBALS['wgDataspectsApiKey']);
  //   $req->setHeader("content-type", "application/json");
  //   $req->setHeader("accept", "application/json");
  //   $status = $req->execute();
  //   if($status->isOK()) {
  //     echo $this->title->getFullURL()." updated\n";
  //   } else {
  //     echo $status;
  //   }
  // }  

  # LEX200122141600
  private function getMediaWikiPage() {
    $mediaWikiPage = [
      "id" => $GLOBALS['wgDataspectsSearchMediaWikiID']."_".$this->title->getArticleID(),// https://docs.meilisearch.com/learn/core_concepts/primary_key.html#formatting-the-document-id
      "name" => $this->title->mTextform,
      "eppo0__hasEntityTitle" => $this->title->mTextform,
      "mw0__rawUrl" => $this->title->getInternalURL(),
      "mw0__namespace" => $this->getNamespace($this->title->mNamespace),
      "mw0__wikitext" => trim($this->wikitext),
      "mw0__text" => $this->mw0__text($this->parsedWikitext),
      // "sections" => $this->sections,
      // "templates" => $this->templates,
      // "outgoingLinks" => $this->outgoingLinks,
      // "incomingLinks" => $this->incomingLinks,
      // "images" => $this->images,
    ];
    $mediaWikiPage = $this->processAnnotations($mediaWikiPage);
    $mediaWikiPage = $this->processCategories($mediaWikiPage);
    $mediaWikiPage = $this->processSources($mediaWikiPage);
    return $mediaWikiPage;
  }

  private function mw0__text($parsedWikitext) {
    $dom = new \DOMDocument('1.0', 'utf-8');
    $dom->loadHTML($parsedWikitext);
    $xpath = new \DomXPath($dom);
    foreach ($this->elementsToBeRemoved["ids"] as $id) {
      if($mwParserOutput = $xpath->query("//div[@id = '$id']")->item(0)) {
        $mwParserOutput->parentNode->removeChild($mwParserOutput);
      }      
    }
    foreach ($this->elementsToBeRemoved["tags"] as $tag) {
      $editSections = $xpath->query("//$tag");
      foreach($editSections as $editSection){
        $editSection->parentNode->removeChild($editSection);
      }
    }
    return $dom->textContent;
  }

  private function processSources($mediaWikiPage) {
    $mediaWikiPage = array_merge($mediaWikiPage, [
      "ds0__source" => ["https://mwstake.org/mwstake/wiki/", $this->getNamespace($this->title->mNamespace)],
      "ds0__source.1v10" => "Source",
      "ds0__source.1v11" => "Source > https://mwstake.org/mwstake/wiki/",
      "ds0__source.1v12" => "Source > https://mwstake.org/mwstake/wiki/ > ".$this->getNamespace($this->title->mNamespace)
    ]);
    return $mediaWikiPage;
  }

  private function processCategories($mediaWikiPage) {
    $eppo0__categories = array();
    foreach ($this->categories as $category) {
      if(!in_array(basename($category), [$mediaWikiPage["eppo0__hasEntityType"], "Pages using DynamicPageList3 parser function"])) {
        $eppo0__categories[] = basename($category);
      }
    }
    if(!empty($eppo0__categories)) {
      $mediaWikiPage = array_merge($mediaWikiPage, [
        "eppo0__categories" => $eppo0__categories,
      ]);
    }
    return $mediaWikiPage;
  }

  private function processAnnotations($mediaWikiPage) {
    $showAnnotations = [];
    foreach ($this->annotations as $key => $annotation) {
      switch ($annotation["predicate"]) {
        case "Eppo0:hasEntityType":
          $mediaWikiPage = array_merge($mediaWikiPage, [
            "eppo0__hasEntityType" => $annotation["objectLiteral"],
            "eppo0__hasEntityType.1v10" => "Topic Type",
            "eppo0__hasEntityType.1v11" => "Topic Type > ".$annotation["objectLiteral"],
          ]);
          break;
        case "Eppo0:hasEntityTitle":
          // This overwrites: "eppo0__hasEntityTitle" => $this->title->mTextform
          $mediaWikiPage = array_merge($mediaWikiPage, [
            "eppo0__hasEntityTitle" => $annotation["objectLiteral"],
          ]);
          break;
        default:
          if (!str_starts_with($annotation["predicate"], 'Eppo0')) {
            $showAnnotations[] = $annotation;
          }
          break;
      }
    }
    $mediaWikiPage["annotations"] = $showAnnotations;
    return $mediaWikiPage;
  }

  private function addPage() {
    $result = $this->index->addDocuments([$this->mediaWikiPage]);
    // echo $result["uid"];
    // $req = \MWHttpRequest::factory(
    //   $this->url,
    //   [
    //     "method" => "post",
    //     "postData" => $this->mediaWikiPage
    //   ],
    //   __METHOD__
    // );
    // $req->setHeader("Authorization", "Bearer ".$GLOBALS['wgDataspectsApiKey']);
    // $req->setHeader("content-type", "application/json");
    // $req->setHeader("accept", "application/json");
    // $status = $req->execute();
    // if($status->isOK()) {
    //   echo "DATASPECTS: page JSON ".$this->title->getFullURL()." created\n";
    //   echo "DATASPECTS: page sent to ".$this->url."\n";
    // } else {
    //   echo "DATASPECTS: ".$status;
    // }
  }

  private function getNamespace($index) {
    if($index == 0) {
      $namespace = 'main';
    } else {
      $namespace = \MWNamespace::getCanonicalName($index);
    }
    return ucfirst($namespace);
  }

  private function browseBySubject(string $title) {
    $params = new \FauxRequest(
      array(
        'action' => 'browsebysubject',
        'subject' => $title
      )
    );
    $api = new \ApiMain( $params );
    $api->execute();
    $data = $api->getResult()->getResultData();
    return $data;
  }

}
