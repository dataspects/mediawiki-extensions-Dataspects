<?php

# https://www.mediawiki.org/wiki/Manual:PHP_unit_testing/Writing_unit_tests_for_extensions

namespace MediaWiki\Extension\Dataspects;
use \Symfony\Component\HttpClient\HttplugClient;
use \MeiliSearch\Client; // https://meilisearch.github.io/meilisearch-php/namespaces/meilisearch.html

class DataspectsTest extends \MediaWikiUnitTestCase {

	# Meili doc at LEX200122141600

	protected function setUp(): void {
		parent::setUp();
		$this->globalsConfig = [
			"wgDataspectsNeo4jURL" => "neo4j://neo4jtest:7687",
            "wgDataspectsNeo4jDatabase" => "dataspectstest",
			"wgDataspectsNeo4jUsername" => "neo4j",
			"wgDataspectsNeo4jPassword" => "globi2000",
			"wgDataspectsSpacyURL" => "http://spacy:8050",
			"wgDataspectsSearchURL" => "http://meili:7700",
			"wgDataspectsSearchKey" => "masterKey",
			"wgDataspectsWriteURL" => "http://meili:7700",
			"wgDataspectsWriteKey" => "masterKey",
			"wgDataspectsIndex" => "testindex",
            "wgSQLiteDatabase" => "dataspectstest",
			"wgSelectedAspects" => [
				"ds55__unrecommends" => [
					"title" => "Unrecommending"
				]
			]
		];
		require_once __DIR__."/../../../src/AnalyzeAndAnnotateMeiliDocsJob.php";
        foreach (glob(__DIR__."/../../../src/jobs/*.php") as $filename) {
            require_once $filename;
        }
		$this->meiliSearchClient = new \MeiliSearch\Client($this->globalsConfig['wgDataspectsSearchURL'], $this->globalsConfig['wgDataspectsSearchKey'], new HttplugClient());
		
		$this->meiliWriteClient = new \MeiliSearch\Client($this->globalsConfig['wgDataspectsWriteURL'], $this->globalsConfig['wgDataspectsWriteKey'], new HttplugClient());

		$this->neo4jClient = new DSNeo4j(
			$this->globalsConfig["wgDataspectsNeo4jURL"],
			$this->globalsConfig["wgDataspectsNeo4jUsername"],
			$this->globalsConfig["wgDataspectsNeo4jPassword"],
            $this->globalsConfig["wgDataspectsNeo4jDatabase"]
		);
	}

	protected function tearDown(): void {
		parent::tearDown();
	}

    public function testResetTestData() {
        $this->initializeMeilisearchTestIndex();
        $this->initializeNeo4jTestDatabase();
        $this->initializeSQLite3TestDatabase();
        $json = file_get_contents(__DIR__.'/../../data/testDocuments.json');
        $testDocuments = json_decode($json,true);
        $this->writeIndex->addDocuments($testDocuments);
        foreach ($testDocuments as $testDocument) {
            $this->neo4jClient->addPageToNeo4j($testDocument);
        }
		sleep(1);
		$hits = $this->searchIndex->search("", [ "filter" => [], "limit" => 10, "offset" => 0 ])->getHits();
		$this->assertCount(count($testDocuments), $hits);
        // + 4 is due to source, templates and cats!
        $this->assertEquals(count($testDocuments) + 4, $this->neo4jClient->countNodes());
	}

	public function testSaveAndRetrieveSearchFacetsToFromNeo4j() {
		// $this->markTestSkipped();
		echo $this->neo4jClient->addSearchFacet("Test search facet", "Comment");
		echo $this->neo4jClient->addSearchFacet("Search facet for test", "Comment");
		echo $this->neo4jClient->addSearchFacet("Search for me", "Comment");
		print_r($this->neo4jClient->typeahead("for est"));
	}

	public function testSearch() {
		$this->markTestSkipped();
		$hits = $this->searchIndex->search(
            "abcdef",
            [
                "filter" => [],
                "limit" => 10,
                "offset" => 0
            ]
        )->getHits();
		$this->assertCount(1, $hits);
	}

	public function testRemoveDuplicateFieldValues() {
		$this->markTestSkipped();
		$hits = $this->hitsForsearchForReleaseTimestamp("1673881510");
		$this->assertCount(2, $hits[0]["ds0__specialAspect.1v11"]);
		$job = new AnalyzeJobs\RemoveDuplicateFieldValues($this->globalsConfig, "true");
		$job->execute();
		sleep(1);
		$hits = $this->hitsForsearchForReleaseTimestamp("1673881510");
		$this->assertCount(1, $hits[0]["ds0__specialAspect.1v11"]);
	}

	public function testProcessSelectedAspects() {
		$this->markTestSkipped();
		$hits = $this->hitsForsearchForReleaseTimestamp("1673881510");
		$this->assertCount(2, $hits[0]["ds0__specialAspect.1v11"]);
		$job = new AnalyzeJobs\ProcessSelectedAspects($this->globalsConfig, "true");
		$job->execute();
		sleep(1);
		$hits = $this->hitsForsearchForReleaseTimestamp("1673881510");
		$this->assertCount(3, $hits[0]["ds0__specialAspect.1v11"]);
	}

	public function testProcessExtensionPagesFromMediaWikiOrg() {
		$this->markTestSkipped();
		$hits = $this->hitsForsearchForReleaseTimestamp("1673881510");
		$job = new AnalyzeJobs\ProcessExtensionPagesFromMediaWikiOrg($this->globalsConfig, "true");
		$job->execute();
		sleep(1);
		$hits = $this->hitsForsearchForReleaseTimestamp("1673881510");
		$this->assertEquals($hits[0]["ds0__allPredicates.1v10"][0], "All Predicates > ds0:usedInPackageAndOrFarm");
		$this->assertEquals($hits[0]["ds0__allPredicates.1v11"][0], "All Predicates > ds0:usedInPackageAndOrFarm > abcdef");
		$this->assertContains([
			"subject"   => "http://localhost/wiki/wikidataspectsTestDoc1673881510",
			"predicate" => "ds0:usedInPackageAndOrFarm",
			"objectSource" => "abcdef",
			"objectHTML" => "abcdef",
			"objectText" => "abcdef",
			"objectType" => "Text"
		], $hits[0]["annotations"]);
	}

	public function testProcessElementMessages() {
		$this->markTestSkipped();
		$hits = $this->hitsForsearchForReleaseTimestamp("1673881510");
		$job = new AnalyzeJobs\ProcessElementMessages($this->globalsConfig, "true");
		$job->execute();
		sleep(1);
		$hits = $this->hitsForsearchForReleaseTimestamp("1673881510");
		$this->assertEquals($hits[0]["ds0__allPredicates.1v10"][0], "All Predicates > ds55__notRemembering");
		$this->assertEquals($hits[0]["ds0__allPredicates.1v11"][0], "All Predicates > ds55__notRemembering > 1");
		$this->assertContains([
			"subject"   => "http://localhost/wiki/wikidataspectsTestDoc1673881510",
			"predicate" => "ds55__notRemembering",
			"objectSource" => true,
			"objectHTML" => true,
			"objectText" => true,
			"objectType" => "Boolean"
		], $hits[0]["annotations"]);
	}

	private function initializeMeilisearchTestIndex() {
		// Existing indexes
		$indexUids = array_map(function ($index) {return $index->getUid(); }, $this->meiliSearchClient->getAllIndexes()->getResults());
		// Delete?
		if(in_array($this->globalsConfig['wgDataspectsIndex'], $indexUids)) {
			$this->meiliSearchClient->deleteIndex($this->globalsConfig['wgDataspectsIndex']);
			sleep(1);
		}
		// Create!
		$this->meiliSearchClient->createIndex($this->globalsConfig['wgDataspectsIndex']);
		sleep(1);
		$testindex = $this->meiliSearchClient->index($this->globalsConfig['wgDataspectsIndex']);
		// Settings!
		$settings = (array) json_decode(file_get_contents(__DIR__."/../../../src/indexsettings.json"));
		$testindex->updateSettings($settings);
		sleep(1);
		$this->assertEquals("eppo0__hasEntityTitle", $testindex->getSettings()["searchableAttributes"][0]);
		// Create index objects!
		$this->searchIndex = $testindex;
		$this->writeIndex = $testindex;
	}

    private function initializeNeo4jTestDatabase() {
        $databaseNames = $this->neo4jClient->listDatabaseNames();
        if(in_array($this->globalsConfig['wgDataspectsNeo4jDatabase'], $databaseNames)) {
            $this->neo4jClient->deleteAllNodes();
        } else {
            echo $this->globalsConfig['wgDataspectsNeo4jDatabase']." not found!";
        }
    }

    private function initializeSQLite3TestDatabase() {
        $this->sqlite3 = new DataspectsSQLite3("dataspectstest.sqlite");
        $this->sqlite3->initialize();
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

	

}
