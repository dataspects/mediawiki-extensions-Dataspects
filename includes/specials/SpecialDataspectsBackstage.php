<?php

class SpecialDataspectsBackstage extends SpecialPage {
	function __construct() {
		parent::__construct( 'DataspectsBackstage' );
	}

	function execute( $par ) {
        $request = $this->getRequest();
		$output = $this->getOutput();
		$this->setHeaders();
		$output->addHTML( '
            <table class="dataspectsTable dataspectsBackstageTable">
                <tr>
                    <td><b>Initialize topic type</b></td>
                    <td>
                        '.$this->initializeTopicType().'
                    </td>
				</tr>
                <tr>
                    <td style="width:20%;">
                        <b>&larr; <a href="'.$GLOBALS['wgServer'].'/wiki/Special:Dataspects">Special:Dataspects</a></b>
                    </td>
                    <td>
                        <a href="https://htmlpreview.github.io/?https://github.com/dataspects/mediawiki-extensions-Dataspects/blob/master/doc.html">Doc</a> | <a href="'.$GLOBALS['wgServer'].'/wiki/Special:Log?type=dataspects">Log</a>
                    </td>
                </tr>
                <tr>
                    <td><b>Current configuration</b></td>
                    <td>
                        '.$this->currentConfiguration().'
                    </td>
				</tr>
			</table>' );
		$output->addJsConfigVars(array(
			'wgServer' => $GLOBALS['wgServer'],
			'wgDataspectsIndex' => $GLOBALS['wgDataspectsIndex'],
			'wgDataspectsSearchKey' => $GLOBALS['wgDataspectsSearchKey'],
			'wgDataspectsSearchURL' => $GLOBALS['wgDataspectsSearchURL'],
			'wgDataspectsNeo4jURL' =>  $GLOBALS['wgDataspectsNeo4jURL'],
			'wgDataspectsNeo4jUsername' =>  $GLOBALS['wgDataspectsNeo4jUsername'],
			'wgDataspectsNeo4jPassword' =>  $GLOBALS['wgDataspectsNeo4jPassword'],
			'wgDataspectsNeo4jDatabase' =>  $GLOBALS['wgDataspectsNeo4jDatabase'],
			'sources' => $this->sources(),
			'user' => $this->getUser()->getName()
		));
		$output->addModules( 'ext.dataspectsSearch' );
	}

    private function initializeTopicType() {
        return '<form id="initializetopictype_form">  
                    <p> 
                        <label for="topictype">Topic type name: </label> 
                        <input type="text" id="topictype_name"><br />
                        <span id="initializetopictype_result"></span><br/>
                        <input id="initializetopictype_send" type="submit" value="Initialize">
                    </p> 
                </form> ';
    }

    private function currentConfiguration() {
        return '<table>
                    <tbody>
                        <tr>
                            <td>wgDataspectsWriteURL
                            </td>
                            <td>'.$GLOBALS['wgDataspectsWriteURL'].'
                            </td>
                        </tr>
                        <tr>
                            <td>wgDataspectsSearchURL
                            </td>
                            <td>'.$GLOBALS['wgDataspectsSearchURL'].'
                            </td>
                        </tr>
                        <tr>
                            <td>wgDataspectsIndex
                            </td>
                            <td>'.$GLOBALS['wgDataspectsIndex'].'
                            </td>
                        </tr>
                        <tr>
                            <td>wgDataspectsTikaURL
                            </td>
                            <td>'.$GLOBALS['wgDataspectsTikaURL'].'
                            </td>
                        </tr>
                        <tr>
                            <td>wgDataspectsSpacyURL
                            </td>
                            <td>'.$GLOBALS['wgDataspectsSpacyURL'].'
                            </td>
                        </tr>
                        <tr>
                            <td>wgDataspectsNeo4jURL
                            </td>
                            <td>'.$GLOBALS['wgDataspectsNeo4jURL'].' (<code id="numberOfNeo4jNodes"></code> nodes)
                            </td>
                        </tr>
                        <tr>
                            <td>wgDataspectsMediaWikiIDPrefix
                            </td>
                            <td><b>'.$GLOBALS['wgDataspectsMediaWikiIDPrefix'].'</b>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><a href="https://github.com/dataspects/DataspectsSearch">https://github.com/dataspects/DataspectsSearch</a>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2"><a href="https://wiki.dataspects.com/wiki/Dataspects:Development">Development</a> (search code base for <code>dsImplementation:</code>)
                            </td>
                        </tr>
                        <tr>
                            <td>Config<br/><code>#IndexConfigSetting</code></td>
                            <td><a href="https://github.com/dataspects/DataspectsSearch/tree/master/src">Indexing</a><br/><a href="https://github.com/dataspects/DataspectsSearch/tree/master/resources/ext.dataspectsSearch">UI</a><br/><a href="https://github.com/dataspects/DataspectsSearchCLI/blob/main/MediaWiki/update-mediawiki-indexes-settings.sh">Mappings</a></td>
                        </tr>
                        <tr>
                            <td>wgDataspectsSourcesForAuthenticated</td>
                            <td>- '.implode("<br/>- ", $GLOBALS['wgDataspectsSourcesForAuthenticated']).'</td>
                        </tr>
                        <tr>
                            <td>wgDataspectsSourcesForAnonymous</td>
                            <td>- '.implode("<br/>- ", $GLOBALS['wgDataspectsSourcesForAnonymous']).'</td>
                        </tr>
                    </tbody>
                </table>';
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
}