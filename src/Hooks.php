<?php

namespace MediaWiki\Extension\Dataspects;

use ManualLogEntry;
use Title;
use User;

class Hooks implements 	\MediaWiki\Storage\Hook\PageSaveCompleteHook,
						\MediaWiki\Hook\BeforePageDisplayHook {

	
	public function onPageSaveComplete( $wikiPage, $user, $summary, $flags, $revisionRecord, $editResult ) {
		$title = $wikiPage->getTitle();
		$params = [
			"namespace" => $title->getNamespace(),
			"title" => $title->getBaseText()
		];
		switch($title->getNamespace()) {
			case 0:
				$job = new DataspectsSpacyJob("dataspectsSpacyJob", $params);
				\JobQueueGroup::singleton()->push($job);
			break;
      		case 6:
				$job = new DataspectsTikaJob("dataspectsTikaJob", $params);
				\JobQueueGroup::singleton()->push($job);
			break;
			default:
				
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