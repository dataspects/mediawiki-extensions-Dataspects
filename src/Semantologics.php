<?php


namespace MediaWiki\Extension\Dataspects;

class Semantologics {

  public function __construct($meilisearchDocument) {
    $this->meilisearchDocument = $meilisearchDocument;
    // LEX230108160200
    $this->sk = new CoKe();
    $this->annotations = array(
        "/(can +be +managed)/" => array(
            "predicate"         => "ds0:canBeManaged",
            "hierarchicalMenu"  => [
                "ds0__featuresAction.1v10" => "Action",
                "ds0__featuresAction.1v11" => "Action > Can be managed"
            ] 
        ),
        $this->sk->simpleRegex("OPTION") => array(
            "predicate"         => "ds0:offersOption"
        ),
        $this->sk->simpleRegex("METAPHOR") => array(
            "predicate"         => "ds0:providesMetaphor"
        ),
        "/(?:{{#lst[xh]?:|{{Transclude\|)(.+)}}/" => array(
            "predicate"         => "mw0:transcludes",
            "objectHandler"     => "transclusionLogics"
        )
    );
  }

  # LEX200122141600
  public function process() {
    foreach($this->annotations as $regex => $data) {
        preg_match_all($regex, $this->meilisearchDocument["mw0__wikitext"], $matches);
        if(array_key_exists(1, $matches)) {
            if (count($matches[1]) > 0) {
                foreach($matches[1] as $match) {
                    $object = $match;
                    if(array_key_exists("objectHandler", $data)) {
                        // Dynamic function name
                        $func = $data["objectHandler"];
                        $object = $this->$func($match);
                    }
                    $this->meilisearchDocument["annotations"][] = array(
                        'subject' => $this->meilisearchDocument["name"],
                        'predicate' => $data["predicate"],
                        'objectSource' => $object,
                        'objectText' => $object,
                        'objectHTML' => $object,
                        'objectType' => "Node"
                    );
                    if(array_key_exists("hierarchicalMenu", $data)) {
                        $this->meilisearchDocument = array_merge($this->meilisearchDocument, $data["hierarchicalMenu"]);
                    }
                }
            }
        }
    }
    return $this->meilisearchDocument;
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

}
