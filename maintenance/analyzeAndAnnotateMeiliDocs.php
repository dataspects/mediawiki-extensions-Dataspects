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
        $this->counter = 1;
        
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
        $query = "Zoom";
        $filter = [
            [
                "ds0__source = 'https://mwstake.org/mwstake/wiki/'"
            ]
        ];
        $this->analyzeAndAnnotateMeiliDocs("myJob", $query, $filter);

	}

    private function myJob($hit) {
        // print_r($hit);
        // echo $this->counter." ".$hit["id"]."\n";
        // $hit = $this->addToArrayField($hit, "eppo0__categories", "Lex");
        $hit = $this->removeFromArrayField($hit, "eppo0__categories", "Lex");
        // wfDebug("### ANALYZE: ".$hit["id"]);
        return $hit;
    }

    /**
     * Helper functions
     */

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
            $this->counter++;
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
