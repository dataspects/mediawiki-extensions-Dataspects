<?php

use \Symfony\Component\HttpClient\HttplugClient;
use \MeiliSearch\Client;
use MediaWiki\MediaWikiServices;

class DataspectsAPI extends ApiBase {

	private $mInstalledExtensions = [];

	public function __construct( $query, $moduleName ) {
		parent::__construct( $query, $moduleName );
	}

	private function loadBackends() { // FIXME: Craig
        $this->meiliSearchClient = new \MeiliSearch\Client(
            $GLOBALS['wgDataspectsSearchURL'],
            $GLOBALS['wgDataspectsSearchKey'],
            new HttplugClient()
        );
        $this->meiliSearchIndex = $this->meiliSearchClient->index(
            $GLOBALS['wgDataspectsIndex']
        );
		$this->dsNeo4j = new \MediaWiki\Extension\Dataspects\DSNeo4j(
            $GLOBALS["wgDataspectsNeo4jProtocol"],
			$GLOBALS["wgDataspectsNeo4jURL"],
			$GLOBALS["wgDataspectsNeo4jUsername"],
			$GLOBALS["wgDataspectsNeo4jPassword"],
            $GLOBALS["wgDataspectsNeo4jDatabase"],
		);
		$this->sqlite3 = new \MediaWiki\Extension\Dataspects\DataspectsSQLite3(
            $GLOBALS["wgSQLiteDatabase"]
        );
        wfDebug("### Loaded backends");
	}

	public function execute() {
		$params = $this->extractRequestParams();
		$queryType = $params['querytype'];
		$user = $this->getUser();
        $userRights = MediaWikiServices::getInstance()->getPermissionManager()->getUserPermissions( $user );
		if ( $queryType == null ) {
			throw new MWException( wfMessage( 'querytypenull' ) );
		}
		// FIXME: security concerns: injection, api call parameters?
        switch ($queryType) {
            case 'numberofdocsinindex':
                try {
                    $this->loadBackends();
                    $stats = $this->meiliSearchIndex->stats();
                    $this->getResult()->addValue(null, "data", [ 'numberofdocsinindex' => $stats["numberOfDocuments"] ] );
                } catch (Exception $e) {
                    wfDebug("### DataspectsAPI error: ".$e);
                    $this->getResult()->addValue(null, "data", [ 'result' => $e->getMessage() ] );
                }
                break;
            case 'numberofrecordsindatabase':
                try {
                    $this->loadBackends();
                    $result = $this->sqlite3->numberOfRecordsInDatabase();
                    $this->getResult()->addValue(null, "data", [ 'numberofrecordsindatabase' => $result ] );
                } catch (Exception $e) {
                    wfDebug("### DataspectsAPI error: ".$e);
                    $this->getResult()->addValue(null, "data", [ 'result' => $e->getMessage() ] );
                }
                break;
			case 'putsearchfacet':
				if(in_array("writeapi", $userRights)){
					try {
						$this->loadBackends();
						$result = $this->sqlite3->putSearchFacet($params['searchfacetname'], $params['currenthelper']);
						$this->dsNeo4j->addSearchFacet($params['searchfacetname'], $params['searchfaceteppo0__hasEntityBlurb']);
						$this->getResult()->addValue(null, "data", [ 'searchfacetname' => $params['searchfacetname'], 'result' => $result ] ); //FIXME: handle $result
					} catch (Exception $e) {
						wfDebug("### DataspectsAPI error: ".$e);
						$this->getResult()->addValue(null, "data", [ 'searchfacetname' => $params['searchfacetname'], 'result' => $e->getMessage() ] );
					}
				} else {
					$errorMessage = "$queryType not permitted for ".$user->getName();
					wfDebug("### "+$errorMessage);
					$this->getResult()->addValue(null, "data", [ 'status' => $errorMessage, 'searchfacetname' => $params['searchfacetname'] ] );
				}
				break;
			case 'typeaheadsearchfacets':
				try {
					wfDebug("### $queryType for ".$params['querystring']);
					$this->loadBackends();
					$matches = [];
					if(trim($params['querystring']) <> "") {
						$matches = $this->dsNeo4j->typeahead($params['querystring']);
					}
					$this->getResult()->addValue(null, "data", array( 'matches' => $matches, 'status' => 0 ) );
				} catch (Exception $e) {
					wfDebug("### DataspectsAPI error: ".$e);
					$this->getResult()->addValue(null, "data", [ 'result' => $e->getMessage() ] );
				}
				break;
            case 'concludedannotations':
                try {
                    wfDebug("### $queryType");
                    $this->loadBackends();
                    $concludedannotations = $this->dsNeo4j->concludedannotations($params['querystring']);
                    $this->getResult()->addValue(null, "data", array( 'concludedannotations' => $concludedannotations, 'status' => 0 ) );
                } catch (Exception $e) {
                    wfDebug("### DataspectsAPI error: ".$e);
                    $this->getResult()->addValue(null, "data", [ 'result' => $e->getMessage() ] );
                }
                break;
			case 'getsearchfacets':
				try {
					$this->loadBackends();
					$searchFacets = $this->sqlite3->getSearchFacets();
					$this->getResult()->addValue(null, "data", array( 'searchfacets' => $searchFacets ) );
				} catch (Exception $e) {
					wfDebug("### DataspectsAPI3 error: ".$e);
					$this->getResult()->addValue(null, "data", [ 'result' => $e->getMessage() ] );
				}
				break;
			case 'activatesearchfacet':
				wfDebug("### $queryType for ".$params['searchfacetname']);
				try {
					$this->loadBackends();
					$searchFacets = $this->sqlite3->getSearchFacet($params['searchfacetname']);
					$this->getResult()->addValue(null, "data", array( 'searchfacets' => $searchFacets ) );
				} catch (Exception $e) {
					wfDebug("### DataspectsAPI3 error: ".$e);
					$this->getResult()->addValue(null, "data", [ 'result' => $e->getMessage()." (DSE-2301-3010-0400)" ] );
				}
				break;
			case 'deletesearchfacet':
				wfDebug("### $queryType for ".$params['searchfacetname']);
                if(in_array("writeapi", $userRights)){
                    try {
						$this->loadBackends();
						$result = $this->sqlite3->deleteSearchFacet($params['searchfacetname']);
						wfDebug("### deleted from SQLite3: ".$params['searchfacetname']);
						$this->dsNeo4j->deleteSearchFacet($params['searchfacetname']);
						wfDebug("### deleted from Neo4j: ".$params['searchfacetname']);
						$this->getResult()->addValue(null, "data", [ 'searchfacetname' => $params['searchfacetname'], 'result' => "mememe" ] ); //FIXME: handle $result
					} catch (Exception $e) {
						wfDebug("### DataspectsAPI error: ".$e);
						$this->getResult()->addValue(null, "data", [ 'searchfacetname' => $params['searchfacetname'], 'result' => $e->getMessage() ] );
					}
				} else {
					$errorMessage = "$queryType not permitted for ".$user->getName();
					wfDebug("### "+$errorMessage);
					$this->getResult()->addValue(null, "data", [ 'status' => $errorMessage, 'searchfacetname' => $params['searchfacetname'] ] );
				}
				break;
			case 'numberofnodes':
				try {
					$this->loadBackends();
					$non = $this->dsNeo4j->numberOfNodes();
					$this->getResult()->addValue(null, "data", $non );
				} catch (Exception $e) {
					wfDebug("### DataspectsAPI error: ".$e);
					$this->getResult()->addValue(null, "data", [ 'result' => $e->getMessage() ] );
				}
				break;
			case 'templatecallssubgraph':
				try {
					$this->loadBackends();
					$templatecallssubgraph = $this->dsNeo4j->templateCallsSubgraph($params['name']);
				} catch (Exception $ex) {
					$templatecallssubgraph = "Error";
				}
				$this->getResult()->addValue(null, "data", array( 'templatecallssubgraph' => $templatecallssubgraph ) );
				break;
			case 'firstxcharacters':
				$this->loadBackends();
				$this->getResult()->addValue(null, "data", array( 'firstxcharacters' => $this->dsNeo4j->firstXCharacters($params['firstxcharacters'], $params['property']) ) );
				break;
			case 'releasetimestampxago':
				$this->loadBackends();
				$this->getResult()->addValue(null, "data", array( 'releasetimestampxago' => $this->dsNeo4j->releaseTimestampXago()) );
				break;
			case 'originalpagecontent':
				$this->loadBackends();
				$this->getResult()->addValue(null, "data", array( 'originalpagecontent' => $this->originalPageContent($params['ds0__sourceParseTextURL'] )) );
				break;
			case 'initializetopictype':
				if(in_array("writeapi", $userRights)){
					$this->loadBackends();
					$topictype_name = $params['topictype_name'];
					$this->initializeTopicType($topictype_name);
					$this->getResult()->addValue(null, "data", array( 'status' => 'initialized', 'topictype_name' => $topictype_name) );
				} else {
					$errorMessage = "initializetopictype not permitted for ".$user->getName();
					wfDebug("### "+$errorMessage);
					$this->getResult()->addValue(null, "data", array( 'status' => $errorMessage, 'topictype_name' => $topictype_name) );
				}
				break;
			case 'nodeslisttype0':
				try {
					$this->loadBackends();
                    $nodesList = $this->dsNeo4j->nodeslisttype0(json_decode($params['cypherparams'], true));
					$this->getResult()->addValue(null, "data", array(
                            'status' => 0,
                            'nodeslist' => $nodesList
                        )
                    );
				} catch (Exception $e) {
					wfDebug("### DataspectsAPI3 error: ".$e);
					$this->getResult()->addValue(null, "data", [ 'result' => $e->getMessage() ] );
				}
				break;
			default:
				$status = $queryType." is not a valid dataspects MWAPI querytype";
				wfDebug("### "+$status);
				$this->getResult()->addValue(null, "data", array( 'status' => $status) );
			break;
		}
		
	}

	# LEX230108161000
	private function initializeTopicType($topictype_name) {
		$editSummary = 'Created by dataspectsapi:initializetopictype';
		
		$title = Title::newFromText($topictype_name);
		if ( !is_null( $title ) && !$title->isKnown() && $title->canExist() ){
			$page = new WikiPage( $title );
			$content = ContentHandler::makeContent( '{{TopicType}}', $title );
			$page->doEditContent( $content, $editSummary );
		}

		$title = Title::newFromText("Template:".$topictype_name);
		if ( !is_null( $title ) && !$title->isKnown() && $title->canExist() ){
			$page = new WikiPage( $title );
			$content = ContentHandler::makeContent( '<includeonly>{{TopicMetaTemplate|eppo0:hasEntityTitle={{{eppo0:hasEntityTitle|}}}|eppo0:hasEntityBlurb={{{eppo0:hasEntityBlurb|}}}|eppo0:hasEntityType='.$topictype_name.'}}</includeonly>', $title );
			$page->doEditContent( $content, $editSummary );
		}

		$title = Title::newFromText("Form:".$topictype_name);
		if ( !is_null( $title ) && !$title->isKnown() && $title->canExist() ){
			$page = new WikiPage( $title );
			$content = ContentHandler::makeContent( '{{{info|add title=New '.$topictype_name.'|edit title=Edit '.$topictype_name.'|page name='.$topictype_name.' "<'.$topictype_name.'[eppo0:hasEntityTitle]>"}}}
			{{FormHeader|'.$topictype_name.'}}
			{{StandardFormSections}}
			{{FormFooter|'.$topictype_name.'}}', $title );
			$page->doEditContent( $content, $editSummary );
		}

		$title = Title::newFromText("Category:".$topictype_name);
		if ( !is_null( $title ) && !$title->isKnown() && $title->canExist() ){
			$page = new WikiPage( $title );
			$content = ContentHandler::makeContent( '{{TopicTypeCategory}}', $title );
			$page->doEditContent( $content, $editSummary );
		}
	}

    protected function getAllowedParams() {
        return [
            'querytype' => null,
			'name' => null,
			'ds0__sourceParseTextURL' => null,
			'topictype_name' => null,
			'firstxcharacters' => null,
			'property' => null,
			'searchfacetname' => null,
			'searchfaceteppo0__hasEntityBlurb' => null,
			'currenthelper' => null,
			"querystring" => null,
            "cypherparams" => null
        ];
    }

	private function originalPageContent($url) {
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => str_replace(' ', '%20', $url),
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_HEADER=> false,
			CURLOPT_SSL_VERIFYPEER => false // FIXME
		));
		$data = json_decode(curl_exec($curl), true);
		curl_close($curl);
		return $this->processHTML($data["parse"]["text"]["*"]);
	}

	private function processHTML($html) {
		$hp = new MediaWiki\Extension\Dataspects\HTMLProcessor($html);
		return $hp->processAndReturnHTML();
	}
	
}
