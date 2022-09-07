<?php


namespace MediaWiki\Extension\DataspectsSearch;

class SpecialDataspectsFeed {

  public function __construct($dataspectsSearchFeed, \Title $title, $user) {
    $this->dsf = $dataspectsSearchFeed;
    $this->smwsof = new SpecialMWStakeORGFeed($this, $title, $user);
    $this->title = $title;
    $this->wikiPage = \WikiPage::factory($title);
    #IndexConfigSetting
    $this->HTMLElementsToBeRemovedBeforeIndexingContent = array(
      "tags" => ["editsection"],
      "classes" => [],
      "ids" => ["ds0__topicMetaTemplate"]
    );
  }

  # LEX200122141600
  function getMediaWikiPage() {
    $mediaWikiPage = [
      "id" => $GLOBALS['wgDataspectsSearchMediaWikiID']."_".$this->title->getArticleID(),// https://docs.meilisearch.com/learn/core_concepts/primary_key.html#formatting-the-document-id
      "name" => $this->title->mTextform,
      "eppo0__hasEntityTitle" => $this->title->mTextform,
      "mw0__rawUrl" => $this->title->getInternalURL(),
      "mw0__namespace" => $this->dsf->getNamespace($this->title->mNamespace),
      "mw0__wikitext" => trim($this->wikitext),
      "ds0__text" => $this->ds0__text($this->dsf->parsedWikitext)
      // "sections" => $this->sections,
      // "templates" => $this->templates,
      // "outgoingLinks" => $this->outgoingLinks,
      // "incomingLinks" => $this->incomingLinks,
      // "images" => $this->images,
    ];
    $mediaWikiPage = $this->processAnnotations($mediaWikiPage);
    $mediaWikiPage = $this->processCategories($mediaWikiPage);
    $mediaWikiPage = $this->processSources($mediaWikiPage);
    $mediaWikiPage = $this->processAttachments($mediaWikiPage);
    $mediaWikiPage = $this->smwsof->analyzeSeaKay($mediaWikiPage);
    return $mediaWikiPage;
  }

  private function ds0__text($parsedWikitext) {
    $dom = new \DOMDocument('1.0', 'utf-8');
    $dom->loadHTML($parsedWikitext);
    $xpath = new \DomXPath($dom);
    foreach ($this->sdf->HTMLElementsToBeRemovedBeforeIndexingContent["ids"] as $id) {
      if($mwParserOutput = $xpath->query("//div[@id = '$id']")->item(0)) {
        $mwParserOutput->parentNode->removeChild($mwParserOutput);
      }      
    }
    foreach ($this->sdf->HTMLElementsToBeRemovedBeforeIndexingContent["tags"] as $tag) {
      $editSections = $xpath->query("//$tag");
      foreach($editSections as $editSection){
        $editSection->parentNode->removeChild($editSection);
      }
    }
    return $dom->textContent;
  }

  function getMediaWikiPageAnnotations() {
    $data = $this->dsf->browseBySubject($this->title);
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
                'objectLiteralHTML' => $this->dsf->getParsedWikitext($source),
                'smwPropertyType' => $object['type']
              );
            }
          }
        }
      }
    }
  }

  function getPredicateAnnotations() {
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

  private function processAttachments($mediaWikiPage) {
    if(count($this->attachments) > 0) {
      $mediaWikiPage = array_merge($mediaWikiPage, [
        "mw0__attachment" => [
          "text" => $this->attachments[0]["text"],
          "type" => $this->attachments[0]["type"]
        ],
        "ds0__source.1v13" => "Source > ".$this->smwsof->sourceURL." > ".$this->dsf->getNamespace($this->title->mNamespace)." > ".$this->attachments[0]["type"]
      ]);
    }
    return $mediaWikiPage;
  }

  private function processSources($mediaWikiPage) {
    $mediaWikiPage = array_merge($mediaWikiPage, [
      "ds0__source" => $this->smwsof->sourceURL,
      "ds0__source.1v10" => "Source",
      "ds0__source.1v11" => "Source > ".$this->smwsof->sourceURL,
      "ds0__source.1v12" => "Source > ".$this->smwsof->sourceURL." > ".$this->dsf->getNamespace($this->title->mNamespace)
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
          if($annotation["objectLiteral"] == "Event") {
            $mediaWikiPage = $this->specialCaseForIsEventType($mediaWikiPage);
          }
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

  private function specialCaseForIsEventType($mediaWikiPage) {
    $eventType = $this->getObjectByPredicateName("Mwstake:isEventType", $mediaWikiPage);
    $mediaWikiPage = array_merge($mediaWikiPage, [
      "eppo0__hasEntityType.1v12" => "Topic Type > Event > ".$eventType,
    ]);
    return $mediaWikiPage;
  }

  private function getObjectByPredicateName($predicateName, $mediaWikiPage) {
    foreach ($this->annotations as $key => $annotation) {
      if($annotation["predicate"] == $predicateName) {
        return $annotation["objectLiteral"];
      }
    }
    return $predicateName." not found for ".$mediaWikiPage['name'];
  }

}
