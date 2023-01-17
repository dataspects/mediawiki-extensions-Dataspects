<?php

# https://www.mediawiki.org/wiki/Manual:PHP_unit_testing/Writing_unit_tests_for_extensions

namespace MediaWiki\Extension\Dataspects;
use \Symfony\Component\HttpClient\HttplugClient;
use \MeiliSearch\Client; // https://meilisearch.github.io/meilisearch-php/namespaces/meilisearch.html

class DataspectsTest extends \MediaWikiUnitTestCase {

	private $testDocuments = [
		[
			// Unique in index
			"id" => "dataspectsTestDoc1673881510", // can be composed, e.g. mwWikiID + mwPageID
			"name" => "http://localhost/wiki/wikidataspectsTestDoc1673881510", // matching name in Neo4j
			"eppo0__hasEntityURL" => "http://localhost/wiki/wikidataspectsTestDoc1673881510",
			// Headers
			"ds0__sourceID" => "", // e.g. mwPageID, can be not unique in index
			"eppo0__hasEntityTitle" => "dst Entity Title 0",
			"eppo0__hasEntityBlurb" => "dst Entity Blurb 0",
			"ds0__sourceNamespace" => "Main", // e.g. MW namespace
			// Time
			"release_timestamp" => "1673881510", // Unix timestamp
			// Entity type
			"eppo0__hasEntityType" => "dst Topic Type",
			"eppo0__hasEntityType.1v10" => "Topic Type",
			"eppo0__hasEntityType.1v11" => "Topic Type > dst Topic Type",
			// Content
			"eppo0__categories" => [ "dst Category 0", "dst Category 1" ],
			"ds0__contentSource" => "{{Template 0|parameter}} text", // E.g. wikitext
			"ds0__contentHTML" => "<b>parameter</b> text",
			"ds0__contentText" => "parameter text", // Stripped HTML
			"ds0__contentSections" => [ "dst Content Section 0", "dst Content Section 1" ],
			"ds0__sourceParseTextURL" => "https://wiki.dataspects.com/w/api.php?action=parse&page=Main_Page&prop=text&disablelimitreport&format=json",
			// Templates
			"ds0__templates" => [ "Template 0" ],
      		"ds0__templates_by_regex" => [ "Template 0" ],
			// Links
			"ds0__outgoingLinks" [
				"https://www.semantic-mediawiki.org/"
			],
      		"ds0__incomingLinks" [
				"http://localhost/wiki/wikidataspectsTestDoc1673881511"
			],
			// Attachments
			"mw0__images" => [],
			"mw0__attachments" => [],
			// Source
			"ds0__source" => "dst Source URL",
			"ds0__source.1v10" => "Source",
			"ds0__source.1v11" => "Source > dst Source URL",
			"ds0__source.1v12" => "Source > dst Source URL > dst Source Namespace",
			// Predicates
			"ds0__allPredicates" => "All Predicates",
			"ds0__allPredicates.1v10",
			"ds0__allPredicates.1v11",
			// Special aspect
			"ds0__specialAspect.1v11" => [ "One", "One" ],
			"annotations" => [
				[
					"subject" => "dataspectsTestDoc1673881510",
					"predicate" => "predicate 0",
					"objectSource" => "{{makebold|object}} 0",
					"objectHTML" => "<b>object</b> 0",
					"objectText" => "object 0",
					"objectType" => "Text" // ,https://www.semantic-mediawiki.org/wiki/Help:List_of_datatypes
				],
				[
					"subject" => "dataspectsTestDoc1673881510",
					"predicate" => "predicate 1",
					"objectSource" => "{{makebold|object}} 1",
					"objectHTML" => "<b>object</b> 1",
					"objectText" => "object 1",
					"objectType" => "Text" // ,https://www.semantic-mediawiki.org/wiki/Help:List_of_datatypes
				],
			],
			// CoKe
			"ck0__containsCognitiveKeyword" => "",
			"ck0__containsCognitiveKeyword.1v10" => "", 
			"ck0__containsCognitiveKeyword.1v11" => ""
		]
	];

	protected function setUp(): void {
		parent::setUp();
		$this->meilisearchConfig = [
			"wgDataspectsSearchURL" => "http://localhost:7700",
			"wgDataspectsSearchKey" => "masterKey",
			"wgDataspectsWriteURL" => "http://localhost:7700",
			"wgDataspectsWriteKey" => "masterKey",
			"wgDataspectsIndex" => "testindex"
		];
		require_once __DIR__."/../../../src/AnalyzeAndAnnotateMeiliDocsJob.php";
        foreach (glob(__DIR__."/../../../src/jobs/*.php") as $filename) {
            require_once $filename;
        }
		$this->meiliSearchClient = new \MeiliSearch\Client($this->meilisearchConfig['wgDataspectsSearchURL'], $this->meilisearchConfig['wgDataspectsSearchKey'], new HttplugClient());
		
		$this->meiliWriteClient = new \MeiliSearch\Client($this->meilisearchConfig['wgDataspectsWriteURL'], $this->meilisearchConfig['wgDataspectsWriteKey'], new HttplugClient());
	}

	protected function tearDown(): void {
		$this->deleteTestDocuments();
		parent::tearDown();
	}

	// public function testAll() {
	// 	$this->addTestDocuments();
	// 	$hits = $this->testAddedDocuments();
	// 	$this->testRemoveDuplicateFieldValues($hits);
	// }

	public function testSearch() {
		$this->initializeTestIndex();
		# Meili doc at LEX200122141600
		// $this->addTestDocuments();
		// $hits = $this->searchIndex->search(
        //     "asd",
        //     [
        //         "filter" => [],
        //         "limit" => 10,
        //         "offset" => 0
        //     ]
        // )->getHits();
		// print_r($hits);
	}

	private function initializeTestIndex() {
		// Existing indexes
		$indexUids = array_map(function ($index) {return $index->getUid(); }, $this->meiliSearchClient->getAllIndexes()->getResults());
		// Delete?
		if(in_array($this->meilisearchConfig['wgDataspectsIndex'], $indexUids)) {
			$this->meiliSearchClient->deleteIndex($this->meilisearchConfig['wgDataspectsIndex']);
		}
		// Create!
		$this->meiliSearchClient->createIndex($this->meilisearchConfig['wgDataspectsIndex']);
		sleep(1);
		$testindex = $this->meiliSearchClient->index($this->meilisearchConfig['wgDataspectsIndex']);
		// Settings!
		$settings = (array) json_decode(file_get_contents(__DIR__."/testindexsettings.json"));
		$testindex->updateSettings($settings);
		sleep(1);
		$this->assertEquals("eppo0__hasEntityTitle", $testindex->getSettings()["searchableAttributes"][0]);
		// Create index objects!
		$this->searchIndex = $testindex;
		$this->writeIndex = $testindex;
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
