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
					<a href="'.$GLOBALS['wgServer'].'/wiki/Special:DataspectsSearch">Reset</a>
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
						<td>Code tags
						</td>
						<td>#IndexConfigSetting
						</td>
						</tr>
						<tr>
						<td colspan="2"><a href="https://github.com/dataspects/DataspectsSearch">https://github.com/dataspects/DataspectsSearch</a>
						</td>
						</tr>
						<tr>
						<td colspan="2"><a href="'.$GLOBALS['wgServer'].'/wiki/Special:Log?type=dataspects">dataspects log</a>
						</td>
						</tr>
						<tr>
						<td colspan="2"><a href="https://github.com/dataspects/DataspectsSearch/tree/master/src">Config</a></td>
						</tr>
						</tbody>
					</table>
				</td>
			</tr>
			<tr>
				<td><div id="hits"></div></td>
				<td>
					<div id="sources-hierarchical-menu"></div>
					<div id="topic-types-hierarchical-menu"></div>
					<div id="sea-kay-menu"></div>
					<div id="actions-menu"></div>
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