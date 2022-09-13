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
        ),
        $this->sk->simpleRegex("METAPHOR") => array(
            "predicate"         => "mwstake:providesMetaphor"
        ),
        "/(?:{{#lst[xh]?:|{{Transclude\|)(.+)}}/" => array(
            "predicate"         => "mw0:transcludes",
            "objectHandler"     => "transclusionLogics"
        )
    );
  }

  private function transclusionLogics($match) {
    $elements = explode("|", $match);
    $pageLink = "<a href='".$GLOBALS['wgServer']."/wiki/".$elements[0]."'>".$elements[0]."</a>";
    if(array_key_exists(1, $elements)) {
        // If section $elements[1] is transcluded
        return "Section <b>".$elements[1]."</b> from ".$pageLink;
    }
    // If whole page is transcluded
    return $pageLink;
  }

  # LEX200122141600
  function process() {
    foreach($this->annotations as $regex => $data) {
        preg_match_all($regex, $this->mediaWikiPage["mw0__wikitext"], $matches);
        if(array_key_exists(1, $matches)) {
            if (count($matches[1]) > 0) {
                foreach($matches[1] as $match) {
                    $object = $match;
                    if(array_key_exists("objectHandler", $data)) {
                        $func = $data["objectHandler"];
                        $object = $this->$func($match);
                    }
                    $this->mediaWikiPage["annotations"][] = array(
                        'subject' => $this->mediaWikiPage["name"],
                        'predicate' => $data["predicate"],
                        'objectLiteral' => $object,
                        'objectLiteralHTML' => $object,
                        'smwPropertyType' => 9
                    );
                    if(array_key_exists("hierarchicalMenu", $data)) {
                        $this->mediaWikiPage = array_merge($this->mediaWikiPage, $data["hierarchicalMenu"]);
                    }
                }
            }
        }
    }
    return $this->mediaWikiPage;
  }
}
