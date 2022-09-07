<?php


namespace MediaWiki\Extension\DataspectsSearch;

use ManualLogEntry;

class SpecialMWStakeORGFeed {

  public function __construct($dataspectsSearchFeed, \Title $title, $user) {
    $this->dsf = $dataspectsSearchFeed;
    $this->title = $title;
    $this->wikiPage = \WikiPage::factory($title);
  }

  function analyzeSeaKay($mediaWikiPage) {
    #IndexConfigSetting
    $cognitiveKeywords = ["CASE", "FACT", "OPTION", "SYSTEM BEHAVIOR", "EXAMPLE", "ACT", "ASPECT", "DECIDE", "ACTION"];
    preg_match_all('/[;#:*]+ *('.implode("|", $cognitiveKeywords).') *[\n:>]+/', $mediaWikiPage["mw0__wikitext"], $matches);
    $cks = array_unique($matches[1]);
    if(count($cks) > 0) {
      $mediaWikiPage = array_merge($mediaWikiPage, [
        "ck0__containsCognitiveKeyword.1v10" => "Cognitive Keywords",
        "ck0__containsCognitiveKeyword.1v11" => "Cognitive Keywords > ".implode(", ", $cks),
      ]);
    }
    return $mediaWikiPage;
  }

}
