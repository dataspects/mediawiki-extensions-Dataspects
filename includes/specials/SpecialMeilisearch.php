<?php

class SpecialMeilisearch extends SpecialPage {
	function __construct() {
		parent::__construct( 'Meilisearch' );
	}

	function execute( $par ) {

		echo $par["a"];


		$request = $this->getRequest();
		$output = $this->getOutput();
		$this->setHeaders();

		# Get request data from, e.g.
		$param = $request->getText( 'param' );

		# Do stuff
		# ...
		
		$output->addWikiTextAsInterface( '<div id="searchbox"></div><div id="hits"></div>' );
		$output->addModules( 'ext.meilisearchForMediaWiki' );
	}
}