<?php


namespace MediaWiki\Extension\DataspectsSearch;

class SeaKay {

  public function __construct() {
    $this->cognitiveKeywords = array(
        "CASE"              => "<span class='seaKay CASE'>@@@MATCHES0@@@</span>",
        "SCENARIOS"         => "<span class='seaKay SCENARIOS'>@@@MATCHES0@@@</span>",
        "FACT"              => "<span class='seaKay FACT'>@@@MATCHES0@@@</span>",
        "OPTION"            => "<span class='seaKay OPTION'>@@@MATCHES0@@@</span>",
        "SYSTEM BEHAVIOR"   => "<span class='seaKay SYSTEM_BEHAVIOR'>@@@MATCHES0@@@</span>",
        "EXAMPLE"           => "<span class='seaKay EXAMPLE'>@@@MATCHES0@@@</span>",
        "ACT"               => "<span class='seaKay ACT'>@@@MATCHES0@@@</span>",
        "ASPECT"            => "<span class='seaKay ASPECT'>@@@MATCHES0@@@</span>",
        "DECIDE"            => "<span class='seaKay DECIDE'>@@@MATCHES0@@@</span>",
        "ACTION"            => "<span class='seaKay ACTION'>@@@MATCHES0@@@</span>",
        "PROS"              => "<span class='seaKay PROS'>@@@MATCHES0@@@</span>",
        "CONS"              => "<span class='seaKay CONS'>@@@MATCHES0@@@</span>"
    );
    $this->regex = '/[;#:*]+ *('.implode("|", array_keys($this->cognitiveKeywords)).') *[\n:>]+/';
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

  public function markup($html) {
    return preg_replace_callback_array(
        $this->ckMatchers(),
        $html
    );
  }

}
