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
		$output->addWikiTextAsInterface( '<div id="searchbox"></div><div id="refinementList"></div><div id="hits"></div>' );
		$output->addModules( 'ext.meilisearchForMediaWiki' );
	}
}