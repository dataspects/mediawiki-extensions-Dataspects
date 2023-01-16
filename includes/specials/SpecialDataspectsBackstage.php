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
            <b>&larr; <a href="'.$GLOBALS['wgServer'].'/wiki/Special:Dataspects">Special:Dataspects</a></b> | <a href="https://github.com/dataspects/mediawiki-extensions-Dataspects#Features" style="background-color:yellow;">Features</a> | <a href="https://htmlpreview.github.io/?https://github.com/dataspects/mediawiki-extensions-Dataspects/blob/master/doc.html">Doc</a> | <a href="'.$GLOBALS['wgServer'].'/wiki/Special:Log?type=dataspects">Log</a> | <code>~$ ./mwstakeorg__status.sh</code>
            <table class="dataspectsTable dataspectsBackstageTable">
                <tr>
                    <td style="width:20%;"><b>Initialize topic type</b></td>
                    <td>
                        <b>Check <a href="'.$GLOBALS['wgServer'].'/wiki/EPPO">existing topic types</a> before intitializing a new one!</b>
                        '.$this->initializeTopicType().'
                    </td>
				</tr>
                <tr>
                    <td><b>Current configuration</b></td>
                    <td>
                        '.$this->currentConfiguration().'
                    </td>
				</tr>
                <tr><!-- LEX230108165201 -->
                    <td><b>Values</b> (statistics on data sources)</td>
                    <td >
                        <canvas id="firstXCharacters"></canvas>
                        <a href="https://github.com/dataspects/mediawiki-extensions-Dataspects/search?q=LEX2211071526" style="text-align:right;display:block;">See underlying query at <code>LEX2211071526</code></a>
                    </td>
				</tr>
                <tr><!-- LEX230108165200 -->
                    <td><b>Data feeding</b> (statistics on indexing activity)</td>
                    <td >
                        <canvas id="releaseTimestampXago"></canvas>
                        <a href="https://github.com/dataspects/mediawiki-extensions-Dataspects/search?q=LEX2211071526" style="text-align:right;display:block;">See underlying query at <code>LEX2211071527</code></a>
                    </td>
				</tr>
			</table>' );
		$output->addJsConfigVars(array(
			'wgServer' => $GLOBALS['wgServer'],
			'wgDataspectsIndex' => $GLOBALS['wgDataspectsIndex'],
			'wgDataspectsSearchKey' => $GLOBALS['wgDataspectsSearchKey'],
			'wgDataspectsSearchURL' => $GLOBALS['wgDataspectsSearchURL'],
			'sources' => $this->sources(),
			'user' => $this->getUser()->getName()
		));
		$output->addModules( 'ext.dataspectsSearch' );
	}

    private function initializeTopicType() {
        # LEX230108161000
        return '<form id="initializetopictype_form">  
                    <p> 
                        <label for="topictype">Topic type name: </label> 
                        <input type="text" id="topictype_name"><br />
                        <span id="initializetopictype_result"></span><br/>
                        <input id="initializetopictype_send" type="submit" value="Initialize">
                    </p> 
                </form> ';
    }

    # LEX230108165600
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