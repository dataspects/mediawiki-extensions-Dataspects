<?php

namespace MediaWiki\Extension\Dataspects;
use \Symfony\Component\HttpClient\HttplugClient;
use \MeiliSearch\Client;

class AnalyzeAndAnnotateMeiliDocsJob {

    const OPT_NIA_IGNORE_ORDER = 0x00000001;

    public function __construct($globalsConfig, $doWrite) {
        $this->globalsConfig = $globalsConfig;
        $this->doWrite = $doWrite;
        $this->limit = 1000; // FIXME: Meilisearch's maxTotalHits for processing really all docs in the index! 

        $meiliSearchClient = new \MeiliSearch\Client($this->globalsConfig['wgDataspectsSearchURL'], $this->globalsConfig['wgDataspectsSearchKey'], new HttplugClient());
        $this->searchIndex = $meiliSearchClient->index($this->globalsConfig['wgDataspectsIndex']);
        
        $meiliWriteClient = new \MeiliSearch\Client($this->globalsConfig['wgDataspectsWriteURL'], $this->globalsConfig['wgDataspectsWriteKey'], new HttplugClient());
        $this->writeIndex = $meiliWriteClient->index($this->globalsConfig['wgDataspectsIndex']);

        $this->dsNeo4j = new \MediaWiki\Extension\Dataspects\DSNeo4j(
            $this->globalsConfig["wgDataspectsNeo4jProtocol"],
			$this->globalsConfig["wgDataspectsNeo4jURL"],
			$this->globalsConfig["wgDataspectsNeo4jUsername"],
			$this->globalsConfig["wgDataspectsNeo4jPassword"],
            $this->globalsConfig["wgDataspectsNeo4jDatabase"]
		);
	}

    protected function analyzeAndAnnotateMeiliDocs() {
        // Recurse
        $searchResult = $this->getSearchResult(0);
	}

    private function getSearchResult($offset) {
        /**
         * FIXME: maxTotalHits is preventing running through all items
         * https://docs.meilisearch.com/reference/api/settings.html?#pagination
         * */ 
        $hits = $this->searchIndex->search(
            $this->query,
            [
                "filter" => $this->filter,
                "limit" => $this->limit,
                "offset" => $offset
            ]
        )->getHits();
        $countHits = count($hits);
        foreach ($hits as $originalHit) {
            $consideredHit = $this->hitFunction($originalHit);
            if($this->hash($originalHit, 'sha1') != $this->hash($consideredHit, 'sha1')) {
                /**
                 * Then we write the document to the index, FIXME: batch?
                 */
                if($this->doWrite === 'true') {
                    $this->log(">w", "Write '".$consideredHit["eppo0__hasEntityTitle"]."'...");
                    $this->writeIndex->addDocuments([$consideredHit]);
                    $this->dsNeo4j->addPageToNeo4j($consideredHit);
                }
            }
        }
        if($countHits > 0) {
            $this->getSearchResult($offset + $this->limit);
        }
    }

    protected function getSingleRegexCapture($field, $regex) {
        preg_match_all($regex, $field, $matches);
        if(array_key_exists(1, $matches)) {
            if (count($matches[1]) > 0) {
                return $matches[1][0];
            }
        }
        return "";
    }

    protected function addAnnotation($hit, $annotation) {
        $logMessage = "Added annotation to ".$hit["eppo0__hasEntityTitle"];
        if($hit["annotations"]) {
            if(!in_array($annotation, $hit["annotations"])) {
                $hit["annotations"][] = $annotation;
                $this->log("+a", $logMessage);
            }
        } else {
            $hit["annotations"] = [$annotation];
            $this->log("+a", $logMessage);
        }
        return $hit;
    }

    protected function addToDs0AllPredicates($hit, $annotation) {
        // LEX230118142400
        $hit["ds0__allPredicates.1v10"] = [ "All Predicates" ];
        #
        $v = "All Predicates > ".$annotation["predicate"];
        if($hit["ds0__allPredicates.1v11"]) {
            if(!in_array($v, $hit["ds0__allPredicates.1v11"])) {
                $hit["ds0__allPredicates.1v11"][] = $v;
            }
        } else {
            $hit["ds0__allPredicates.1v11"] = [ $v ];
        }
        #
        // FIXME: considerTruncatingobjectText()
        $v = "All Predicates > ".$annotation["predicate"]." > ".$annotation["objectText"];
        if($hit["ds0__allPredicates.1v12"]) {
            if(!in_array($v, $hit["ds0__allPredicates.1v12"])) {
                $hit["ds0__allPredicates.1v12"][] = $v;
            }
        } else {
            $hit["ds0__allPredicates.1v12"] = [ $v ];
        }
        return $hit;
    }

    
    protected function removeAnnotationsByPredicate($hit, $predicate) {
        if(array_key_exists("annotations", $hit) && is_array($hit["annotations"])) {
            // Remove predicate from annotations
            $hit["annotations"] = array_filter($hit["annotations"], function($annotation) use($predicate) {
                return $annotation["predicate"] != $predicate;
            });
            // Remove predicate from ds0__allPredicates.*
            $hit["ds0__allPredicates.1v11"] = array_filter($hit["ds0__allPredicates.1v11"], function($allPredicates1v11) use($predicate) {
                return $allPredicates1v11 != "All Predicates > ".$predicate;
            });
            $hit["ds0__allPredicates.1v12"] = array_filter($hit["ds0__allPredicates.1v12"], function($allPredicates1v12) use($predicate) {
                return !str_starts_with($allPredicates1v12, "All Predicates > ".$predicate);
            });
        }
        return $hit;
    }

    protected function normalizeFullPredicateNames($value) {
        return preg_replace('/([A-Za-z0-9]+)(?::)([A-Za-z0-9]+)/', '$1__$2', $value);
    }

    protected function addToArrayField($hit, $field, $newValue) {
        $hit[$field][] = $newValue;
        return $hit;
    }

    protected function removeFromArrayField($hit, $field, $oldValue) {
        $hit[$field] = array_filter($hit[$field], function($value) use ($oldValue) {
            return $value !== $oldValue;
        });
        return $hit;
    }

    protected function log($shortMessage, $longMessage = "") {
        echo $shortMessage;
        wfDebug("### ".$longMessage);
    }

    private function hash(array $arr, callable $func, int $options = 0): string {
        $flat = [];
        self::arrayWalkRecursive($arr, function ($path, $value) use (& $flat, & $options) {
            if (is_object($value)) {
                $value = serialize($value);
            }

            if ($options & self::OPT_NIA_IGNORE_ORDER) {
                $flat[$value] = '1';
            } else {
                $flat[implode('.', $path)] = $value;
            }
        });

        ksort($flat);
        $stub = '';
        foreach ($flat as $k => $v) {
            $stub .= $k . '=' . $v . ';';
        }

        return call_user_func($func, $stub);
    }

    private function arrayWalkRecursive(array $arr, callable $walkFunc, array &$path = []) {
        foreach ($arr as $key => $value) {
            $path[] = $key;
            if (is_array($value)) {
                self::arrayWalkRecursive($value, $walkFunc, $path);
            } else {
                $walkFunc($path, $value);
            }
            array_pop($path);
        }
    }

}