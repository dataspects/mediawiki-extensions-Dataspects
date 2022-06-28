<?php

/**
 * @group Feeder
 * @covers MeilisearchForMediaWikiFeeder
 */
namespace MediaWiki\Extension\MeilisearchForMediaWiki\Tests;

use MediaWiki\Extension\MeilisearchForMediaWiki\MeilisearchForMediaWiki;

class MeilisearchForMediaWikiFeederTest extends \MediaWikiUnitTestCase {

	protected function setUp(): void {
		parent::setUp();
	}

	protected function tearDown(): void {
		parent::tearDown();
	}

	public function testMe() {
		$title = new \TitleValue(0, "Main Page");
		$this->assertTrue( true, "Just a test." );
	}
}
