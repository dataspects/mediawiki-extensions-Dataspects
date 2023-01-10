<?php

# https://www.mediawiki.org/wiki/Composer/For_extensions#Installing_extensions

namespace MediaWiki\Extension\Dataspects;

$basePath = getenv( 'MW_INSTALL_PATH' ) !== false ? getenv( 'MW_INSTALL_PATH' ) : __DIR__ . '/../../..';
require_once $basePath . '/maintenance/Maintenance.php';

class DMFFeedOne extends \Maintenance {

	public function execute() {
		$title = \Title::newFromText('File:TWebC.png');
		// $title = \Title::newFromText('Software "Canasta"');
		$this->feedOne($title);
	}

	private function feedOne($title) {
		$params = [
			"namespace" => $title->getNamespace(),
			"title" => $title->getBaseText()
		];
		wfDebug("### REGISTER: ".$params["namespace"].":".$params["title"]);
		switch($params["namespace"]) {
			case 0:
				// $job = new DataspectsSpacyJob("dataspectsSpacyJob", $params);
				// \JobQueueGroup::singleton()->push($job);
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

}

$maintClass = DMFFeedOne::class;

require_once RUN_MAINTENANCE_IF_MAIN;
