<?php

# https://www.mediawiki.org/wiki/Composer/For_extensions#Installing_extensions

namespace MediaWiki\Extension\Dataspects;
use \Symfony\Component\HttpClient\HttplugClient;
use \MeiliSearch\Client;

$basePath = getenv( 'MW_INSTALL_PATH' ) !== false ? getenv( 'MW_INSTALL_PATH' ) : __DIR__ . '/../../..';
require_once $basePath . '/maintenance/Maintenance.php';

class DMFFeedOne extends \Maintenance {

	public function execute() {
		// $title = \Title::newFromText('File:TWebC.png');
		// $title = \Title::newFromText('Software "Canasta"');
		$title = \Title::newFromText('Software_"Canasta_CLI"');
		$this->feedOne($title);
	}

	private function feedOne($title) {
		$params = [
			"namespace" => $title->getNamespace(),
			"title" => $title->getBaseText()
		];
		wfDebug("### __>__ Indexing Pipeline: REGISTER __>__: ".$params["namespace"].":".$params["title"]);
		switch($params["namespace"]) {
			case 0:
				$dsNeo4j = new DSNeo4j(
					$GLOBALS["wgDataspectsNeo4jURL"],
					$GLOBALS["wgDataspectsNeo4jUsername"],
					$GLOBALS["wgDataspectsNeo4jPassword"]
				);
                echo("### ".$params["namespace"].":".$params["title"]);
                try { # FIXME
                $meiliClient = new \MeiliSearch\Client($GLOBALS['wgDataspectsWriteURL'], $GLOBALS['wgDataspectsWriteKey'], new HttplugClient());
                $dmwf = new DataspectsFeed($title, \RequestContext::getMain()->getUser(), $dsNeo4j, $meiliClient, $params);
                $dmwf->sendToDatastore();
                    } catch (\MeiliSearch\Exceptions\ApiException $e) {
                        echo '### Caught exception: '.$e->getMessage()."\n";
                    }
			break;
      		case 6:
				// $job = new DataspectsTikaJob("dataspectsTikaJob", $params);
				// \JobQueueGroup::singleton()->push($job);
			break;
			default:
				
			break;
		}
	}

}

$maintClass = DMFFeedOne::class;

require_once RUN_MAINTENANCE_IF_MAIN;
