<?php

namespace MediaWiki\Extension\Dataspects;
use \Symfony\Component\HttpClient\HttplugClient;
use \MeiliSearch\Client;

class AnalyzeAndAnnotateMeiliDocsJob {

    public function __construct($doWrite) {
        $this->doWrite = $doWrite;
        $this->limit = 1000; // FIXME: Meilisearch's maxTotalHits for processing really all docs in the index! 

        $meiliSearchClient = new \MeiliSearch\Client($GLOBALS['wgDataspectsWriteURL'], $GLOBALS['wgDataspectsSearchKey'], new HttplugClient());
        $this->searchIndex = $meiliSearchClient->index($GLOBALS['wgDataspectsIndex']);
        
        $meiliWriteClient = new \MeiliSearch\Client($GLOBALS['wgDataspectsWriteURL'], $GLOBALS['wgDataspectsWriteKey'], new HttplugClient());
        $this->writeIndex = $meiliWriteClient->index($GLOBALS['wgDataspectsIndex']);

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
        foreach ($hits as $hit) {
            $hit = $this->hitFunction($hit);
            /**
             * Then we write the document to the index, FIXME: batch?
             */
            if($this->doWrite === 'true') {
                echo "### Write '".$hit["eppo0__hasEntityTitle"]."'...\n";
                $this->writeIndex->addDocuments([$hit]);
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

    protected function addToDs0AllPredicates($hit, $annotation) {
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

    protected function spaCy($text, $url) {
        $ch = curl_init($url);
        curl_setopt_array($ch, array(
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => json_encode(['text' => $text]),
            CURLOPT_VERBOSE => false,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false, // FIXME
            CURLOPT_SSL_VERIFYHOST => false
        ));
        $data = (array) json_decode(curl_exec($ch), true);
        return $data;
    }

    protected function removeAnnotationsByPredicate($hit, $predicate) {
        $hit["annotations"] = array_filter($hit["annotations"], function($annotation) use($predicate) {
            return $annotation["predicate"] != $predicate;
        });
        return $hit;
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

    protected function log($message) {
        echo static::class.": '$message'\n";
    }

}