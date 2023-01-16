<?php

# https://www.mediawiki.org/wiki/Manual:PHP_unit_testing/Writing_unit_tests_for_extensions

namespace MediaWiki\Extension\Dataspects;
use \Symfony\Component\HttpClient\HttplugClient;
use \MeiliSearch\Client;

class DataspectsTest extends \MediaWikiUnitTestCase {

	private $testDocuments = [
		[
			"id" => "dataspectsTestDoc1673881510",
			"release_timestamp" => "1673881510",
			"ds0__source" => "DataspectsTest"
		]
	];

	protected function setUp(): void {
		parent::setUp();
		$this->meilisearchConfig = [
			"wgDataspectsSearchURL" => getenv("DS_MEILISEARCH_SERVER"),
			"wgDataspectsSearchKey" => getenv("DS_MEILISEARCH_SEARCH_KEY"),
			"wgDataspectsWriteURL" => getenv("DS_MEILISEARCH_SERVER"),
			"wgDataspectsWriteKey" => getenv("DS_MEILISEARCH_WRITE_KEY"),
			"wgDataspectsIndex" => getenv("DS_MEILISEARCH_INDEX")
		];
		require_once __DIR__."/../../../src/AnalyzeAndAnnotateMeiliDocsJob.php";
        foreach (glob(__DIR__."/../../../src/jobs/*.php") as $filename) {
            require_once $filename;
        }
		$this->meiliSearchClient = new \MeiliSearch\Client($this->meilisearchConfig['wgDataspectsSearchURL'], $this->meilisearchConfig['wgDataspectsSearchKey'], new HttplugClient());
        $this->searchIndex = $this->meiliSearchClient->index($this->meilisearchConfig['wgDataspectsIndex']);
		
		$this->meiliWriteClient = new \MeiliSearch\Client($this->meilisearchConfig['wgDataspectsWriteURL'], $this->meilisearchConfig['wgDataspectsWriteKey'], new HttplugClient());
		$this->writeIndex = $this->meiliWriteClient->index($this->meilisearchConfig['wgDataspectsIndex']);
		
		$this->addTestDocuments();
	}

	protected function tearDown(): void {
		$this->deleteTestDocuments();
		parent::tearDown();
	}

	public function testAll() {
		$this->testAddedDocuments();
		$this->testRemoveDuplicateFieldValues();
	}

	private function testAddedDocuments() {
		$this->assertCount(1, $this->hitsForsearchForReleaseTimestamp("1673881510"));
	}

	private function hitsForsearchForReleaseTimestamp($timestamp) {
		$hits = $this->searchIndex->search(
            "",
            [
                "filter" => [
					"release_timestamp = $timestamp"
				],
                "limit" => 10,
                "offset" => 0
            ]
        )->getHits();
		return $hits;
	}

	private function testRemoveDuplicateFieldValues() {
		$job = new AnalyzeJobs\RemoveDuplicateFieldValues($this->meilisearchConfig, true);
	}

	private function addTestDocuments() {
		$this->writeIndex->addDocuments($this->testDocuments);
		sleep(5);
	}

	private function deleteTestDocuments() {
		$ids = array_map(function ($doc) {return $doc["id"]; }, $this->testDocuments);
		$this->writeIndex->deleteDocuments($ids);
	}
}
