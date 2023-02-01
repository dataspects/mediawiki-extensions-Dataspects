<?php

namespace MediaWiki\Extension\Dataspects\AnalyzeJobs;

class ProcessElementMessages extends \MediaWiki\Extension\Dataspects\AnalyzeAndAnnotateMeiliDocsJob {

    public function __construct($globalsConfig, $doWrite) {
        parent::__construct($globalsConfig, $doWrite);
        $this->query = "";
        $this->filter = [];
	}

    public function execute() {
        $this->analyzeAndAnnotateMeiliDocs();
    }

    protected function hitFunction($hit) {
        $this->log(".", static::class."considering ".$hit["name"]);
        $hit = $this->escamAnnotations($hit, $hit["ds0__contentText"]);
        return $hit;
    }

    private function escamAnnotations($hit, $text) {
        // Endpoint, see LEX230111144200
        $url = $this->globalsConfig['wgDataspectsSpacyURL']."/escam-annotations";
        $spaCyInsight = $this->spaCy($text, $url);
        if(array_key_exists("annotations", $spaCyInsight)) {
            foreach($spaCyInsight["annotations"] as $spaCyInsightAnnotation) {
                $annotation = [
                    "subject"   => $hit["eppo0__hasEntityURL"],
                    "predicate" => $spaCyInsightAnnotation["fullPredicateName"],
                    "objectSource" => true,
					"objectHTML" => true,
					"objectText" => true,
					"objectType" => "Boolean",
                    "origin" => $spaCyInsightAnnotation["origin"]
                ];
                $hit = $this->addAnnotation($hit, $annotation);
                $hit = $this->addToDs0AllPredicates($hit, $annotation);
            }
        }
        return $hit;
    }

}