<?php

namespace MediaWiki\Extension\Dataspects;

$basePath = getenv( 'MW_INSTALL_PATH' ) !== false ? getenv( 'MW_INSTALL_PATH' ) : __DIR__ . '/../../..';
require_once $basePath . '/maintenance/Maintenance.php';

class DMFFeedAll extends \Maintenance {

	public function execute() {
		// api.php?action=query&meta=siteinfo&siprop=namespaces
		$this->feedNamespace(0); // Mainspace
		$this->feedNamespace(4); // Project
		$this->feedNamespace(6); // File
		$this->feedNamespace(10); // Template
		$this->feedNamespace(106); // Form
		$this->feedNamespace(102); // Property
		$this->feedNamespace(108); // Concept
		$this->feedNamespace(828); // Module
	}

	private function feedNamespace(int $namespaceNumber) {
		foreach($this->pageTitlesInNamespace($namespaceNumber) as $title) {
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

  private function pageTitlesInNamespace(int $namespaceNumber) {
		// https://www.mediawiki.org/wiki/Manual:Database_access
    // https://doc.wikimedia.org/mediawiki-core/master/php/classWikimedia_1_1Rdbms_1_1Database.html
    // https://doc.wikimedia.org/mediawiki-core/master/php/classWikimedia_1_1Rdbms_1_1Database.html#a3b03dd27f434aabfc8d2d639d1e5fa9a
    $pageTitles = array();
    $dbr = wfGetDB( DB_REPLICA );
    $res = $dbr->select(
    	'page',                                   // $table The table to query FROM (or array of tables)
    	array( 'page_namespace', 'page_title' ),            // $vars (columns of the table to SELECT)
    	'page_namespace = '.$namespaceNumber,                              // $conds (The WHERE conditions)
    	__METHOD__,                                   // $fname The current __METHOD__ (for performance tracking)
    	array()        // $options = array()
    );
    foreach( $res as $row ) {
    	$pageTitles[] = \Title::newFromRow($row);
    }
    return $pageTitles;
  }

}

$maintClass = DMFFeedAll::class;

require_once RUN_MAINTENANCE_IF_MAIN;
