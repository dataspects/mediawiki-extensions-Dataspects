<?php

class SpecialDataspectsSearch extends SpecialPage {
	function __construct() {
		parent::__construct( 'DataspectsSearch' );
	}

	function execute( $par ) {
		$request = $this->getRequest();
		$this->output = $this->getOutput();
		$this->setHeaders();
		$this->output->addHTML( '<table class="dataspectsSearchInterface">
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
		$this->output->addJsConfigVars(array(
			'wgServer' => $GLOBALS['wgServer'],
			'wgDataspectsSearchSearchKey' => $GLOBALS['wgDataspectsSearchSearchKey'],
			'wgDataspectsSearchSearchURL' => $GLOBALS['wgDataspectsSearchSearchURL']
		));
		$this->wgDataspectsSearchIndex();
		$this->output->addModules( 'ext.dataspectsSearch' );
	}

	private function wgDataspectsSearchIndex() {
		if(count($this->getUser()->getGroups() == 0)) {
			$this->output->addJsConfigVars(array(
				'wgDataspectsSearchIndex' => $GLOBALS['wgDataspectsSearchIndexes']["public"]
			));
		} else {
			$this->output->addJsConfigVars(array(
				'wgDataspectsSearchIndex' => $GLOBALS['wgDataspectsSearchIndexes']["public"]
			));
		}
	}
}