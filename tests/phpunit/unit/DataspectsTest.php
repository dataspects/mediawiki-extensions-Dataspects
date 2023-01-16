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
		$this->meiliSearchClient = new \MeiliSearch\Client(getenv('DS_MEILISEARCH_SERVER'), getenv('DS_MEILISEARCH_SEARCH_KEY'), new HttplugClient());
        $this->searchIndex = $this->meiliSearchClient->index(getenv('DS_MEILISEARCH_INDEX'));
		$this->meiliWriteClient = new \MeiliSearch\Client(getenv('DS_MEILISEARCH_SERVER'), getenv('DS_MEILISEARCH_WRITE_KEY'), new HttplugClient());
        $this->writeIndex = $this->meiliWriteClient->index(getenv('DS_MEILISEARCH_INDEX'));
		$this->addTestDocuments();
	}

	protected function tearDown(): void {
		$this->deleteTestDocuments();
		parent::tearDown();
	}

	public function testAll() {
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

	private function addTestDocuments() {
		$this->writeIndex->addDocuments($this->testDocuments);
		sleep(5);
	}

	private function deleteTestDocuments() {
		$ids = array_map(function ($doc) {return $doc["id"]; }, $this->testDocuments);
		$this->writeIndex->deleteDocuments($ids);
	}
}
