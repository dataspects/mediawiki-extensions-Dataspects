<?php

namespace MediaWiki\Extension\Dataspects\AnalyzeJobs;

class RemoveDuplicateFieldValues extends \MediaWiki\Extension\Dataspects\AnalyzeAndAnnotateMeiliDocsJob {

    public function __construct($doWrite) {
        parent::__construct($doWrite);
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
        $fields = [
            "ds0__allPredicates.1v11", "ds0__allPredicates.1v12", "ds0__specialAspect.1v11"
        ];
        foreach ($fields as $field) {
            if(array_key_exists($field, $hit)) {
                $this->log("considering $field");
                $hit[$field] = array_unique($hit[$field]);
            }
        }
        return $hit;
    }

}