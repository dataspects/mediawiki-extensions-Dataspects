<?php


namespace MediaWiki\Extension\DataspectsSearch;

use Laudis\Neo4j\Authentication\Authenticate;
use Laudis\Neo4j\ClientBuilder;
use Laudis\Neo4j\Contracts\TransactionInterface;

class DSNeo4j {

  public function __construct() {
    try {
      $this->neo4jClient = ClientBuilder::create()->withDriver(
        'neo4j',
        $GLOBALS['wgDataspectsSearchNeo4jURL'],
        Authenticate::basic($GLOBALS['wgDataspectsSearchNeo4jUsername'], $GLOBALS['wgDataspectsSearchNeo4jPassword'])
      )->build();
    } catch (Exception $e) {
      echo 'Caught exception: ',  $e->getMessage(), "\n";
    } 
  }

  /**
   * What are we interested in?
   * 
   *    - namespace "Main"
   *        - outgoing links
   *        - incoming links
   *        - templates used
   */

  public function addPageToNeo4j($mediaWikiPage) {
    print_r($mediaWikiPage);
    $queries = [
        [
            "query" => '
                CALL apoc.merge.node(
                [ "MediaWikiPage" ],
                { name: $name }
                )
                YIELD node
                RETURN node
            ',
            "params" => [
                "name" => $mediaWikiPage["name"]
            ]
        ]
    ];
    $this->update($queries);
    echo $GLOBALS['wgDataspectsSearchNeo4jURL'].":".$GLOBALS['wgDataspectsSearchNeo4jDatabase'].": ADDED: ".$mediaWikiPage["mw0__rawUrl"]."\n";
  }

  private function update($queries) {
    foreach($queries as $query) {
        $result = $this->neo4jClient->writeTransaction(static function (TransactionInterface $tsx) use ($query) {
            try {
                $summarisedResult = $tsx->run($query["query"], $query["params"]);
            } catch (Exception $ex) {
                echo $ex;
            }
        }); 
    }
  }

}
