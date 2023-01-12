<?php

# https://www.mediawiki.org/wiki/Composer/For_extensions#Installing_extensions

namespace MediaWiki\Extension\Dataspects;
use \Symfony\Component\HttpClient\HttplugClient;
use \MeiliSearch\Client;

$basePath = getenv( 'MW_INSTALL_PATH' ) !== false ? getenv( 'MW_INSTALL_PATH' ) : __DIR__ . '/../../..';
require_once $basePath . '/maintenance/Maintenance.php';

class AnalyzeAndAnnotateMeiliDocs extends \Maintenance {

    public function __construct() {
		parent::__construct();
		$this->addOption( 'job', 'Job to execute', true );
		$this->requireExtension( 'Dataspects' );
	}

	public function execute() {

        $this->limit = 1000; // FIXME: Meilisearch's maxTotalHits for processing really all docs in the index! 
        
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
        /**
         * Set $doWrite to true to write analyzed and annotated docs back to Meilisearch
         */
        $doWrite = false;
        $job = $this->getOption( 'job', 'dummyJob' );

        # JOBS
        ######
        
        $jobs = [
            "processElementMessages" => [
                "query" => "",
                "filter" => [
                    [
                        "ds0__source = 'Element'"
                    ]
                ]
            ],
            "processExtensionPagesFromMediaWikiOrg" => [
                "query" => "",
                "filter" => [
                    [
                        "ds0__source = 'https://www.mediawiki.org/wiki/'"
                    ]
                ]
            ],
            "dummyJob" => [
                "query" => "",
                "filter" => []
            ]
        ];

        $this->analyzeAndAnnotateMeiliDocs($job, $jobs[$job]["query"], $jobs[$job]["filter"], $doWrite);
	}

    /**
     * Job functions
     */

    private function processElementMessages($hit) {
        $hit = $this->escamAnnotations($hit, $hit["ds0__text"]);
        return $hit;
    }

    private function processExtensionPagesFromMediaWikiOrg($hit) {
        $hit = $this->usedInPackageAndOrFarm($hit);
        // $hit = $this->removeAnnotationsByPredicate($hit, "ds0:usedInPackageAndOrFarm");
        // print_r($hit);
        // $hit = $this->addToArrayField($hit, "eppo0__categories", "Lex");
        // $hit = $this->removeFromArrayField($hit, "eppo0__categories", "Lex");
        // wfDebug("### ANALYZE: ".$hit["id"]);
        return $hit;
    }

    private function dummyJob($hit) {
        echo "dummyJob job function";
        return $hit;
    }

    /**
     * Helper functions
     */

    private function usedInPackageAndOrFarm($hit) {
        $capture = $this->getSingleRegexCapture($hit["mw0__wikiText"], "/{{Used by\|(.*=1)+}}/");
        if($capture != "") {
            foreach (explode("|", $capture) as $value) {
                $annotation = [
                    "subject"   => $hit["mw0__rawUrl"],
                    "predicate" => "ds0:usedInPackageAndOrFarm",
                    "objectLiteral"    => explode("=", $value)[0]
                ];
                $hit = $this->addAnnotation($hit, $annotation);
                $hit = $this->addToDs0AllPredicates($hit, $annotation);
            }
        }
        return $hit;
    }

    private function escamAnnotations($hit, $text) {
        // Endpoint, see LEX230111144200
        $url = $GLOBALS['wgDataspectsSpacyURL']."/escam-annotations";
        $spaCyInsight = $this->spaCy($text, $url);
        foreach($spaCyInsight["annotations"] as $spaCyInsightAnnotation) {
            $annotation = [
                "subject"   => $hit["mw0__rawUrl"],
                "predicate" => $spaCyInsightAnnotation["fullPredicateName"],
                "objectLiteral" => true
            ];
            $hit = $this->addAnnotation($hit, $annotation);
            $hit = $this->addToDs0AllPredicates($hit, $annotation);
        }
        return $hit;
    }

    private function addToDs0AllPredicates($hit, $annotation) {
        if($hit["ds0__allPredicates.1v11"]) {
            $hit["ds0__allPredicates.1v11"] = array_merge(
                $hit["ds0__allPredicates.1v11"],
                [
                  "All Predicates > ".$annotation["predicate"]
                ],
            );
        } else {
            $hit["ds0__allPredicates.1v11"] = [
                "All Predicates > ".$annotation["predicate"]
            ];
        }
        
        // FIXME: considerTruncatingObjectLiteral()
        if($hit["ds0__allPredicates.1v12"]) {
            $hit["ds0__allPredicates.1v12"] = array_merge(
                $hit["ds0__allPredicates.1v12"],
                [
                    "All Predicates > ".$annotation["predicate"]." > ".$annotation["objectLiteral"]
                ],
            );
        } else {
            $hit["ds0__allPredicates.1v12"] = [
                "All Predicates > ".$annotation["predicate"]." > ".$annotation["objectLiteral"]
            ];
        }
        return $hit;
    }

    private function addAnnotation($hit, $annotation) {
        $logMessage = "Added annotation to ".$hit["eppo0__hasEntityTitle"]."\n";
        if($hit["annotations"]) {
            if(!in_array($annotation, $hit["annotations"])) {
                $hit["annotations"][] = $annotation;
                echo $logMessage;
            }
        } else {
            $hit["annotations"] = [$annotation];
            echo $logMessage;
        }
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

    private function spaCy($text, $url) {
        $ch = curl_init($url);
        curl_setopt_array($ch, array(
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => json_encode(['text' => $text]),
            // CURLOPT_VERBOSE => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false, // FIXME
            CURLOPT_SSL_VERIFYHOST => false
        ));
        $data = (array) json_decode(curl_exec($ch), true);
        return $data;
    }

	private function analyzeAndAnnotateMeiliDocs($func, $query, $filter, $doWrite) {
        // Recurse
        $searchResult = $this->getSearchResult(0, $func, $query, $filter, $doWrite);
	}

    private function getSearchResult($offset, $func, $query, $filter, $doWrite = false) {
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
            /**
             * Here we run the passed in function
             */
            $hit = $this->$func($hit);
            /**
             * Then we write the document to the index, FIXME: batch?
             */
            if($doWrite) {
                echo "### Write '".$hit["eppo0__hasEntityTitle"]."'...\n";
                $this->writeIndex->addDocuments([$hit]);
            }
        }
        if($countHits > 0) {
            $this->getSearchResult($offset + $this->limit, $func, $query, $filter);
        }
    }

}

$maintClass = AnalyzeAndAnnotateMeiliDocs::class;

require_once RUN_MAINTENANCE_IF_MAIN;
