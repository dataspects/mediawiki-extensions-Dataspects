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
    // Here we define which fields of $mediaWikiPage become node properties (and not relationships)
    $coreProperties = '{
      name: $name
    }';
    $queries = [
        [
            "query" => '
                CALL apoc.merge.node(
                  [ "MediaWikiPage" ],
                  '.$coreProperties.',  // identProps
                  {},                   // props
                  '.$coreProperties.'   // onMatchProps
                )
                YIELD node
                RETURN node
            ',
            "params" => $mediaWikiPage // This provides all fields. We select in $coreProperties.
        ]
    ];
    $queries = array_merge($queries, $this->templateTransactions($mediaWikiPage));
    $this->update($queries);
    echo $GLOBALS['wgDataspectsSearchNeo4jURL'].":".$GLOBALS['wgDataspectsSearchNeo4jDatabase'].": ADDED: ".$mediaWikiPage["mw0__rawUrl"]."\n";
  }

  private function templateTransactions($mediaWikiPage) {
    $queries = [];
    foreach ($mediaWikiPage["mw0__templates"] as $template) {
      $templateCoreProperties = '{
        name: $objName
      }';
      $queries[] = [
        "query" => '
          MATCH (sub:MediaWikiPage{name: $subName})

          WITH sub
          CALL apoc.merge.node(
            [ "MediaWikiPage", "Template" ],
            '.$templateCoreProperties.',  // identProps
            {},                           // props
            '.$templateCoreProperties.'   // onMatchProps
          )
          YIELD node AS obj

          WITH sub, obj
          CALL apoc.merge.relationship(
            sub,
            "mw0__UsesTemplate",
            {},                   // identProps
            {},                   // props
            obj,
            {}                    // onMatchProps
          )
          YIELD rel

          RETURN rel
        ',
        "params" => [
          "subName" => $mediaWikiPage["name"],
          "objName" => $template["title"]
        ]
      ];
    }
    return $queries;
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

  private function normalizePredicateName() {

  }

}
