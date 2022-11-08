<?php

class DataspectsAPI extends ApiBase {

	private $mInstalledExtensions = [];

	public function __construct( $query, $moduleName ) {
		parent::__construct( $query, $moduleName );
		$this->dsNeo4j = new \MediaWiki\Extension\Dataspects\DSNeo4j();
	}

	public function execute() {
		$params = $this->extractRequestParams();
		$queryType = $params['querytype'];
		$user = $this->getUser();
		if ( $queryType == null ) {
			throw new MWException( wfMessage( 'querytypenull' ) );
		}
		// FIXME: security concerns: injection, api call parameters?
        switch ($queryType) {
			case 'numberofnodes':
				$this->getResult()->addValue(null, "data", array( 'numberofnodes' => $this->dsNeo4j->numberOfNodes() ) );
				break;
			case 'templatecallssubgraph':
				$this->getResult()->addValue(null, "data", array( 'templatecallssubgraph' => $this->dsNeo4j->templateCallsSubgraph($params['name']) ) );
				break;
			case 'firstxcharacters':
				$this->getResult()->addValue(null, "data", array( 'firstxcharacters' => $this->dsNeo4j->firstXCharacters($params['firstxcharacters']) ) );
				break;
			case 'releasetimestampxago':
				$this->getResult()->addValue(null, "data", array( 'releasetimestampxago' => $this->dsNeo4j->releaseTimestampXago()) );
				break;
			case 'originalpagecontent':
				$this->getResult()->addValue(null, "data", array( 'originalpagecontent' => $this->originalPageContent($params['mw0__apiParseTextURL'] )) );
				break;
			case 'initializetopictype':
				$topictype_name = $params['topictype_name'];
				$this->initializeTopicType($topictype_name);
				$this->getResult()->addValue(null, "data", array( 'status' => 'initialized', 'topictype_name' => $topictype_name) );
				break;
			default:
			# code...
			break;
		}
		
	}

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
			'mw0__apiParseTextURL' => null,
			'topictype_name' => null,
			'firstxcharacters' => null
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
