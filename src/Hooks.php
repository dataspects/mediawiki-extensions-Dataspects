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
		try {
			$dsNeo4j = new \MediaWiki\Extension\DataspectsSearch\DSNeo4j();
			try { # FIXME
				$meiliClient = new \MeiliSearch\Client($GLOBALS['wgDataspectsSearchWriteURL'], $GLOBALS['wgDataspectsSearchWriteKey'], new GuzzleHttp\Client(['verify' => false ]));
			} catch (\MeiliSearch\Exceptions\ApiException $e) {
				echo 'Caught exception: ',  $e->getMessage(), "\n";
			}
			$dsf = new \MediaWiki\Extension\DataspectsSearch\DataspectsSearchFeed($wikiPage->getTitle(), $user, $dsNeo4j, $meiliClient);
			// $dsf->manualLogEntry('onPageSaveComplete: '.$wikiPage->getTitle()->getBaseTitle());
    		$dsf->sendToDatastore();
		} catch (Exception $ex) {
			$h = fopen('/var/log/apache2/error.log', 'a');
			fwrite($h, "Error dataspects onPageSaveComplete\n");
			fclose($h);
		}
		// try {
		// 	$job = new DataspectsSearchFeedSendJob($wikiPage->getTitle(), []);
		// 	\JobQueueGroup::singleton()->push($job);
		// } catch (Exception $ex) {
		// 	$h = fopen('/var/log/apache2/error_log.current', 'a');
		// 	fwrite($h, "Error dataspects onPageSaveComplete\n");
		// 	fclose($h);
		// }
	}

	public function onBeforePageDisplay( $out, $skin ): void {
		$html = $out->getHTML();
		$out->clearHTML();
		$this->sk = new SeaKay();
		$out->addHTML( $this->sk->markup($html) );
		$out->addModules( 'ext.dataspectsSearch' ); // FIXME: this should not place all modules!
	}

}