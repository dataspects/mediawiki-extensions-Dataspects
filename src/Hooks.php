<?php

namespace MediaWiki\Extension\DataspectsSearch;

use ManualLogEntry;
use Title;
use User;

class Hooks implements \MediaWiki\Storage\Hook\PageSaveCompleteHook {

	
	public function onPageSaveComplete( $wikiPage, $user, $summary, $flags, $revisionRecord, $editResult ) {
		// https://www.mediawiki.org/wiki/Manual:Logging_to_Special:Log
		$logEntry = new ManualLogEntry( 'dataspects', 'test' );
		$logEntry->setTarget( $wikiPage->getTitle() );
		$logEntry->setPerformer( $user );
		$logEntry->setParameters( [
			'4::unused' => 'log onPageSaveComplete: '.$wikiPage->getTitle()->getBaseTitle(). " by ".$user->getName(),
		] );
		$logEntry->insert();
	}



}