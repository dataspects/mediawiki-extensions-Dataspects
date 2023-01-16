<?php

namespace MediaWiki\Extension\Dataspects\AnalyzeJobs;

class ProcessSelectedAspects extends \MediaWiki\Extension\Dataspects\AnalyzeAndAnnotateMeiliDocsJob {

    public function __construct($doWrite) {
        parent::__construct($doWrite);
        $this->query = "";
        $this->filter = [];
	}

    public function execute() {
        $this->analyzeAndAnnotateMeiliDocs();
    }

    protected function hitFunction($hit) {
        $hit = $this->selectedAspects($hit);
        return $hit;
    }

    private function selectedAspects($hit) {
        if($hit["annotations"]) {
            foreach($hit["annotations"] as $annotation) {
                if (in_array($annotation["predicate"], array_keys($GLOBALS['wgSelectedAspects']))) {
                    // Initialize
                    $hit = $this->initializeIfNotExists($hit, "ds0__specialAspect", "Selected Aspects");
                    // Add aspects
                    $aspectTitle = $GLOBALS['wgSelectedAspects'][$annotation["predicate"]]["title"];
                    $aspect = "Selected Aspects > ".$aspectTitle;
                    $hit = $this->addIfNotExists($hit, "ds0__specialAspect.1v11", $aspect);
                }
            }
        }
        return $hit;
      }
    
    private function initializeIfNotExists($hit, $predicate, $title) {
        // For hierarchicalMenus, it starts at *.1v10
        if(!array_key_exists($predicate.".1v10", $hit)) {
            $hit = array_merge($hit, [
            $predicate.".1v10" => $title,
            $predicate.".1v11" => array(),
            $predicate.".1v12" => array(),
            ]);
        }
        return $hit;
    }

    private function addIfNotExists($hit, $field, $value) {
        if(!in_array($value, $hit[$field])){
            $this->log("Added $value to $field of ".$hit['id']);
            $hit[$field] = array_merge(
                $hit[$field],
                [
                    $value,
                ]
            );
        }
        return $hit;
    }

}