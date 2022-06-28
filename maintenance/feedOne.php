<?php

/**
 * To the extent possible under law,  I, Mark Hershberger, have waived all copyright and
 * related or neighboring rights to Hello World. This work is published from the
 * United States.
 *
 * @copyright CC0 http://creativecommons.org/publicdomain/zero/1.0/
 * @author Mark A. Hershberger <mah@everybody.org>
 * @ingroup Maintenance
 */

$basePath = getenv( 'MW_INSTALL_PATH' ) !== false ? getenv( 'MW_INSTALL_PATH' ) : __DIR__ . '/../../..';
require_once $basePath . '/maintenance/Maintenance.php';

class DMFFeedOne extends Maintenance {

	public function execute() {
		$title = Title::newFromText("Main Page");
		$this->feedOne($title);
	}

	private function feedOne($title) {
		$dmwf = new \MediaWiki\Extension\MeilisearchForMediaWiki\MeilisearchForMediaWikiFeed($title);
		// $dmwf->sendToDatastore();
	}

}

$maintClass = DMFFeedOne::class;

require_once RUN_MAINTENANCE_IF_MAIN;
