<?php

namespace MediaWiki\Extension\DataspectsSearch;

use ManualLogEntry;
use Title;
use User;

class Hooks implements 	\MediaWiki\Storage\Hook\PageSaveCompleteHook,
						\MediaWiki\Hook\BeforePageDisplayHook {

	
	public function onPageSaveComplete( $wikiPage, $user, $summary, $flags, $revisionRecord, $editResult ) {
		switch($this->title->mNamespace) {
      		case 6:
				$job = new DataspectsTikaJob($wikiPage->getTitle(), []);
				\JobQueueGroup::singleton()->push($job);
			break;
			default:
				$job = new DataspectsSpacyJob($wikiPage->getTitle(), []);
				\JobQueueGroup::singleton()->push($job);
			break;
		}	
	}

	public function onBeforePageDisplay( $out, $skin ): void {
		$html = $out->getHTML();
		$out->clearHTML();
		$this->sk = new SeaKay();
		$out->addHTML( $this->sk->markup($html) );
		$out->addModules( 'ext.dataspectsSearch' ); // FIXME: this should not place all modules!
	}

}