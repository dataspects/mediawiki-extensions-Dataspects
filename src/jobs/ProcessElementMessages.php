<?php

namespace MediaWiki\Extension\Dataspects\AnalyzeJobs;

class ProcessElementMessages extends \MediaWiki\Extension\Dataspects\AnalyzeAndAnnotateMeiliDocsJob {

    public function __construct($analyzeAndAnnotateMeiliDocsConfig, $doWrite) {
        parent::__construct($analyzeAndAnnotateMeiliDocsConfig, $doWrite);
        $this->query = "";
        $this->filter = [];
	}

    public function execute() {
        $this->analyzeAndAnnotateMeiliDocs();
    }

    protected function hitFunction($hit) {
        wfDebug("considering ".$hit["id"]);
        $hit = $this->escamAnnotations($hit, $hit["ds0__contentText"]);
        return $hit;
    }

    private function escamAnnotations($hit, $text) {
        // Endpoint, see LEX230111144200
        $url = $this->analyzeAndAnnotateMeiliDocsConfig['wgDataspectsSpacyURL']."/escam-annotations";
        $spaCyInsight = $this->spaCy($text, $url);
        if(array_key_exists("annotations", $spaCyInsight)) {
            foreach($spaCyInsight["annotations"] as $spaCyInsightAnnotation) {
                $annotation = [
                    "subject"   => $hit["name"],
                    "predicate" => $spaCyInsightAnnotation["fullPredicateName"],
                    "objectSource" => true,
					"objectHTML" => true,
					"objectText" => true,
					"objectType" => "Boolean"
                ];
                $hit = $this->addAnnotation($hit, $annotation);
                $hit = $this->addToDs0AllPredicates($hit, $annotation);
            }
        }
        return $hit;
    }

}