<?php

namespace MediaWiki\Extension\Dataspects;
use MediaWiki\MediaWikiServices;

class DataspectsTikaJob extends \Job {
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
    parent::__construct("dataspectsTikaJob", $this->params);
  }

  public function run() {
    wfDebug("### MediaWiki Job Queue __>__: ### RUNNING: dataspectsTikaJob ".$this->params["namespace"].":".$this->params["title"]);
    // https://doc.wikimedia.org/mediawiki-core/master/php/classWikiPage.html
    // https://www.mediawiki.org/wiki/Manual:WikiPage.php
    $attachments = array();
    foreach(MediaWikiServices::getInstance()->getRepoGroup()->findFiles([$this->title]) as $name => $file) {
      $file_path_str = $file->getLocalRefPath();
      $fh_res = fopen($file_path_str, 'r');
      $url = $GLOBALS['wgDataspectsTikaURL']."/rmeta";
      $ch = curl_init($url);
      curl_setopt_array($ch, array(
        CURLOPT_PUT => 1,
        CURLOPT_INFILE => $fh_res,
        CURLOPT_INFILESIZE => filesize($file_path_str),
        CURLOPT_RETURNTRANSFER => 1,
        // CURLOPT_VERBOSE => true,
        CURLOPT_SSL_VERIFYPEER => false, // FIXME
        CURLOPT_SSL_VERIFYHOST => false
      ));
      $curl_response_res = curl_exec ($ch);
      if($curl_response_res) {
        $data  = (array) json_decode($curl_response_res)[0];
        $htmlDoc = $data["X-TIKA:content"];
        $dom = new \DOMDocument();
        $dom->loadHTML('<?xml encoding="utf-8" ?>' . $htmlDoc);
        $attachments[] = array(
          "type"      => $data["Content-Type"],
          "text"      => trim($dom->textContent),
          "thumbURL"  => $GLOBALS['wgServer'].$file->getThumbUrl() # FIXME
        );
      } else {
        wfDebug("### DATASPECTS: No response from ".$url);
      }
    }
    wfDebug("### DATASPECTS __>__: Finished analyzing ".count($attachments)." attachments for ".$this->params["namespace"].":".$this->params["title"]);
    $tempFileName = $GLOBALS["wgTmpDirectory"]."/".uniqid().".json";
    $this->writeTempFile($tempFileName, $attachments);
    $this->params["tempFileName"] = $tempFileName;
    // $job = new DataspectsSpacyJob("dataspectsSpacyJob", array_merge($this->params, [ "attachments" => $attachments ]));
		// \JobQueueGroup::singleton()->push($job);
    $job = new DataspectsIndexJob("dataspectsIndexJob", $this->params);
    \JobQueueGroup::singleton()->push($job);
    wfDebug("### Pushed from TikaJob to IndexJob");
    return true;
  }

  private function writeTempFile($tempFileName, $attachments) {
    $tempFile = fopen($tempFileName, "w") or die("Unable to open file!");
    fwrite($tempFile, json_encode($attachments));
    fclose($tempFile);
  }

}
