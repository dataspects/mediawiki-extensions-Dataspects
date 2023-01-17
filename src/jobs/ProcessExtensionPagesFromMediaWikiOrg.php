<?php

namespace MediaWiki\Extension\Dataspects\AnalyzeJobs;

class ProcessExtensionPagesFromMediaWikiOrg extends \MediaWiki\Extension\Dataspects\AnalyzeAndAnnotateMeiliDocsJob {

    public function __construct($analyzeAndAnnotateMeiliDocsConfig, $doWrite) {
        parent::__construct($analyzeAndAnnotateMeiliDocsConfig, $doWrite);
        $this->query = "";
        $this->filter = [
            [
                "ds0__source = 'https://www.mediawiki.org/wiki/'"
            ]
        ];
	}

    public function execute() {
        $this->analyzeAndAnnotateMeiliDocs();
    }

    protected function hitFunction($hit) {
        $hit = $this->usedInPackageAndOrFarm($hit);
        // $hit = $this->removeAnnotationsByPredicate($hit, "ds0:usedInPackageAndOrFarm");
        // $hit = $this->addToArrayField($hit, "eppo0__categories", "Lex");
        // $hit = $this->removeFromArrayField($hit, "eppo0__categories", "Lex");
        // wfDebug("### ANALYZE: ".$hit["id"]);
        return $hit;
    }

    private function usedInPackageAndOrFarm($hit) {
        $capture = $this->getSingleRegexCapture($hit["mw0__wikiText"], "/{{Used by\|(.*=1)+}}/");
        if($capture != "") {
            foreach (explode("|", $capture) as $value) {
                $annotation = [
                    "subject"   => $hit["mw0__rawUrl"],
                    "predicate" => "ds0:usedInPackageAndOrFarm",
                    "objectLiteral"    => explode("=", $value)[0]
                ];
                $this->log("considering ".$hit["mw0__rawUrl"]);
                $hit = $this->addAnnotation($hit, $annotation);
                $hit = $this->addToDs0AllPredicates($hit, $annotation);
            }
        }
        return $hit;
    }

}