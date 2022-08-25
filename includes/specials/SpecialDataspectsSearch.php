<?php

class SpecialDataspectsSearch extends SpecialPage {
	function __construct() {
		parent::__construct( 'DataspectsSearch' );
	}

	function execute( $par ) {
		$request = $this->getRequest();
		$output = $this->getOutput();
		$this->setHeaders();

		$output->addWikiTextAsContent( '{|class="backstage_table"
			|wgDataspectsSearchSearchURL
			|'.$GLOBALS['wgDataspectsSearchSearchURL'].'
			|-
			|wgDataspectsSearchIndex
			|'.$GLOBALS['wgDataspectsSearchIndex'].'
			|}' );

		$output->addHTML( '<table class="dataspectsSearchInterface">
			<tr>
				<td colspan=2>
					<div id="searchbox"></div>
					<a href="'.$GLOBALS['wgServer'].'/wiki/Special:DataspectsSearch">Reset</a>
				</td>
			</tr>
			<tr>
				<td><div id="hits"></div></td>
				<td>
					<div id="sources-hierarchical-menu"></div>
					<div id="topic-types-hierarchical-menu"></div>
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

	private function sources() {
		if(count($this->getUser()->getGroups()) > 0) {
			return $GLOBALS['wgDataspectsSearchSourcesForAuthenticated'];
		}
		return $GLOBALS['wgDataspectsSearchSourcesForAnonymous'];
	}
}