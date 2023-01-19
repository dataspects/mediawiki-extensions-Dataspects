<?php

# https://www.mediawiki.org/wiki/Manual:PHP_unit_testing/Writing_unit_tests_for_extensions

namespace MediaWiki\Extension\Dataspects;

class SQLiteTest extends \MediaWikiUnitTestCase {


	protected function setUp(): void {
		parent::setUp();
		$this->sqlite3 = new DataspectsSQLite3("testdataspects.sqlite");
		$this->sqlite3->initialize();
	}

	protected function tearDown(): void {
		parent::tearDown();
		$this->sqlite3->exec("DELETE FROM facets WHERE id = 1;");
	}

	public function testCreate() {
		$jsonIn = '{"environment":{"user":"Lex"},"meilisearchHelper":{"client":{},"state":{"facets":[],"disjunctiveFacets":["ds0__source","mw0__namespace"],"hierarchicalFacets":[{"name":"eppo0__hasEntityType.1v10","attributes":["eppo0__hasEntityType.1v10","eppo0__hasEntityType.1v11","eppo0__hasEntityType.1v12"],"separator":" > ","rootPath":null,"showParentLevel":true},{"name":"ck0__containsCognitiveKeyword.1v10","attributes":["ck0__containsCognitiveKeyword.1v10","ck0__containsCognitiveKeyword.1v11"],"separator":" > ","rootPath":null,"showParentLevel":true},{"name":"ds0__featuresAction.1v10","attributes":["ds0__featuresAction.1v10","ds0__featuresAction.1v11"],"separator":" > ","rootPath":null,"showParentLevel":true},{"name":"ds0__specialAspect.1v10","attributes":["ds0__specialAspect.1v10","ds0__specialAspect.1v11"],"separator":" > ","rootPath":null,"showParentLevel":true},{"name":"ds0__allPredicates.1v10","attributes":["ds0__allPredicates.1v10","ds0__allPredicates.1v11","ds0__allPredicates.1v12"],"separator":" > ","rootPath":null,"showParentLevel":true}],"facetsRefinements":{},"facetsExcludes":{},"disjunctiveFacetsRefinements":{"ds0__source":["https://mwstake.org/mwstake/wiki/","Element","https://smw-cindykate.com/wiki/","https://wiki.dataspects.com/wiki/","Code","https://www.mediawiki.org/wiki/"],"mw0__namespace":["File"]},"numericRefinements":{},"tagRefinements":[],"hierarchicalFacetsRefinements":{"eppo0__hasEntityType.1v10":[],"ck0__containsCognitiveKeyword.1v10":[],"ds0__featuresAction.1v10":[],"ds0__specialAspect.1v10":[],"ds0__allPredicates.1v10":[]},"index":"mwstakeorg","attributesToSnippet":["eppo0__hasEntityTitle","ds0__text:100"],"hitsPerPage":5,"query":"","maxValuesPerFacet":1000,"highlightPreTag":"__ais-highlight__","highlightPostTag":"__/ais-highlight__","page":0},"lastResults":null,"_queryId":1,"_lastQueryIdReceived":-1,"derivedHelpers":[],"_currentNbQueries":1,"_events":{}}}';
		$this->sqlite3->exec("INSERT INTO facets(name, ds0instantsearchHelper) VALUES('Issues managed on mwstake.org', '$jsonIn');");
		$arrBack = $this->sqlite3->getDs0instantsearchHelpers();
		$this->assertEquals("Issues managed on mwstake.org", $arrBack[0]["name"]);
		$this->assertEquals(json_decode($jsonIn), $arrBack[0]["ds0__instantsearchHelper"]);
	}

}