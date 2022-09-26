<?php

use Laudis\Neo4j\Authentication\Authenticate;
use Laudis\Neo4j\ClientBuilder;
use Laudis\Neo4j\Contracts\TransactionInterface;
use MeiliSearch\Client;

$basePath = getenv( 'MW_INSTALL_PATH' ) !== false ? getenv( 'MW_INSTALL_PATH' ) : __DIR__ . '/../../..';
require_once $basePath . '/maintenance/Maintenance.php';

class DMFFeedOne extends Maintenance {

	public function execute() {
		$title = Title::newFromText('Template:Issue');
		// $title = Title::newFromText('Aspect "Effortless Input — Efficient Retrieval"');
		$this->feedOne($title);
	}

	private function feedOne($title) {
		$dsNeo4j = new \MediaWiki\Extension\DataspectsSearch\DSNeo4j();
		try { # FIXME
			$meiliClient = new \MeiliSearch\Client($GLOBALS['wgDataspectsSearchWriteURL'], $GLOBALS['wgDataspectsSearchWriteKey']);
		} catch (\MeiliSearch\Exceptions\ApiException $e) {
			echo 'Caught exception: ',  $e->getMessage(), "\n";
		}
		$dmwf = new \MediaWiki\Extension\DataspectsSearch\DataspectsSearchFeed($title, NULL, $dsNeo4j, $meiliClient); #FIXME: NULL is bad design
		$dmwf->sendToDatastore();
	}

}

$maintClass = DMFFeedOne::class;

require_once RUN_MAINTENANCE_IF_MAIN;
