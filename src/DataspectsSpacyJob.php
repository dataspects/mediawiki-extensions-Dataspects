<?php

namespace MediaWiki\Extension\DataspectsSearch;
use MediaWiki\MediaWikiServices;

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
    $wikiPage = \WikiPage::factory($this->title);
    $url = $GLOBALS['wgDataspectsSearchSpacyURL']."/escam-annotations";
    $ch = curl_init($url);
    $revision = $wikiPage->getRevision();
    if(!empty($revision)) {
      $content = $revision->getContent( \Revision::RAW );
      $wikitext = \ContentHandler::getContentText( $content );
      $parser = MediaWikiServices::getInstance()->getParserFactory()->create();
      $parserOptions = new \ParserOptions();
      wfDebug("DataspectsSpacyJob 000");
      $parsedWikitext = $parser->parse($wikitext, $this->title, $parserOptions);
      if($parsedWikitext->mText) {
        $dom = new \DOMDocument('1.0', 'utf-8');
        // FIXME: DOMDocument::loadHTML(): Namespace prefix mw is not defined in Entity
        $dom->loadHTML($parsedWikitext->mText);
        $xpath = new \DomXPath($dom);
        foreach ($GLOBALS['wgHTMLElementsToBeRemovedBeforeIndexingContent']["ids"] as $id) {
            if($mwParserOutput = $xpath->query("//div[@id = '$id']")->item(0)) {
                $mwParserOutput->parentNode->removeChild($mwParserOutput);
            }      
        }
        foreach ($GLOBALS['wgHTMLElementsToBeRemovedBeforeIndexingContent']["classes"] as $class) {
            $editSections = $xpath->query("//*[contains(@class, '$class')]");
            foreach($editSections as $editSection){
                $editSection->parentNode->removeChild($editSection);
            }
        }
        foreach ($GLOBALS['wgHTMLElementsToBeRemovedBeforeIndexingContent']["tags"] as $tag) {
            $editSections = $xpath->query("//$tag");
            foreach($editSections as $editSection){
                $editSection->parentNode->removeChild($editSection);
            }
        }
        wfDebug("#######");
        wfDebug($dom->textContent);
        curl_setopt_array($ch, array(
          CURLOPT_POST => 1,
          CURLOPT_POSTFIELDS => json_encode(['text' => $dom->textContent]),
          // CURLOPT_VERBOSE => true,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_SSL_VERIFYPEER => false, // FIXME
          CURLOPT_SSL_VERIFYHOST => false
        ));
        $data = (array) json_decode(curl_exec($ch), true);
        wfDebug("#######");
        wfDebug($data);
      }
    } else {
      wfDebug("Empty revision");
    }
    
    // if(count($data) > 0) {
    //   $this->spacyAnnotations($data);
    // } else {
    //   $message = "No annotations for '".$this->title->mTextform."' from ".$url;
    //   $this->dsf->manualLogEntry($message);
    // }
    wfDebug("DataspectsSpacyJob 222");
    $job = new DataspectsIndexJob($wikiPage->getTitle(), []);
		\JobQueueGroup::singleton()->push($job);
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
