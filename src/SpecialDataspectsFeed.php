<?php


namespace MediaWiki\Extension\DataspectsSearch;


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
      "id" => $GLOBALS['wgDataspectsSearchMediaWikiIDPrefix']."_".$this->title->getArticleID(),// https://docs.meilisearch.com/learn/core_concepts/primary_key.html#formatting-the-document-id
      "name" => $this->title->mTextform,
      "eppo0__hasEntityTitle" => $this->title->mTextform,
      "mw0__rawUrl" => $this->title->getInternalURL(),
      "mw0__namespace" => $this->dsf->getNamespace($this->title->mNamespace),
      "mw0__wikitext" => trim($this->dsf->wikitext),
      "ds0__text" => $this->ds0__text($this->dsf->parsedWikitext),
      "mw0__apiParseTextURL" => $GLOBALS['wgServer']."/w/api.php?action=parse&page=".$this->title->mTextform."&prop=text&disablelimitreport&format=json",
      "mw0__sections" => $this->dsf->mw0__sections,
      "mw0__templates" => $this->dsf->mw0__templates,
      "mw0__templates_by_regex" => $this->dsf->mw0__templates_by_regex,
      "mw0__outgoingLinks" => $this->dsf->mw0__outgoingLinks,
      "mw0__incomingLinks" => $this->dsf->mw0__incomingLinks,
      "mw0__images" => $this->dsf->mw0__images,
    ];
    $mediaWikiPage = $this->processAnnotations($mediaWikiPage);
    $mediaWikiPage = $this->processCategories($mediaWikiPage);
    $mediaWikiPage = $this->processSources($mediaWikiPage);
    $mediaWikiPage = $this->processAttachments($mediaWikiPage);
    $mediaWikiPage = $this->smwsof->analyzeSeaKay($mediaWikiPage);
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
      $mediaWikiPage["ds0__allPredicates.1v11"] = array_merge(
        $mediaWikiPage["ds0__allPredicates.1v11"],
        [
          "All Predicates > ".$annotation["predicate"]
        ],
      );
      $mediaWikiPage["ds0__allPredicates.1v12"] = array_merge(
        $mediaWikiPage["ds0__allPredicates.1v12"],
        [
          "All Predicates > ".$annotation["predicate"]." > ".$this->considerTruncatingObjectLiteral($annotation["objectLiteral"])
        ],
      );
    }
    return $mediaWikiPage;
  }

  public function selectedAspects($mediaWikiPage) {
    foreach($mediaWikiPage["annotations"] as $annotation) {
      if (in_array($annotation["predicate"], array_keys($GLOBALS['wgSelectedAspects']))) {
        // Initialize
        $mediaWikiPage = $this->initializeIfNotExists($mediaWikiPage, "ds0__specialAspect", "Selected Aspects");
        // Add aspects
        $mediaWikiPage["ds0__specialAspect.1v11"] = array_merge(
          $mediaWikiPage["ds0__specialAspect.1v11"],
          [
            "Selected Aspects > ".$GLOBALS['wgSelectedAspects'][$annotation["predicate"]]["title"],
          ]
        );
      }
    }
    return $mediaWikiPage;
  }

  private function initializeIfNotExists($mediaWikiPage, $predicate, $title) {
    // For hierarchicalMenus, it starts at *.1v10
    if(!array_key_exists($predicate.".1v10", $mediaWikiPage)) {
      $mediaWikiPage = array_merge($mediaWikiPage, [
        $predicate.".1v10" => $title,
        $predicate.".1v11" => array(),
        $predicate.".1v12" => array(),
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

  private function ds0__text($parsedWikitext) {
    $hp = new HTMLProcessor($parsedWikitext);
		return $hp->processAndReturnText();
  }

  private function processAttachments($mediaWikiPage) {
    if(count($this->dsf->attachments) > 0) {
      $mediaWikiPage = array_merge($mediaWikiPage, [
        "mw0__attachment" => [
          "text" => $this->dsf->attachments[0]["text"],
          "type" => $this->dsf->attachments[0]["type"],
          "thumbURL" => $this->dsf->attachments[0]["thumbURL"]
        ],
        "ds0__source.1v13" => "Source > ".$GLOBALS['wgSourceURL']." > ".$this->dsf->getNamespace($this->title->mNamespace)." > ".$this->dsf->attachments[0]["type"]
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
