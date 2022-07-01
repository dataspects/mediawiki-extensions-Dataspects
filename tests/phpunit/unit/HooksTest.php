<?php

namespace MediaWiki\Extension\DataspectsSearch\Tests;

use MediaWiki\Extension\DataspectsSearch\Hooks;

/**
 * @coversDefaultClass \MediaWiki\Extension\DataspectsSearch\Hooks
 */
class HooksTest extends \MediaWikiUnitTestCase {

	/**
	 * @covers ::onBeforePageDisplay
	 */
	public function testOnBeforePageDisplayVandalizeIsTrue() {
		$config = new \HashConfig( [
			'BoilerPlateVandalizeEachPage' => true
		] );
		$outputPageMock = $this->getMockBuilder( \OutputPage::class )
			->disableOriginalConstructor()
			->getMock();
		$outputPageMock->method( 'getConfig' )
			->willReturn( $config );

		$outputPageMock->expects( $this->once() )
			->method( 'addHTML' )
			->with( '<p>DataspectsSearch was here</p>' );
		$outputPageMock->expects( $this->once() )
			->method( 'addModules' )
			->with( 'oojs-ui-core' );

		$skinMock = $this->getMockBuilder( \Skin::class )
			->disableOriginalConstructor()
			->getMock();

		( new Hooks )->onBeforePageDisplay( $outputPageMock, $skinMock );
	}

	/**
	 * @covers ::onBeforePageDisplay
	 */
	public function testOnBeforePageDisplayVandalizeFalse() {
		$config = new \HashConfig( [
			'BoilerPlateVandalizeEachPage' => false
		] );
		$outputPageMock = $this->getMockBuilder( \OutputPage::class )
			->disableOriginalConstructor()
			->getMock();
		$outputPageMock->method( 'getConfig' )
			->willReturn( $config );
		$outputPageMock->expects( $this->never() )
			->method( 'addHTML' );
		$outputPageMock->expects( $this->never() )
			->method( 'addModules' );
		$skinMock = $this->getMockBuilder( \Skin::class )
			->disableOriginalConstructor()
			->getMock();
		( new Hooks )->onBeforePageDisplay( $outputPageMock, $skinMock );
	}

}
