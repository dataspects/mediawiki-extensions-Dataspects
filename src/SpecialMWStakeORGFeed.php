<?php


namespace MediaWiki\Extension\Dataspects;

class SpecialMWStakeORGFeed {

  public function __construct($dataspectsSearchFeed, \Title $title, $user) {
    $this->dsf = $dataspectsSearchFeed;
    $this->title = $title;
    $this->wikiPage = \WikiPage::factory($title);
    $this->sk = new CoKe();
  }

  function analyzeCoKe($meilisearchDocument) {
    #IndexConfigSetting
    preg_match_all($this->sk->regex(), $meilisearchDocument["mw0__wikitext"], $matches);
    $cks = array_unique($matches[1]);
    if(count($cks) > 0) {
      $meilisearchDocument = array_merge($meilisearchDocument, [
        "ck0__containsCognitiveKeyword.1v10" => "Cognitive Keywords",
        "ck0__containsCognitiveKeyword.1v11" => "Cognitive Keywords > ".implode(", ", $cks),
      ]);
    }
    return $meilisearchDocument;
  }

}
