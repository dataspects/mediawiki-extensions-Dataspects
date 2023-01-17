<?php


namespace MediaWiki\Extension\Dataspects;

use MediaWiki\MediaWikiServices;

use ManualLogEntry;

class DataspectsFeed {

  public function __construct(\Title $title, $user, $dsNeo4j, $meiliClient, $params) {
    $this->sdf = new SpecialDataspectsFeed($this, $title, $user);
    $this->title = $title;
    $this->user = $user;
	  $this->fullArticlePath = $GLOBALS['wgServer'].str_replace("$1", "", $GLOBALS['wgArticlePath']);
    
    $this->index = $meiliClient->index("mwstakeorg");
    $this->dsNeo4j = $dsNeo4j;
    
    $this->attachments = [];
    $this->mw0__incomingLinks = [];
    $this->mw0__outgoingLinks = [];
    $this->mw0__sections = [];
    $this->mw0__templates = [];
    $this->mw0__templates_by_regex = [];
    $this->mw0__images = [];
    $this->params = $params;
  }

  static function deleteFromDatastore($id) {
		// Run this code immediately rather than through a job.
		$url = $GLOBALS['wgDataspectsApiURL'].$GLOBALS['wgDataspectsID']."/pages/".$id;
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
      // api.php?action=query&meta=siteinfo&siprop=namespaces
      case 0:
        $this->getCategories();
        $this->getWikitext();
        $this->getParse();
        $this->parsedWikitext = $this->getParsedWikitext($this->wikitext);
        $this->sdf->getMediaWikiPageAnnotations();
        $this->sdf->getDsSpacyAnnotations();
        $this->getIncomingAndOutgoingLinks();
        $this->mediaWikiPage = $this->sdf->getMediaWikiPage();
        break;
      case 6: // File
        $this->getCategories();
        $this->getWikitext();
        $this->getParse();
        // In case of a file, we merge the File:File.png parsed wikitext and the file's content extracted by TIKA
        $this->parsedWikitext = $this->getParsedWikitext($this->wikitext);
        $this->getAttachmentsData();
        $this->sdf->getMediaWikiPageAnnotations();
        $this->sdf->getDsSpacyAnnotations();
        $this->getIncomingAndOutgoingLinks();
        $this->mediaWikiPage = $this->sdf->getMediaWikiPage();
	      break;
      case 4:
        $this->getCategories();
        $this->getWikitext();
        $this->parsedWikitext = $this->getParsedWikitext($this->wikitext);
        $this->sdf->getMediaWikiPageAnnotations();
        $this->getIncomingAndOutgoingLinks();
        $this->mediaWikiPage = $this->sdf->getMediaWikiPage();
        break;
      case 102:
        $this->getCategories();
        // $this->sdf->getPredicateAnnotations(); // PENDING FEATURE
        $this->mediaWikiPage = $this->sdf->getMediaWikiPage();
        break;
      case 10:
      case 108:
      case 102:
      case 106:
      case 828:
        $this->getCategories();
        $this->getWikitext();
        $this->getParse();
        $this->getIncomingAndOutgoingLinks();
        $this->mw0__templates_by_regex();
        $this->mediaWikiPage = $this->sdf->getMediaWikiPage();
        break;
      default:
        echo "ERROR in determining namespace ".$this->title->mNamespace."\n";
        break;
    }
    $this->semantologics = new Semantologics($this->mediaWikiPage);
    $this->mediaWikiPage = $this->semantologics->process();
    $this->mediaWikiPage = $this->sdf->allPredicates($this->mediaWikiPage); // FIXME: move this to Semantologics
    $this->addPageToMeilisearch();
    $this->dsNeo4j->addPageToNeo4j($this->mediaWikiPage);
    // print_r($this->dsNeo4j->templateCallsSubgraph("https://localhost/wiki/Template:Issue"));
  }

  private function getWikitext() {
    $revision = $this->wikiPage->getRevision();
    if(empty($revision)) {
      $this->wikitext = '';
    } else {
      $content = $revision->getContent( \Revision::RAW ); // \Revision::RAW = get the text regardless of permissions
      $this->wikitext = \ContentHandler::getContentText( $content );
    }
  }

  function getParsedWikitext($wikitext) {
    $parser = MediaWikiServices::getInstance()->getParserFactory()->create();
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
            $this->mw0__sections[] = $section;
      }
    }
    foreach($data["parse"]["templates"] as $template) {
      if(is_array($template)) {
        $this->mw0__templates[] = $template;
      }
    }
    foreach($data["parse"]["images"] as $i => $image) {
    	if(is_numeric($i)) {
        $this->mw0__images[] = $image;
      }
    }
    foreach($data["parse"]["externallinks"] as $i => $externalLink) {
	    if(is_numeric($i)) {
                $this->mw0__outgoingLinks[] = $externalLink;
        }
    }
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

  private function getIncomingAndOutgoingLinks() {
    foreach($this->title->getLinksFrom() as $linkFrom) {
      $this->mw0__outgoingLinks[] = $linkFrom->getInternalURL();
    }
    foreach($this->title->getLinksTo() as $linkTo) {
      $this->mw0__incomingLinks[] = $linkTo->getInternalURL();
    }
  }

  private function getAttachmentsData() {
    $phpArray = $this->readTempFile($this->params["tempFileName"]);
    $mergedContent = "";
    foreach ($phpArray as $attachmentData) {
      $mergedContent .= " ".$attachmentData->text; // FIXME: map function?
    }
    $attachments = [
      "mergedContent" => $mergedContent,
      "files" => $phpArray
    ];
    $this->attachments = $attachments;
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

  

  private function mw0__templates_by_regex() {
    preg_match_all("/[^{]{{(\w+)\n*(?:\|+|}})[^}]/", $this->wikitext, $matches);
    foreach($matches[1] as $templateName) {
      $this->mw0__templates_by_regex[] = "Template:".$templateName;
    }
  }

  private function addPageToMeilisearch() {
    $result = $this->index->addDocuments([$this->mediaWikiPage]);
    wfDebug("### __>__ Indexing Pipeline: ".$GLOBALS['wgDataspectsWriteURL'].":".$GLOBALS['wgDataspectsIndex'].": ADDED: ".$this->mediaWikiPage["mw0__rawUrl"]."\n");
    # $result array keys: taskUid, indexUid, status, type, enqueuedAt
    $this->manualLogEntry('to index "'.$result["indexUid"].'": '.$result["status"]." (".$result["type"].")");
  }

  private function readTempFile($tempFileName) {
    $tempFile = fopen($tempFileName, "r") or die("Unable to open file!");
    $json = fread($tempFile, filesize($tempFileName));
    fclose($tempFile);
    $status = unlink($tempFileName);    
    if($status){  
      wfDebug("### MediaWiki Job Queue __>__: ### RUNNING: dataspectsIndexJob: deleted ".$tempFileName);
    } else {  
      wfDebug("### MediaWiki Job Queue __>__: ### RUNNING: dataspectsIndexJob: ERROR deleting ".$tempFileName);
    }  
    return json_decode($json);
  }


  public function manualLogEntry($text) {
    if($this->user) {
      try {
        $logEntry = new ManualLogEntry( 'dataspects', 'main' );
        $logEntry->setTarget( $this->title );
        $logEntry->setPerformer( $this->user );
        $logEntry->setParameters( [
          '4::unused' => $text,
        ] );
        $logEntry->insert();
        } catch (Exception $ex) {    
      }
    }
  }

  function getNamespace($index) {
    if($index == 0) {
      $namespace = 'main';
    } else {
      $namespace = \MWNamespace::getCanonicalName($index);
    }
    return ucfirst($namespace);
  }

  function browseBySubject(string $title) {
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
