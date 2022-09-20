<?php

class SpecialDataspectsSearch extends SpecialPage {
	function __construct() {
		parent::__construct( 'DataspectsSearch' );
	}

	function execute( $par ) {
		$request = $this->getRequest();
		$output = $this->getOutput();
		$this->setHeaders();
		$output->addHTML( '<table class="dataspectsSearchInterface">
			<tr>
				<td>
					<div id="searchbox"></div>
					<pre id="currentHelper"></pre>
					<a href="'.$GLOBALS['wgServer'].'/wiki/Special:DataspectsSearch">Reset this facet</a> | <span id="saveFacetLink"></span>
				</td>
				<td>
					<table class="backstage_table">
						<tbody><tr>
						<td>wgDataspectsSearchWriteURL
						</td>
						<td>'.$GLOBALS['wgDataspectsSearchWriteURL'].'
						</td></tr>
						<tr>
						<td>wgDataspectsSearchSearchURL
						</td>
						<td>'.$GLOBALS['wgDataspectsSearchSearchURL'].'
						</td></tr>
						<tr>
						<td>wgDataspectsSearchIndex
						</td>
						<td>'.$GLOBALS['wgDataspectsSearchIndex'].'
						</td></tr>
						<tr>
						<td>wgDataspectsSearchTikaURL
						</td>
						<td>'.$GLOBALS['wgDataspectsSearchTikaURL'].'
						</td>
						<tr>
						<tr>
						<td>wgDataspectsSearchMediaWikiIDPrefix
						</td>
						<td><b>'.$GLOBALS['wgDataspectsSearchMediaWikiIDPrefix'].'</b>
						</td>
						<tr>
						<td colspan="2"><a href="https://github.com/dataspects/DataspectsSearch">https://github.com/dataspects/DataspectsSearch</a>
						</td>
						</tr>
						<tr>
						<td colspan="2"><a href="'.$GLOBALS['wgServer'].'/wiki/Special:Log?type=dataspects">dataspects log</a>
						</td>
						</tr>
						<tr>
						<td>Config<br/><code>#IndexConfigSetting</code></td>
						<td><a href="https://github.com/dataspects/DataspectsSearch/tree/master/src">Indexing</a><br/><a href="https://github.com/dataspects/DataspectsSearch/tree/master/resources/ext.dataspectsSearch">UI</a><br/><a href="https://github.com/dataspects/DataspectsSearchCLI/blob/main/MediaWiki/update-mediawiki-indexes-settings.sh">Mappings</a></td>
						</tr>
						<tr>
						<td>wgDataspectsSearchSourcesForAuthenticated</td>
						<td>- '.implode("<br/>- ", $GLOBALS['wgDataspectsSearchSourcesForAuthenticated']).'</td>
						</tr>
						<tr>
						<td>wgDataspectsSearchSourcesForAnonymous</td>
						<td>- '.implode("<br/>- ", $GLOBALS['wgDataspectsSearchSourcesForAnonymous']).'</td>
						</tr>
						</tbody>
					</table>
					<div>Saved search facets:</div>
					'.$this->searchFacets().'
				</td>
			</tr>
			<tr>
				<td><div style="float:right;"><input type="checkbox" id="compactList" value="1">Compact list</div><div id="hits"></div><div id="pagination"></div></td>
				<td>
					<span id="originalPageContent">Show original page contents</span>
					<hr/>
					<table id="hierarchicalMenus">
					<tbody>
						<tr><td id="sources-hierarchical-menu"></td><td><i>Available sources depend on authentication.'.$this->logInMessage().'</i></td></tr>
						<tr><td id="topic-types-hierarchical-menu"></td></tr>
						<tr><td id="sea-kay-menu"></td></tr>
						<tr><td id="actions-menu"></td></tr>
					</tbody>
					</table>
					<div id="selected-aspects-menu"></div>
					<hr/>
					<div id="all-predicates-menu"></div>
				</td>
			</tr>
		</table>' );
		$output->addJsConfigVars(array(
			'wgServer' => $GLOBALS['wgServer'],
			'wgDataspectsSearchIndex' => $GLOBALS['wgDataspectsSearchIndex'],
			'wgDataspectsSearchSearchKey' => $GLOBALS['wgDataspectsSearchSearchKey'],
			'wgDataspectsSearchSearchURL' => $GLOBALS['wgDataspectsSearchSearchURL'],
			'sources' => $this->sources()
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
			$pageLink = "<a href='".$searchFacet["name"]."'>".$searchFacet["Eppo0:hasEntityTitle"]."</a></li>";
			$activateLink = "<a href='".$GLOBALS['wgServer']."/wiki/Special:DataspectsSearch?helper=".$searchFacet["Ds0:instantsearchHelper"]."'>Activate</a>";
			$html[] = "<li>".$pageLink." (".$activateLink.")</li>";
		}
		$html[] = "</ul>";
		return implode("", $html);
	}

	private function sources() {
		if(count($this->getUser()->getGroups()) > 0) {
			if($this->getUser()->getName() == "Lex") {
				return $GLOBALS['wgDataspectsSearchSourcesForLex'];	
			}
			return $GLOBALS['wgDataspectsSearchSourcesForAuthenticated'];
		}
		return $GLOBALS['wgDataspectsSearchSourcesForAnonymous'];
	}

	private function logInMessage() {
		if(count($this->getUser()->getGroups()) == 0) {
			return ' You might want to <a href="'.$GLOBALS['wgServer'].'/wiki/Special:UserLogin">log in</a>.';
		}
		return "";
	}
}