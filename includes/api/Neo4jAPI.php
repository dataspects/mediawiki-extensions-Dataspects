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

        
		$this->getResult()->addValue(null, "data", array( 'numberofnodes' => $this->dsNeo4j->numberOfNodes() ) );

		
	}

    protected function getAllowedParams() {
        return [
            'querytype' => null
        ];
    }

	
}
