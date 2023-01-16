<?php

# https://www.mediawiki.org/wiki/Manual:PHP_unit_testing/Writing_unit_tests_for_extensions

namespace MediaWiki\Extension\Dataspects;
use \Symfony\Component\HttpClient\HttplugClient;
use \MeiliSearch\Client;

class DataspectsTest extends \MediaWikiUnitTestCase {

	private $testDocuments = [
		[
			"id" => "dataspectsTestDoc1673881510",
			"eppo0__hasEntityTitle" => "testDoc",
			"release_timestamp" => "1673881510",
			"ds0__source" => "DataspectsTest",
			"ds0__specialAspect.1v11" => [ "One", "One" ]
		]
	];

	protected function setUp(): void {
		parent::setUp();
		$this->meilisearchConfig = [
			"wgDataspectsSearchURL" => getenv("DS_MEILISEARCH_SERVER"),
			"wgDataspectsSearchKey" => getenv("DS_MEILISEARCH_TESTINDEX_KEY"),
			"wgDataspectsWriteURL" => getenv("DS_MEILISEARCH_SERVER"),
			"wgDataspectsWriteKey" => getenv("DS_MEILISEARCH_TESTINDEX_KEY"),
			"wgDataspectsIndex" => "testindex"
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
		$hits = $this->testAddedDocuments();
		$this->testRemoveDuplicateFieldValues($hits);
	}

	private function testAddedDocuments() {
		$hits = $this->hitsForsearchForReleaseTimestamp("1673881510");
		$this->assertCount(1, $hits);
		return $hits;
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

	private function testRemoveDuplicateFieldValues($hits) {
		$job = new AnalyzeJobs\RemoveDuplicateFieldValues($this->meilisearchConfig, "true");
		$this->assertCount(2, $hits[0]["ds0__specialAspect.1v11"]);
		$job->execute();
		sleep(3);
		$hits = $this->hitsForsearchForReleaseTimestamp("1673881510");
		$this->assertCount(1, $hits[0]["ds0__specialAspect.1v11"]);
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
