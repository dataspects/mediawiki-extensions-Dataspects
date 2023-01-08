<?php

# See https://www.mediawiki.org/wiki/Best_practices_for_extensions ;)

namespace MediaWiki\Extension\Dataspects;

# LEX230108160200
class CoKe {

  public function __construct() {
    $this->cognitiveKeywords = array(
        "CASE"              => "<span class='coKe CASE'>@@@MATCHES0@@@</span>",
        "SCENARIOS"         => "<span class='coKe SCENARIOS'>@@@MATCHES0@@@</span>",
        "FACT"              => "<span class='coKe FACT'>@@@MATCHES0@@@</span>",
        "OPTION"            => "<span class='coKe OPTION'>@@@MATCHES0@@@</span>",
        "SYSTEM BEHAVIOR"   => "<span class='coKe SYSTEM_BEHAVIOR'>@@@MATCHES0@@@</span>",
        "EXAMPLE"           => "<span class='coKe EXAMPLE'>@@@MATCHES0@@@</span>",
        "ACT"               => "<span class='coKe ACT'>@@@MATCHES0@@@</span>",
        "ASPECT"            => "<span class='coKe ASPECT'>@@@MATCHES0@@@</span>",
        "DECIDE"            => "<span class='coKe DECIDE'>@@@MATCHES0@@@</span>",
        "ACTION"            => "<span class='coKe ACTION'>@@@MATCHES0@@@</span>",
        "PROS"              => "<span class='coKe PROS'>@@@MATCHES0@@@</span>",
        "CONS"              => "<span class='coKe CONS'>@@@MATCHES0@@@</span>",
        "QUESTION"              => "<span class='coKe QUESTION'>@@@MATCHES0@@@</span>",
        "METAPHOR"              => "<span class='coKe METAPHOR'>@@@MATCHES0@@@</span>"
    );
    $this->basicRegex = '/[=;#:*]+ *(@@@SEAKAYKEYWORDS@@@) *[\n:>]+/';
    // $this->regex = '/[;#:*]+ *('.implode("|", array_keys($this->cognitiveKeywords)).') *[\n:>]+/';
  }

  public function markup($html) {
    return preg_replace_callback_array(
        $this->ckMatchers(),
        $html
    );
  }

  public function regex() {
    return str_replace("@@@SEAKAYKEYWORDS@@@", implode("|", array_keys($this->cognitiveKeywords)), $this->basicRegex);
  }

  public function simpleRegex($keyword) {
    return str_replace("@@@SEAKAYKEYWORDS@@@", $keyword, $this->basicRegex);
  }

  private function markupRegex($ck) {
    return '/<(?:li|dd)>[ \n]*('.$ck.'):/';
  }

  private function ckMatchers() {
    $ckMatchers = array();
    foreach ($this->cognitiveKeywords as $ck => $markup) {
        $ckMatchers[$this->markupRegex($ck)] = function(&$matches) use($markup) {
            $theCKStringFound = $matches[1];
            $originalText = $matches[0];
            return str_replace($theCKStringFound, str_replace("@@@MATCHES0@@@", $theCKStringFound, $markup), $originalText);
        };
    }
    return $ckMatchers;
  }

}
