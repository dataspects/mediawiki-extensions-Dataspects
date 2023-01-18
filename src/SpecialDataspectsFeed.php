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
    $mediaWikiPage = [
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
    $mediaWikiPage = $this->processAnnotations($mediaWikiPage);
    $mediaWikiPage = $this->processCategories($mediaWikiPage);
    $mediaWikiPage = $this->processSources($mediaWikiPage);
    $mediaWikiPage = $this->processAttachments($mediaWikiPage);
    $mediaWikiPage = $this->smwsof->analyzeCoKe($mediaWikiPage);
    wfDebug("### finished SpecialDataspectsFeed::mediaWikiPage");
    return $mediaWikiPage;
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

  public function getDsSpacyAnnotations() {
    
  }

  

  public function getPredicateAnnotations() {
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

  public function allPredicates($mediaWikiPage) {
    // ds1:implements: instantsearch.widgets.hierarchicalMenu #all-predicates-menu
    $mediaWikiPage = $this->initializeIfNotExists($mediaWikiPage, "ds0__allPredicates", "All Predicates");
    // Add predicates
    foreach($mediaWikiPage["annotations"] as $annotation) {
      $mediaWikiPage["ds0__allPredicates.1v11"][] = "All Predicates > ".$annotation["predicate"];
      $mediaWikiPage["ds0__allPredicates.1v12"][] = "All Predicates > ".$annotation["predicate"]." > ".$this->considerTruncatingObjectLiteral($annotation["objectLiteral"]);
    }
    return $mediaWikiPage;
  }

  private function initializeIfNotExists($mediaWikiPage, $predicate, $title) {
        // For hierarchicalMenus, it starts at *.1v10!
        if(!array_key_exists($predicate, $mediaWikiPage)) {
            $mediaWikiPage = array_merge($mediaWikiPage, [
                $predicate.".1v10" => [$title],
                $predicate.".1v11" => [],
                $predicate.".1v12" => [],
            ]);
        }
        return $mediaWikiPage;
    }

  private function considerTruncatingObjectLiteral($objectLiteral) {
    // ds1:implements: object literal value truncation
    $length = 20;
    if (strlen($objectLiteral) > $length) {
      return substr($objectLiteral, 0, $length)."...";
    }
    return $objectLiteral;
  }

  private function ds0__contentText($parsedWikitext) {
    $hp = new HTMLProcessor($parsedWikitext);
		return $hp->processAndReturnText();
  }

  private function processAttachments($mediaWikiPage) {
    if(count($this->dsf->attachments["files"]) > 0) {
      $mediaWikiPage = array_merge($mediaWikiPage, [
        "ds0__attachments" => $this->dsf->attachments["files"]
      ]);
    }
    return $mediaWikiPage;
  }

  private function processSources($mediaWikiPage) {
    $mediaWikiPage = array_merge($mediaWikiPage, [
      "ds0__source" => $GLOBALS['wgSourceURL'],
      "ds0__source.1v10" => "Source",
      "ds0__source.1v11" => "Source > ".$GLOBALS['wgSourceURL'],
      "ds0__source.1v12" => "Source > ".$GLOBALS['wgSourceURL']." > ".$this->dsf->getNamespace($this->title->mNamespace)
    ]);
    return $mediaWikiPage;
  }

  private function processCategories($mediaWikiPage) {
    $eppo0__categories = array();
    foreach ($this->dsf->categories as $category) {
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
    if($this->annotations) {
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
          case "Eppo0:hasEntityBlurb":
            $mediaWikiPage = array_merge($mediaWikiPage, [
              "eppo0__hasEntityBlurb" => $annotation["objectLiteral"],
            ]);
            break;
          default:
            if (!str_starts_with($annotation["predicate"], 'Eppo0')) {
              $showAnnotations[] = $annotation;
            }
            // $mediaWikiPage = $GLOBALS['wgSelectedAspects']($annotation, $mediaWikiPage);
            break;
        }
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
