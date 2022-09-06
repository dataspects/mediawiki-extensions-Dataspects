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
		# FIXME: implement job queue
		$dmwf = new \MediaWiki\Extension\DataspectsSearch\DataspectsSearchFeed($wikiPage->getTitle());
    	$dmwf->sendToDatastore();
		// try {
		// 	$job = new DataspectsSearchFeedSendJob($wikiPage->getTitle(), []);
		// 	\JobQueueGroup::singleton()->push($job);
		// } catch (Exception $ex) {
		// 	$h = fopen('/var/log/apache2/error.log', 'a');
		// 	fwrite($h, "Error dataspects onPageSaveComplete\n");
		// 	fclose($h);
		// }
	}

}