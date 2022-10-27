<?php


namespace MediaWiki\Extension\DataspectsSearch;

use Laudis\Neo4j\Authentication\Authenticate;
use Laudis\Neo4j\ClientBuilder;
use Laudis\Neo4j\Contracts\TransactionInterface;

class DSNeo4j {

  public function __construct() {
    try {
      $this->neo4jClient = \Laudis\Neo4j\ClientBuilder::create()->withDriver(
        'neo4j',
        $GLOBALS['wgDataspectsSearchNeo4jURL'],
        Authenticate::basic($GLOBALS['wgDataspectsSearchNeo4jUsername'], $GLOBALS['wgDataspectsSearchNeo4jPassword'])
      )->build();
    } catch (Exception $e) {
      echo 'Caught exception: ',  $e->getMessage(), "\n";
    } 
  }

  public function addPageToNeo4j($mediaWikiPage) {
    // print_r($mediaWikiPage);
    // Here we define which fields of $mediaWikiPage become node properties (and not relationships)
    $coreProperties = '{
      name: $mw0__rawUrl
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

  public function numberOfNodes() {
    $results = $this->query([
      "query" => '
        MATCH (n)
        RETURN count(n) AS count
      ',
      "params" => []
    ]);
    return $results->first()->get("count");
  }

  public function templateCallsSubgraph($name) {
    // https://github.com/neo4j-php/neo4j-php-client/blob/main/src/Types/Node.php
    // https://github.com/neo4j-php/neo4j-php-client/blob/main/src/Types/Relationship.php
    $graphData = [
      "nodes" => [],
      "edges" => []
    ];

    $results = $this->query([
      "query" => '
        MATCH (sub:MediaWikiPage:Template)
        WHERE sub.name = $name
        CALL apoc.path.subgraphAll(sub, {
          relationshipFilter: "mw0__UsesTemplate>",
          minLevel: 0,                                // min/max number of hops = "nodes in between"
          maxLevel: 5
        })
        YIELD 	nodes, relationships
        RETURN 	nodes, relationships
      ',
      "params" => [
        "name" => $name
      ]
    ]);
    foreach ($results->first()->get("nodes") as $node) {
      $graphData["nodes"][] = [
        "id"      => $node->getId(),
        "label"   => $node->getProperty("name"),
        "content" => [],
        "title"   => ""
      ];
    }
    foreach ($results->first()->get("relationships") as $relationship) {
      $graphData["edges"][] = [
        "from"    => $relationship->getStartNodeId(),
        "to"      => $relationship->getEndNodeId(),
        "label"   => [$relationship->getType()],
        "title"   => ""
      ];
    }
    return $graphData;
  }

  private function templateTransactions($mediaWikiPage) {
    $templates = $mediaWikiPage["mw0__templates_by_regex"];
    foreach ($mediaWikiPage["mw0__templates"] as $template) {
      $templates[] = $template["title"];
    }
    $queries = [];
    foreach ($templates as $fullTemplateName) {
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
          "subName" => $mediaWikiPage["mw0__rawUrl"],
          "objName" => $this->mw0__rawUrl($fullTemplateName)
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

  private function query($query) {
    $results = $this->neo4jClient->readTransaction(static function (TransactionInterface $tsx) use ($query) {
      try {
          $results = $tsx->run($query["query"], $query["params"]);
          return $results;
      } catch (Exception $ex) {
          echo $ex;
      }
    });
    return $results;
  }

  private function normalizePredicateName() {

  }

  private function mw0__rawUrl($someName) {
    return $GLOBALS['wgServer'].str_replace("$1", "", $GLOBALS['wgArticlePath']).$someName;
  }

}
