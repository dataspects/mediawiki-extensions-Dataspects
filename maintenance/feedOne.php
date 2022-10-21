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
		$title = \Title::newFromText('Bylaws');
		$this->feedOne($title);
	}

	private function feedOne($title) {
		switch($title->mNamespace) {
      		case 6:
				$job = new DataspectsTikaJob($title, []);
				\JobQueueGroup::singleton()->push($job);
			break;
			default:
				$job = new DataspectsSpacyJob($title, []);
				\JobQueueGroup::singleton()->push($job);
			break;
		}
	}

}

$maintClass = DMFFeedOne::class;

require_once RUN_MAINTENANCE_IF_MAIN;
