<?php

namespace MediaWiki\Extension\DataspectsSearch;

class DataspectsSearchFeedSendJob extends \Job {
  // https://doc.wikimedia.org/mediawiki-core/master/php/classJob.html

  private $annotations = [];
  // FIXME: Why can't these instance variables be declared private?
  // private $title = '';
  // private $wikiPage = '';
  // private $wikitext = '';
  // private $parsedWikitext = '';

  public function __construct(\Title $title, $params) {
    // https://doc.wikimedia.org/mediawiki-core/master/php/classTitle.html
    // https://www.mediawiki.org/wiki/Manual:Title.php#Functions
    parent::__construct("dataspectsSearchFeedSendJob", $title, $params);
    $this->title = $title;
    $h = fopen('/var/log/apache2/error.log', 'a');
		fwrite($h, "Send job contructed\n");
		fclose($h);
  }

  public function run() {
    $h = fopen('/var/log/apache2/error.log', 'a');
		fwrite($h, 'Message5');
		fclose($h);
    // https://doc.wikimedia.org/mediawiki-core/master/php/classWikiPage.html
    // https://www.mediawiki.org/wiki/Manual:WikiPage.php
    $dmwf = new \MediaWiki\Extension\DataspectsSearch\DataspectsSearchFeed($this->title);
    $dmwf->sendToDatastore();
    return true;
  }

}
