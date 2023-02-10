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
		wfDebug("### onPageSaveComplete REGISTER __>__: ".$params["namespace"].":".$params["title"]);
		switch($title->getNamespace()) {
			case 0:
				$job = new DataspectsIndexJob("dataspectsIndexJob", $params);
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
		$this->sk = new CoKe();
		$out->addHTML( $this->sk->markup($html) );
		$out->addModules( 'ext.dataspectsSearch' ); // FIXME: this should not place all modules!
	}

	public static function onParserFirstCallInit( \Parser $parser ) {
		$parser->setFunctionHook( 'numberOfWords', [ self::class, 'renderNumberOfWords' ] );
	}

	public static function renderNumberOfWords( \Parser $parser, $param0 = '' ) {
		return TextAccounting::numberOfWords($param0);
	}

}