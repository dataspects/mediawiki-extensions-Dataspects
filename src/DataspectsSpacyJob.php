<?php

namespace MediaWiki\Extension\DataspectsSearch;

class DataspectsSpacyJob extends \Job {
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
    parent::__construct("dataspectsSpacyJob", $title, $params);
    $this->title = $title;
  }

  public function run() {
    $this->wikiPage = \WikiPage::factory($this->title);
    $url = $GLOBALS['wgDataspectsSearchSpacyURL']."/escam-annotations";
    $ch = curl_init($url);
    curl_setopt_array($ch, array(
      CURLOPT_POST => 1,
      CURLOPT_POSTFIELDS => json_encode(['text' => "test text"]),
      // CURLOPT_VERBOSE => true,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_SSL_VERIFYPEER => false, // FIXME
      CURLOPT_SSL_VERIFYHOST => false
    ));
    $data = (array) json_decode(curl_exec($ch), true);
    wfDebug("#######");
    wfDebug($data);
    wfDebug("#######");
    // if(count($data) > 0) {
    //   $this->spacyAnnotations($data);
    // } else {
    //   $message = "No annotations for '".$this->title->mTextform."' from ".$url;
    //   $this->dsf->manualLogEntry($message);
    // }
    // $job = new DataspectsIndexJob($this->wikiPage->getTitle(), []);
		// \JobQueueGroup::singleton()->push($job);
    return true;
  }

  private function spacyAnnotations($data) {
    $this->annotations[] = array(
        'subject' => "strtolower",
        'predicate' => "propertyName",
        'objectLiteral' => "source",
        'objectLiteralHTML' => "test",
        'smwPropertyType' => "asd"
      );
  }

}
