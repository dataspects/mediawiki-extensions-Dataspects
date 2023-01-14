<?php

namespace MediaWiki\Extension\Dataspects\AnalyzeJobs;

class RemoveDuplicateFieldValues extends \MediaWiki\Extension\Dataspects\AnalyzeAndAnnotateMeiliDocsJob {

    public function __construct() {
        parent::__construct();
	}

    public function execute() {

    }

    public function removeDuplicateFieldValues($hit) {
        $fields = [
            "ds0__allPredicates.1v11", "ds0__allPredicates.1v12"
        ];
        foreach ($fields as $field) {
            if($hit[$field]) {
                echo $hit[$field][0];
                $hit[$field] = array_unique($hit[$field]);
            }
        }
        return $hit;
    }

}