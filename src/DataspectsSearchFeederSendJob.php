<?php

namespace MediaWiki\Extension\DataspectsSearch;

class DataspectsSearchFeederSendJob extends \Job {
  // https://doc.wikimedia.org/mediawiki-core/master/php/classJob.html

  private $annotations = [];
  // FIXME: Why can't these instance variables be declared private?
  // private $title = '';
  // private $wikiPage = '';
  // private $wikitext = '';
  // private $parsedWikitext = '';

  public function __construct(\Title $title, $params) {
    $this->logger = LoggerFactory::getInstance( 'dataspects' );
    // https://doc.wikimedia.org/mediawiki-core/master/php/classTitle.html
    // https://www.mediawiki.org/wiki/Manual:Title.php#Functions
    parent::__construct("dataspectsSearchFeederSendJob", $title, $params);
    $this->title = $title;
  }

  public function run() {
    $this->logger->debug($this->title->mTextform);
    // https://doc.wikimedia.org/mediawiki-core/master/php/classWikiPage.html
    // https://www.mediawiki.org/wiki/Manual:WikiPage.php
    $dmwf = new \MediaWiki\Extension\DataspectsSearch\DataspectsSearchFeed($this->title);
    $dmwf->sendToDatastore();
    return true;
  }

}
