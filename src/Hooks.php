<?php

namespace MediaWiki\Extension\DataspectsSearch;

use ManualLogEntry;
use Title;
use User;

class Hooks implements 	\MediaWiki\Storage\Hook\PageSaveCompleteHook,
						\MediaWiki\Hook\BeforePageDisplayHook {

	
	public function onPageSaveComplete( $wikiPage, $user, $summary, $flags, $revisionRecord, $editResult ) {
		// https://www.mediawiki.org/wiki/Manual:Logging_to_Special:Log
		# FIXME: implement job queue
		$dmwf = new \MediaWiki\Extension\DataspectsSearch\DataspectsSearchFeed($wikiPage->getTitle(), $user);
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

	public function onBeforePageDisplay( $out, $skin ): void {
		$html = $out->getHTML();
		$out->clearHTML();
		$this->sk = new SeaKay();
		$out->addHTML( $this->sk->markup($html) );
		$out->addModules( 'ext.dataspectsSearch' );
	}

}