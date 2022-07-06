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
				<td colspan=2>
					<div id="searchbox"></div>
					<a href="https://localhost/wiki/Special:DataspectsSearch">Reset</a>
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
		$output->addJsConfigVars(array('wgDataspectsSearchSearchKey' => $GLOBALS['wgDataspectsSearchSearchKey']));
		$output->addModules( 'ext.dataspectsSearch' );
	}
}