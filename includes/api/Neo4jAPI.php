<?php


class Neo4jAPI extends ApiBase {

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
			default:
				# code...
				break;
		}
		
	}

    protected function getAllowedParams() {
        return [
            'querytype' => null,
			'name' => null
        ];
    }

	
}
