<?php

namespace MediaWiki\Extension\Dataspects\AnalyzeJobs;

class RemoveDuplicateFieldValues extends \MediaWiki\Extension\Dataspects\AnalyzeAndAnnotateMeiliDocsJob {

    public function __construct($globalsConfig, $doWrite) {
        parent::__construct($globalsConfig, $doWrite);
        $this->query = "Extension:NetworkAuth";
        $this->filter = [];
	}

    public function execute() {
        $this->analyzeAndAnnotateMeiliDocs();
    }

    protected function hitFunction($hit) {
        $this->log(".", static::class."considering ".$hit["name"]);
        $fields = [
            "ds0__allPredicates.1v10", "ds0__allPredicates.1v11", "ds0__specialAspect.1v11"
        ];
        $this->log(".", static::class."considering fields ".join(", ", $fields)." for hit.name ".$hit["name"]);
        print_r($hit["annotations"]);
        $hit = $this->removeAnnotationsByPredicate($hit, "https://github.com/dataspects/SpaCyServer/blob/main/src/ESCAMNLP.py#ds55__notUsing");
        foreach ($fields as $field) {
            if(array_key_exists($field, $hit)) {
                $hit[$field] = array_unique($hit[$field]);
            }
        }
        return $hit;
    }

}