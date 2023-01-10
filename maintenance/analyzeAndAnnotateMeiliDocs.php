<?php

# https://www.mediawiki.org/wiki/Composer/For_extensions#Installing_extensions

namespace MediaWiki\Extension\Dataspects;
use \Symfony\Component\HttpClient\HttplugClient;
use \MeiliSearch\Client;

$basePath = getenv( 'MW_INSTALL_PATH' ) !== false ? getenv( 'MW_INSTALL_PATH' ) : __DIR__ . '/../../..';
require_once $basePath . '/maintenance/Maintenance.php';

class AnalyzeAndAnnotateMeiliDocs extends \Maintenance {

	public function execute() {

        $this->limit = 10;
        
        $meiliSearchClient = new \MeiliSearch\Client($GLOBALS['wgDataspectsWriteURL'], $GLOBALS['wgDataspectsSearchKey'], new HttplugClient());
        $this->searchIndex = $meiliSearchClient->index($GLOBALS['wgDataspectsIndex']);
        
        $meiliWriteClient = new \MeiliSearch\Client($GLOBALS['wgDataspectsWriteURL'], $GLOBALS['wgDataspectsWriteKey'], new HttplugClient());
        $this->writeIndex = $meiliWriteClient->index($GLOBALS['wgDataspectsIndex']);
        
        /**
         * INSTRUCTIONS
         * ------------
         * 
         * 1.   Define $query and $filter
         * 2.   Define $hit manipulations in private function myJob($hit) {...}
         * 3.   Run $this->analyzeAndAnnotateMeiliDocs("myJob");
         */
        $query = "";
        $filter = [
            [
                "ds0__source = 'https://www.mediawiki.org/wiki/'"
            ]
        ];
        $this->analyzeAndAnnotateMeiliDocs("myJob", $query, $filter);

	}

    private function myJob($hit) {
        $hit = $this->usedInPackageAndOrFarm($hit);
        // $hit = $this->removeAnnotationsByPredicate($hit, "ds0:usedInPackageAndOrFarm");
        // print_r($hit);
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
                if(!in_array($annotation, $hit["annotations"])) {
                    echo "Added annotation to ".$hit["mw0__rawUrl"]."\n";
                    $hit["annotations"][] = $annotation;
                    $hit = $this->addToDs0AllPredicates($hit, $annotation);
                }
            }
        }
        return $hit;
    }

    /**
     * Helper functions
     */

    private function addToDs0AllPredicates($hit, $annotation) {
        $hit["ds0__allPredicates.1v11"] = array_merge(
            $hit["ds0__allPredicates.1v11"],
            [
              "All Predicates > ".$annotation["predicate"]
            ],
        );
        // FIXME: considerTruncatingObjectLiteral()
        $hit["ds0__allPredicates.1v12"] = array_merge(
            $hit["ds0__allPredicates.1v12"],
            [
                "All Predicates > ".$annotation["predicate"]." > ".$annotation["objectLiteral"]
            ],
        );
        return $hit;
    }

    private function removeAnnotationsByPredicate($hit, $predicate) {
        $hit["annotations"] = array_filter($hit["annotations"], function($annotation) use($predicate) {
            return $annotation["predicate"] != $predicate;
        });
        return $hit;
    }

    private function getSingleRegexCapture($field, $regex) {
        preg_match_all($regex, $field, $matches);
        if(array_key_exists(1, $matches)) {
            if (count($matches[1]) > 0) {
                return $matches[1][0];
            }
        }
        return "";
    }

    private function addToArrayField($hit, $field, $newValue) {
        $hit[$field][] = $newValue;
        return $hit;
    }

    private function removeFromArrayField($hit, $field, $oldValue) {
        $hit[$field] = array_filter($hit[$field], function($value) use ($oldValue) {
            return $value !== $oldValue;
        });
        return $hit;
    }

    /**
     * Internals
     */

	private function analyzeAndAnnotateMeiliDocs($func, $query, $filter) {
        // Recurse
        $searchResult = $this->getSearchResult(0, $func, $query, $filter);
	}

    private function getSearchResult($offset, $func, $query, $filter) {
        /**
         * FIXME: maxTotalHits is preventing running through all items
         * https://docs.meilisearch.com/reference/api/settings.html?#pagination
         * */ 
        $hits = $this->searchIndex->search(
            $query,
            [
                "filter" => $filter,
                "limit" => $this->limit,
                "offset" => $offset
            ]
        )->getHits();
        $countHits = count($hits);
        foreach ($hits as $hit) {
            $hit = $this->$func($hit);
            $this->writeIndex->addDocuments([$hit]);
        }
        if($countHits > 0) {
            $this->getSearchResult($offset + $this->limit, $func, $query, $filter);
        }
    }

    

}

$maintClass = AnalyzeAndAnnotateMeiliDocs::class;

require_once RUN_MAINTENANCE_IF_MAIN;
