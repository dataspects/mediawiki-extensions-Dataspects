<?php

namespace MediaWiki\Extension\Dataspects;
use \Symfony\Component\HttpClient\HttplugClient;
use \MeiliSearch\Client;

class DataspectsIndexJob extends \Job {
  // https://doc.wikimedia.org/mediawiki-core/master/php/classJob.html

  private $annotations = [];
  // FIXME: Why can't these instance variables be declared private?
  // private $title = '';
  // private $wikiPage = '';
  // private $wikitext = '';
  // private $parsedWikitext = '';

  public function __construct($command, $params) {
    // https://doc.wikimedia.org/mediawiki-core/master/php/classTitle.html
    // https://www.mediawiki.org/wiki/Manual:Title.php#Functions
    $this->params = $params;
    parent::__construct("dataspectsIndexJob", $this->params);
  }

  // https://docs.php-http.org/en/latest/clients.html

  public function run() {    
    $dsNeo4j = new DSNeo4j(
        $GLOBALS["wgDataspectsNeo4jProtocol"],
        $GLOBALS["wgDataspectsNeo4jURL"],
        $GLOBALS["wgDataspectsNeo4jUsername"],
        $GLOBALS["wgDataspectsNeo4jPassword"],
        $GLOBALS["wgDataspectsNeo4jDatabase"]
    );
    wfDebug("### __>__ Indexing Pipeline: RUNNING dataspectsIndexJob ".$this->params["namespace"].":".$this->params["title"]." using temp file '".$this->params["tempFileName"]."'");
    try { # FIXME
      $meiliClient = new \MeiliSearch\Client($GLOBALS['wgDataspectsWriteURL'], $GLOBALS['wgDataspectsWriteKey'], new HttplugClient());
      // https://doc.wikimedia.org/mediawiki-core/master/php/classWikiPage.html
      // https://www.mediawiki.org/wiki/Manual:WikiPage.php
      $dmwf = new DataspectsFeed($this->title, \RequestContext::getMain()->getUser(), $dsNeo4j, $meiliClient, $this->params);
      $dmwf->sendToDatastore();
		} catch (\MeiliSearch\Exceptions\ApiException $e) {
			wfDebug('### Caught exception: ', $e->getMessage(), "\n");
		}
    return false;
  }

}
