<?php


namespace MediaWiki\Extension\Dataspects;


class SpecialDataspectsFeed {

  public function __construct($dataspectsSearchFeed, \Title $title, $user) {
    $this->dsf = $dataspectsSearchFeed;
    $this->smwsof = new SpecialMWStakeORGFeed($this, $title, $user);
    $this->title = $title;
    $this->wikiPage = \WikiPage::factory($title);
    $this->annotations = [];
  }

  # LEX200122141600
  function getMediaWikiPage() {
    $meilisearchDocument = [
      ## Unique in index
      "id" => $GLOBALS['wgDataspectsMediaWikiIDPrefix']."_".$this->title->getArticleID(),// https://docs.meilisearch.com/learn/core_concepts/primary_key.html#formatting-the-document-id
      "name" => $this->title->mTextform,
      "eppo0__hasEntityURL" => $this->title->getInternalURL(),
      ## Headers
      "ds0__sourceID" => $this->title->getArticleID(),
			"eppo0__hasEntityTitle" => $this->title->mTextform,
      ## "eppo0__hasEntityBlurb" => "", // from processAnnotations()
			"ds0__sourceNamespace" => $this->dsf->getNamespace($this->title->mNamespace),
      ## Time
      "release_timestamp" => time(),
      ## Entity type from processAnnotations()
      ## Categories from processCategories()
      ## Content
      "ds0__contentSource" => trim($this->dsf->wikitext),
			"ds0__contentHTML" => $this->ds0__contentText($this->dsf->parsedWikitext)." ".$this->dsf->attachments["mergedContent"],
			"ds0__contentText" => $this->ds0__contentText($this->dsf->parsedWikitext)." ".$this->dsf->attachments["mergedContent"],
      ## Content sections
      "ds0__contentSections" => $this->dsf->mw0__sections,
      ## Parse source link
      "ds0__sourceParseTextURL" => $GLOBALS['wgServer']."/w/api.php?action=parse&page=".$this->title->mTextform."&prop=text&disablelimitreport&format=json",
      ## Templates
      "ds0__templates" => $this->dsf->mw0__templates,
      "ds0__templates_by_regex" => $this->dsf->mw0__templates_by_regex,
      ## Links
      "ds0__outgoingLinks" => $this->dsf->mw0__outgoingLinks,
      "ds0__incomingLinks" => $this->dsf->mw0__incomingLinks,
      ## Attachments from processAttachments()
      ## Source from processSources()
      ## Predicates from allPredicates()
      ## Special aspects from class ProcessSelectedAspects
      ## Annotations from processAnnotations()
      ## CoKe from analyzeCoKe()
    ];
    $meilisearchDocument = $this->processAnnotations($meilisearchDocument);
    $meilisearchDocument = $this->processCategories($meilisearchDocument);
    $meilisearchDocument = $this->processSources($meilisearchDocument);
    $meilisearchDocument = $this->processAttachments($meilisearchDocument);
    $meilisearchDocument = $this->smwsof->analyzeCoKe($meilisearchDocument);
    wfDebug("### finished SpecialDataspectsFeed::meilisearchDocument");
    return $meilisearchDocument;
  }

  private function semanticMediaWikiPropertyTypeMappings($number) {
    // https://www.semantic-mediawiki.org/wiki/Help:List_of_datatypes
    $map = [
      2 => "Text",
      9 => "Node",
      6 => "Date",
      5 => "URL"
    ];
    if(array_key_exists($number, $map)) {
      return $map[$number];
    }
    wfDebug("### UNMANAGED SMW_NS_PROPERTY TYPE: ".$number); 
    return $map[2];
  }

  public function getMediaWikiPageAnnotations() {
    $data = $this->dsf->browseBySubject($this->title);
    foreach($data['query']['data'] as $property) {
      if(is_array($property)) {
        $propertyName = $property['property'];
        if($propertyName[0] != '_') {
          foreach($property['dataitem'] as $object) {
            if(is_array($object)) {
              $source = str_replace('#0##', '', $object['item']);
              $smwLiteral = $source;
              if($this->semanticMediaWikiPropertyTypeMappings($object['type']) == "Node") {
                $source = $this->fullArticlePath.$source;
              }
              $this->annotations[] = array(
                'subject' => strtolower($this->title->getFullURL()),
                'predicate' => $propertyName,
                'objectSource' => $source,
                'objectHTML' => $this->dsf->getParsedWikitext($source),
                'objectText' => $source,
                'objectType' => $this->semanticMediaWikiPropertyTypeMappings($object['type'])
              );
            }
          }
        }
      }
    }
  }

  

  

  public function getPredicateAnnotations() {
    $data = $this->browseBySubject($this->title);
    foreach($data['query']['data'] as $property) {
      if(is_array($property)) {
        $propertyName = $property['property'];
        foreach($property['dataitem'] as $object) {
          if(is_array($object)) {
            $this->annotations[$propertyName] = array(
              'objectText' => $object['item'],
              // LEX2302230923
              'objectType' => semanticMediaWikiPropertyTypeMappings($object['type'])
            );
          }
        }
      }
    }
  }

  public function allPredicates($meilisearchDocument) {
    // ds1:implements: instantsearch.widgets.hierarchicalMenu #all-predicates-menu
    $meilisearchDocument = $this->initializeIfNotExists($meilisearchDocument, "ds0__allPredicates", "All Predicates");
    // Add predicates
    foreach($meilisearchDocument["annotations"] as $annotation) {
      $meilisearchDocument["ds0__allPredicates.1v11"][] = "All Predicates > ".$annotation["predicate"];
      $meilisearchDocument["ds0__allPredicates.1v12"][] = "All Predicates > ".$annotation["predicate"]." > ".$this->considerTruncatingObjectLiteral($annotation["objectText"]);
    }
    return $meilisearchDocument;
  }

  private function initializeIfNotExists($meilisearchDocument, $predicate, $title) {
        // For hierarchicalMenus, it starts at *.1v10!
        if(!array_key_exists($predicate, $meilisearchDocument)) {
            $meilisearchDocument = array_merge($meilisearchDocument, [
                $predicate.".1v10" => [$title],
                $predicate.".1v11" => [],
                $predicate.".1v12" => [],
            ]);
        }
        return $meilisearchDocument;
    }

  private function considerTruncatingObjectLiteral($objectText) {
    // ds1:implements: object literal value truncation
    $length = 20;
    if (strlen($objectText) > $length) {
      return substr($objectText, 0, $length)."...";
    }
    return $objectText;
  }

  private function ds0__contentText($parsedWikitext) {
    $hp = new HTMLProcessor($parsedWikitext);
		return $hp->processAndReturnText();
  }

  private function processAttachments($meilisearchDocument) {
    if(count($this->dsf->attachments["files"]) > 0) {
      $meilisearchDocument = array_merge($meilisearchDocument, [
        "ds0__attachments" => $this->dsf->attachments["files"]
      ]);
    }
    return $meilisearchDocument;
  }

  private function processSources($meilisearchDocument) {
    $meilisearchDocument = array_merge($meilisearchDocument, [
      "ds0__source" => $GLOBALS['wgSourceURL'],
      "ds0__source.1v10" => "Source",
      "ds0__source.1v11" => "Source > ".$GLOBALS['wgSourceURL'],
      "ds0__source.1v12" => "Source > ".$GLOBALS['wgSourceURL']." > ".$this->dsf->getNamespace($this->title->mNamespace)
    ]);
    return $meilisearchDocument;
  }

  private function processCategories($meilisearchDocument) {
    $eppo0__categories = array();
    foreach ($this->dsf->categories as $category) {
      if(!in_array(basename($category), [$meilisearchDocument["eppo0__hasEntityType"], "Pages using DynamicPageList3 parser function"])) {
        $eppo0__categories[] = basename($category);
      }
    }
    if(!empty($eppo0__categories)) {
      $meilisearchDocument = array_merge($meilisearchDocument, [
        "eppo0__categories" => $eppo0__categories,
      ]);
    }
    return $meilisearchDocument;
  }

  private function processAnnotations($meilisearchDocument) {
    $showAnnotations = [];
    if($this->annotations) {
      foreach ($this->annotations as $key => $annotation) {
        switch ($annotation["predicate"]) {
          case "Eppo0:hasEntityType":
            $meilisearchDocument = array_merge($meilisearchDocument, [
              "eppo0__hasEntityType" => $annotation["objectText"],
              "eppo0__hasEntityType.1v10" => "Topic Type",
              "eppo0__hasEntityType.1v11" => "Topic Type > ".$annotation["objectText"],
            ]);
            if($annotation["objectText"] == "Event") {
              $meilisearchDocument = $this->specialCaseForIsEventType($meilisearchDocument);
            }
            break;
          case "Eppo0:hasEntityTitle":
            // This overwrites: "eppo0__hasEntityTitle" => $this->title->mTextform
            $meilisearchDocument = array_merge($meilisearchDocument, [
              "eppo0__hasEntityTitle" => $annotation["objectText"],
            ]);
            break;
          case "Eppo0:hasEntityBlurb":
            $meilisearchDocument = array_merge($meilisearchDocument, [
              "eppo0__hasEntityBlurb" => $annotation["objectText"],
            ]);
            break;
          default:
            if (!str_starts_with($annotation["predicate"], 'Eppo0')) {
              $showAnnotations[] = $annotation;
            }
            // $meilisearchDocument = $GLOBALS['wgSelectedAspects']($annotation, $meilisearchDocument);
            break;
        }
      }
    }
    $meilisearchDocument["annotations"] = $showAnnotations;
    return $meilisearchDocument;
  }

  private function specialCaseForIsEventType($meilisearchDocument) {
    $eventType = $this->getObjectByPredicateName("Mwstake:isEventType", $meilisearchDocument);
    $meilisearchDocument = array_merge($meilisearchDocument, [
      "eppo0__hasEntityType.1v12" => "Topic Type > Event > ".$eventType,
    ]);
    return $meilisearchDocument;
  }

  private function getObjectByPredicateName($predicateName, $meilisearchDocument) {
    foreach ($this->annotations as $key => $annotation) {
      if($annotation["predicate"] == $predicateName) {
        return $annotation["objectText"];
      }
    }
    return $predicateName." not found for ".$meilisearchDocument['name'];
  }

}
