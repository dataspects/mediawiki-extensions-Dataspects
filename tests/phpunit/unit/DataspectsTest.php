<?php

namespace MediaWiki\Extension\Dataspects\Tests;

use MediaWiki\Extension\Dataspects\DataspectsFeed;

class DataspectsTest extends \MediaWikiUnitTestCase {

	protected function setUp(): void {
		parent::setUp();
		$title = \Title::newFromText("Main Page");
		$this->dsf = new DataspectsFeed($title);
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
