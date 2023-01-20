<?php

# https://www.mediawiki.org/wiki/Composer/For_extensions#Installing_extensions

namespace MediaWiki\Extension\Dataspects;

$basePath = getenv( 'MW_INSTALL_PATH' ) !== false ? getenv( 'MW_INSTALL_PATH' ) : __DIR__ . '/../../..';
require_once $basePath . '/maintenance/Maintenance.php';

class ManageSQLite3 extends \Maintenance {

	public function __construct() {
		parent::__construct();
		$this->addOption( 'initialize', 'Initialize dataspects.sqlite', false );
		$this->requireExtension( 'Dataspects' );
	}

	public function execute() {
		$this->sqlite3 = new DataspectsSQLite3();
		$initialize = $this->getOption( 'initialize', false );
		if($initialize) {
			if($this->sqlite3->initialize()) {
				$this->sqlite3->exec("DELETE FROM facets;");
			}
		}
	}

}

$maintClass = ManageSQLite3::class;

require_once RUN_MAINTENANCE_IF_MAIN;
