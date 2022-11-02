<?php

class SpecialDataspects extends SpecialPage {
	function __construct() {
		parent::__construct( 'Dataspects' );
	}

	function execute( $par ) {
		$request = $this->getRequest();
		$output = $this->getOutput();
		$this->setHeaders();
		$output->addHTML( '<table class="dataspectsSearchInterface">
			<tr>
				<td style="width:66%;">
					<div style="float:right;"><input type="checkbox" id="originalPageContent">Show original page contents <input type="checkbox" id="compactList" value="1">Compact list</div>
					<div id="searchbox"></div>
					<div id="intro"></div>
					<div id="hits"></div>
				</td>
				<td style="width:33%; padding-left:30px;">
					<a href="'.$GLOBALS['wgServer'].'/wiki/Special:Dataspects" data-cy="ds-clear-current-facet">Clear current facet</a> | <span id="saveFacetLink"></span> | <a href="https://htmlpreview.github.io/?https://github.com/dataspects/Dataspects/blob/master/doc.html">Doc</a> | <a href="'.$GLOBALS['wgServer'].'/wiki/Special:Log?type=dataspects">Log</a>
					<ul class="accordion">
						<li>
							<a class="toggle" href=#>Saved search facets</a>
							<div class="inner">'.$this->searchFacets().'</div>
						</li>
						<li>
							<a id="facetingMenus" class="toggle" href=#>FACETING (depends on authentication)</a>
							<div class="inner">
							<table id="hierarchicalMenus">
							<tbody>
								<tr><td><b>Sources</b><div id="sources-refinement-list"></div></td></tr>
								<tr><td colspan="2"><hr/></td></tr>
								<tr><td id="topic-types-hierarchical-menu"></td></tr>
								<tr><td id="sea-kay-menu"></td></tr>
								<tr><td id="actions-menu"></td></tr>
								<tr><td><b>MediaWiki Namespaces</b><div id="mw0__namespace-menu"></div></td></tr>
							</tbody>
							</table>
							<div id="selected-aspects-menu"></div>
							<hr/>
							<div id="all-predicates-menu"></div>
							</div>
						</li>
					</ul>
				</td>
			</tr>
		</table>' );
		$output->addJsConfigVars(array(
			'wgServer' => $GLOBALS['wgServer'],
			'wgDataspectsIndex' => $GLOBALS['wgDataspectsIndex'],
			'wgDataspectsSearchKey' => $GLOBALS['wgDataspectsSearchKey'],
			'wgDataspectsSearchURL' => $GLOBALS['wgDataspectsSearchURL'],
			'wgDataspectsNeo4jURL' =>  $GLOBALS['wgDataspectsNeo4jURL'],
			'wgDataspectsNeo4jUsername' =>  $GLOBALS['wgDataspectsNeo4jUsername'],
			'wgDataspectsNeo4jPassword' =>  $GLOBALS['wgDataspectsNeo4jPassword'],
			'wgDataspectsNeo4jDatabase' =>  $GLOBALS['wgDataspectsNeo4jDatabase'],
			'sources' => $this->sources(),
			'user' => $this->getUser()->getName()
		));
		$output->addModules( 'ext.dataspectsSearch' );
	}

	private function searchFacets() {
		$params = new \FauxRequest(
			array(
				'action' => 'askargs',
				'conditions' => "eppo0:hasEntityType::SearchFacet",
				"printouts" => "Eppo0:hasEntityTitle|Eppo0:hasEntityBlurb|Ds0:instantsearchHelper"
			)
		);
		$api = new \ApiMain( $params );
		$api->execute();
		$data = $api->getResult()->getResultData();
		$searchFacets = array();
		foreach($data["query"]["results"] as $searchFacet => $sfdata) {
			$searchFacets[] = array(
				"name" => $searchFacet,
				"Eppo0:hasEntityTitle" => $sfdata["printouts"]["Eppo0:hasEntityTitle"][0],
				"Eppo0:hasEntityBlurb" => $sfdata["printouts"]["Eppo0:hasEntityBlurb"][0],
				"Ds0:instantsearchHelper" => implode("", $sfdata["printouts"]["Ds0:instantsearchHelper"])
			);
		};
		$html = array("<ul>");
		foreach($searchFacets as $searchFacet) {
			$pageLink = "<a href='".$searchFacet["name"]."'>".$searchFacet["Eppo0:hasEntityTitle"]."</a>";
			$activateLink = "<a href='".$GLOBALS['wgServer']."/wiki/Special:Dataspects?helper=".$searchFacet["Ds0:instantsearchHelper"]."'>Activate</a>";
			$html[] = "<li>".$pageLink." (".$activateLink.")</li>";
		}
		$html[] = "</ul>";
		return implode("", $html);
	}

	private function sources() {
		if(count($this->getUser()->getGroups()) > 0) {
			if($this->getUser()->getName() == "Lex") {
				return $GLOBALS['wgDataspectsSourcesForLex'];	
			}
			return $GLOBALS['wgDataspectsSourcesForAuthenticated'];
		}
		return $GLOBALS['wgDataspectsSourcesForAnonymous'];
	}

	private function logInMessage() {
		if(count($this->getUser()->getGroups()) == 0) {
			return ' You might want to <a href="'.$GLOBALS['wgServer'].'/wiki/Special:UserLogin">log in</a>.';
		}
		return "";
	}
}