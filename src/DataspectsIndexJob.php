<?php

namespace MediaWiki\Extension\DataspectsSearch;
use MeiliSearch\Client;

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
    wfDebug("DataspectsSpacyJob 333");
    $dsNeo4j = new \MediaWiki\Extension\DataspectsSearch\DSNeo4j();
    try { # FIXME
			$meiliClient = new \MeiliSearch\Client($GLOBALS['wgDataspectsSearchWriteURL'], $GLOBALS['wgDataspectsSearchWriteKey'], new \GuzzleHttp\Client(['verify' => false ]));
		} catch (\MeiliSearch\Exceptions\ApiException $e) {
			echo 'Caught exception: ',  $e->getMessage(), "\n";
		}
    // https://doc.wikimedia.org/mediawiki-core/master/php/classWikiPage.html
    // https://www.mediawiki.org/wiki/Manual:WikiPage.php
    $dmwf = new \MediaWiki\Extension\DataspectsSearch\DataspectsSearchFeed($this->title, \RequestContext::getMain()->getUser(), $dsNeo4j, $meiliClient);
    $dmwf->sendToDatastore();
    return true;
  }

}
