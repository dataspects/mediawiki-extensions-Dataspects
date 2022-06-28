<?php

use MeiliSearch\Client;


class SpecialMeilisearch extends SpecialPage {
	function __construct() {
		parent::__construct( 'Meilisearch' );
	}

	function execute( $par ) {

		echo $par["a"];

		$client = new Client('http://192.168.1.36:7700', 'masterKey');

# An index is where the documents are stored.
$index = $client->index('movies');

$hits = $index->search('wondre woman')->getHits();










		$request = $this->getRequest();
		$output = $this->getOutput();
		$this->setHeaders();

		# Get request data from, e.g.
		$param = $request->getText( 'param' );

		# Do stuff
		# ...
		$wikitext = 'Hello world!';
		$output->addWikiTextAsInterface( $hits[2]["genres"][0] );
	}
}