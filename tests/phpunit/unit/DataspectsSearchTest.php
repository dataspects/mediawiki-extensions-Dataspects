<?php

namespace MediaWiki\Extension\DataspectsSearch\Tests;

use MediaWiki\Extension\DataspectsSearch\DataspectsSearchFeed;

class DataspectsSearchTest extends \MediaWikiUnitTestCase {

	protected function setUp(): void {
		parent::setUp();
		$title = \Title::newFromText("Main Page");
		$this->dsf = new DataspectsSearchFeed($title);
	}

	protected function tearDown(): void {
		parent::tearDown();
	}

	public function testGetNamespace() {
		echo $this->dsf;
		// $name = $this->dsf->getNamespace(0);
		// $this->assertTrue( true, "Just a test." );
	}
}
