<?php


class DataspectsAPI extends ApiBase {

	private $mInstalledExtensions = [];

	public function __construct( $query, $moduleName ) {
		parent::__construct( $query, $moduleName );
        $this->dsNeo4j = new MediaWiki\Extension\DataspectsSearch\DSNeo4j();
	}

	public function execute() {
		$params = $this->extractRequestParams();
		$queryType = $params['querytype'];
		$user = $this->getUser();

        if ( $queryType == null ) {
			throw new MWException( wfMessage( 'querytypenull' ) );
		}

        switch ($queryType) {
			case 'numberofnodes':
				$this->getResult()->addValue(null, "data", array( 'numberofnodes' => $this->dsNeo4j->numberOfNodes() ) );
				break;
			case 'templatecallssubgraph':
				$this->getResult()->addValue(null, "data", array( 'templatecallssubgraph' => $this->dsNeo4j->templateCallsSubgraph($params['name']) ) );
				break;
			case 'originalpagecontent':
				$this->getResult()->addValue(null, "data", array( 'originalpagecontent' => $this->originalPageContent($params['mw0__apiParseTextURL'] )) );
				break;
			default:
			# code...
			break;
		}
		
	}

    protected function getAllowedParams() {
        return [
            'querytype' => null,
			'name' => null,
			'mw0__apiParseTextURL' => null
        ];
    }

	private function originalPageContent($url) {
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_HEADER, false);
		$data = json_decode(curl_exec($curl), true);
		curl_close($curl);
		return $data["parse"]["text"]["*"];
	}
	
}
