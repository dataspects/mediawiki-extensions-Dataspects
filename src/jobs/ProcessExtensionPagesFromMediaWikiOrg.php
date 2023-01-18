<?php

namespace MediaWiki\Extension\Dataspects\AnalyzeJobs;

class ProcessExtensionPagesFromMediaWikiOrg extends \MediaWiki\Extension\Dataspects\AnalyzeAndAnnotateMeiliDocsJob {

    public function __construct($globalsConfig, $doWrite) {
        parent::__construct($globalsConfig, $doWrite);
        $this->query = "";
        $this->filter = [];
	}

    public function execute() {
        $this->analyzeAndAnnotateMeiliDocs();
    }

    protected function hitFunction($hit) {
        $hit = $this->usedInPackageAndOrFarm($hit);
        // $hit = $this->removeAnnotationsByPredicate($hit, "ds0:usedInPackageAndOrFarm");
        // $hit = $this->addToArrayField($hit, "eppo0__categories", "Lex");
        // $hit = $this->removeFromArrayField($hit, "eppo0__categories", "Lex");
        // $this->log("### ANALYZE: ".$hit["id"]);
        return $hit;
    }

    private function usedInPackageAndOrFarm($hit) {
        $capture = $this->getSingleRegexCapture($hit["ds0__contentSource"], "/{{Used by\|(.*=1)+}}/");
        if($capture != "") {
            foreach (explode("|", $capture) as $value) {
                $annotation = [
                    "subject"   => $hit["name"],
                    "predicate" => "ds0:usedInPackageAndOrFarm",
                    "objectSource" => explode("=", $value)[0],
                    "objectText" => explode("=", $value)[0],
                    "objectHTML" => explode("=", $value)[0],
                    "objectType" => "Text"
                ];
                $hit = $this->addAnnotation($hit, $annotation);
                $hit = $this->addToDs0AllPredicates($hit, $annotation);
            }
        }
        return $hit;
    }

}