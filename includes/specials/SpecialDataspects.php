<?php

# https://doc.wikimedia.org/oojs-ui/master/php/annotated.html
# https://www.mediawiki.org/wiki/OOUI/Using_OOUI_in_MediaWiki

class SpecialDataspects extends SpecialPage {
	function __construct() {
		parent::__construct( 'Dataspects' );
	}

	function execute( $par ) {
		$request = $this->getRequest();
		$output = $this->getOutput();
		// $output->enableOOUI();
		// $btn = new OOUI\ButtonWidget( [
		// 	'label' => 'Click me!',
		// 	'href' => 'https://example.com',
		// ] );
		// $output->addHTML( "$btn" );
		$this->setHeaders();
		$output->addHTML( '<table class="dataspectsTable">
			<tr>
				<td style="width:60%;">
					<div style="float:right;"><input type="checkbox" id="originalPageContent">Show original page contents <input type="checkbox" id="compactList" value="1">Compact list</div>
					<div id="searchbox"></div>
					<div id="searchFacetControls"></div>
					<div id="intro"></div>
					<div id="hits"></div>
				</td>
				<td style="padding-left:100px;">
					<a href="'.$GLOBALS['wgServer'].'/wiki/Special:Dataspects" data-cy="ds-clear-current-facet">Clear current facet</a> | <a data-cy="saveCurrentFacetButton">Save current facet</a><br/><a href="https://htmlpreview.github.io/?https://github.com/dataspects/mediawiki-extensions-Dataspects/blob/master/doc.html">Doc</a> | <b><a href="'.$GLOBALS['wgServer'].'/wiki/Special:DataspectsBackstage">&rarr; Backstage</a></b>
					<div data-cy="dropzone0"></div>
					<ul class="accordion">
						<li><!-- LEX230108163200 -->
							<a data-cy="showSavedSearchFacetsButton" class="toggle" href=#>Saved search facets</a>
							<div class="inner" data-cy="savedSearchFacetsList"></div>
						</li>
						<li>
							<table id="hierarchicalMenus">
							<tbody>
								<tr><td><b>Sources</b><div id="sources-refinement-list"></div></td></tr>
								<tr><td colspan="2"><hr/></td></tr>
								<tr><td id="topic-types-hierarchical-menu"></td></tr>
								<tr><td id="coke-menu"></td></tr>
								<tr><td id="actions-menu"></td></tr>
								<tr><td><b>MediaWiki Namespaces</b><div id="ds0__sourceNamespace-menu"></div></td></tr>
							</tbody>
							</table>
							<div id="selected-aspects-menu"></div>
							<hr/>
							<div id="all-predicates-menu"></div>
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
			'wgDataspectsAttributesToSnippet' => $GLOBALS['wgDataspectsAttributesToSnippet'],
			'sources' => $this->sources(),
			'user' => $this->getUser()->getName()
		));
		$output->addModules( 'ext.dataspectsSearch' );
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