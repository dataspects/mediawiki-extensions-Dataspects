<?php

namespace MediaWiki\Extension\Dataspects\AnalyzeJobs;

class RemoveDuplicateFieldValues extends \MediaWiki\Extension\Dataspects\AnalyzeAndAnnotateMeiliDocsJob {

    public function __construct($meilisearchConfig, $doWrite) {
        parent::__construct($meilisearchConfig, $doWrite);
        $this->query = "";
        $this->filter = [];
	}

    public function execute() {
        $this->analyzeAndAnnotateMeiliDocs();
    }

    protected function hitFunction($hit) {
        $fields = [
            "ds0__allPredicates.1v10", "ds0__allPredicates.1v11", "ds0__specialAspect.1v11"
        ];
        foreach ($fields as $field) {
            if(array_key_exists($field, $hit)) {
                wfDebug("RemoveDuplicateFieldValues: considering $field");
                $hit[$field] = array_unique($hit[$field]);
            }
        }
        return $hit;
    }

}