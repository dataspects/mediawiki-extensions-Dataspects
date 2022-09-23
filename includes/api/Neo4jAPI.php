<?php

class Neo4jAPI extends ApiBase {

	private $mInstalledExtensions = [];

	public function __construct( $query, $moduleName ) {
		parent::__construct( $query, $moduleName );
	}

	public function execute() {
		$params = $this->extractRequestParams();
		$queryType = $params['querytype'];
		$user = $this->getUser();

        if ( $queryType == null ) {
			throw new MWException( wfMessage( 'querytypenull' ) );
		}

        
		$this->getResult()->addValue(null, "text", array( 'queryType' => $queryType ) );

		
	}

    protected function getAllowedParams() {
        return [
            'querytype' => null
        ];
    }

	
}
