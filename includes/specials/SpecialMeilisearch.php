<?php

class SpecialMeilisearch extends SpecialPage {
	function __construct() {
		parent::__construct( 'Meilisearch' );
	}

	function execute( $par ) {
		$request = $this->getRequest();
		$output = $this->getOutput();
		$this->setHeaders();
		$param = $request->getText( 'param' );
		$output->addWikiTextAsInterface( '{|class="layout_table_0"
			|colspan=2|<div id="searchbox"></div>
			|-
			|<div id="hits"></div>
			|<div id="hierarchical-menu"></div>
		|}' );
		$output->addModules( 'ext.meilisearchForMediaWiki' );
	}
}