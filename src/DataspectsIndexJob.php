<?php

namespace MediaWiki\Extension\DataspectsSearch;

class DataspectsIndexJob extends \Job {
  // https://doc.wikimedia.org/mediawiki-core/master/php/classJob.html

  private $annotations = [];
  // FIXME: Why can't these instance variables be declared private?
  // private $title = '';
  // private $wikiPage = '';
  // private $wikitext = '';
  // private $parsedWikitext = '';

  public function __construct($title, $params) {
    // https://doc.wikimedia.org/mediawiki-core/master/php/classTitle.html
    // https://www.mediawiki.org/wiki/Manual:Title.php#Functions
    parent::__construct("dataspectsIndexJob", $title, $params);
    $this->title = $title;
    
  }

  public function run() {
    // https://doc.wikimedia.org/mediawiki-core/master/php/classWikiPage.html
    // https://www.mediawiki.org/wiki/Manual:WikiPage.php
    // $dmwf = new \MediaWiki\Extension\DataspectsSearch\DataspectsSearchFeed($this->title);
    // $dmwf->sendToDatastore();
    return true;
  }

}
