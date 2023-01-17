<?php

namespace MediaWiki\Extension\Dataspects\AnalyzeJobs;

class ProcessElementMessages extends \MediaWiki\Extension\Dataspects\AnalyzeAndAnnotateMeiliDocsJob {

    public function __construct($analyzeAndAnnotateMeiliDocsConfig, $doWrite) {
        parent::__construct($analyzeAndAnnotateMeiliDocsConfig, $doWrite);
        $this->query = "";
        $this->filter = [
            [
                "ds0__source = 'Element'"
            ]
        ];
	}

    public function execute() {
        $this->analyzeAndAnnotateMeiliDocs();
    }

    protected function hitFunction($hit) {
        $this->log("considering ".$hit["id"]);
        $hit = $this->escamAnnotations($hit, $hit["ds0__text"]);
        return $hit;
    }

    private function escamAnnotations($hit, $text) {
        // Endpoint, see LEX230111144200
        $url = $GLOBALS['wgDataspectsSpacyURL']."/escam-annotations";
        $spaCyInsight = $this->spaCy($text, $url);
        if(array_key_exists("annotations", $spaCyInsight)) {
            foreach($spaCyInsight["annotations"] as $spaCyInsightAnnotation) {
                $annotation = [
                    "subject"   => $hit["mw0__rawUrl"],
                    "predicate" => $spaCyInsightAnnotation["fullPredicateName"],
                    "objectLiteral" => true
                ];
                $hit = $this->addAnnotation($hit, $annotation);
                $hit = $this->addToDs0AllPredicates($hit, $annotation);
            }
        }
        return $hit;
    }

}