<?php

namespace MediaWiki\Extension\DataspectsSearch;

use Laudis\Neo4j\Authentication\Authenticate;
use Laudis\Neo4j\ClientBuilder;
use Laudis\Neo4j\Contracts\TransactionInterface;
use MeiliSearch\Client;

$basePath = getenv( 'MW_INSTALL_PATH' ) !== false ? getenv( 'MW_INSTALL_PATH' ) : __DIR__ . '/../../..';
require_once $basePath . '/maintenance/Maintenance.php';

class DMFFeedOne extends \Maintenance {

	public function execute() {
		$title = \Title::newFromText('File:TWebC.png');
		// $title = \Title::newFromText('Main Page');
		$this->feedOne($title);
	}

	private function feedOne($title) {
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

}

$maintClass = DMFFeedOne::class;

require_once RUN_MAINTENANCE_IF_MAIN;
