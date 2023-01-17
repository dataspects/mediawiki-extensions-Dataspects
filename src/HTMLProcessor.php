<?php

namespace MediaWiki\Extension\Dataspects;

class HTMLProcessor {

  public function __construct($html) {
    // wfDebug("### HTMLProcessor __>__ : ".str_replace("\n", "", $html));
    $this->html = $html;
  }

  public function processAndReturnHTML() {
    $dom = $this->process();
    return $dom->saveHTML();
  }

  public function processAndReturnText() {
    $dom = $this->process();
    return $dom->textContent;
  }

  private function process() {
    $dom = new \DOMDocument('1.0', 'utf-8');
      // FIXME: DOMDocument::loadHTML(): Namespace prefix mw is not defined in Entity
    $dom->loadHTML($this->html);
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
    return $dom;
  }

}
