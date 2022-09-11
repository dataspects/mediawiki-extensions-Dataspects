<?php


namespace MediaWiki\Extension\DataspectsSearch;

class Semantologics {

  public function __construct($mediaWikiPage) {
    $this->mediaWikiPage = $mediaWikiPage;
    $this->sk = new SeaKay();
    $this->annotations = array(
        "/(can +be +managed)/" => array(
            "predicate"         => "mwstake:canBeManaged",
            "hierarchicalMenu"  => [
                "ds0__featuresAction.1v10" => "Action",
                "ds0__featuresAction.1v11" => "Action > Can be managed"
            ] 
        ),
        $this->sk->simpleRegex("OPTION") => array(
            "predicate"         => "mwstake:offersOption"
        )
    );
  }

  # LEX200122141600
  function process() {
    foreach($this->annotations as $regex => $data) {
        preg_match_all($regex, $this->mediaWikiPage["mw0__wikitext"], $matches);
        if(count($matches[1]) > 0) {
            $this->mediaWikiPage["annotations"][] = array(
                'subject' => $this->mediaWikiPage["name"],
                'predicate' => $data["predicate"],
                'objectLiteral' => true,
                'objectLiteralHTML' => true,
                'smwPropertyType' => 9
            );
            if($data["hierarchicalMenu"]) {
                $this->mediaWikiPage = array_merge($this->mediaWikiPage, $data["hierarchicalMenu"]);
            }
        }
    }
    return $this->mediaWikiPage;
  }
}
