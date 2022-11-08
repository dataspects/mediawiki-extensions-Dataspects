<?php


namespace MediaWiki\Extension\Dataspects;

use Laudis\Neo4j\Authentication\Authenticate;
use Laudis\Neo4j\ClientBuilder;
use Laudis\Neo4j\Contracts\TransactionInterface;

class DSNeo4j {

  public function __construct() {
    try {
      $this->neo4jClient = \Laudis\Neo4j\ClientBuilder::create()->withDriver(
        'neo4j',
        $GLOBALS['wgDataspectsNeo4jURL'],
        Authenticate::basic($GLOBALS['wgDataspectsNeo4jUsername'], $GLOBALS['wgDataspectsNeo4jPassword'])
      )->build();
    } catch (Exception $e) {
      echo 'Caught exception: ',  $e->getMessage(), "\n";
    } 
  }

  public function addPageToNeo4j($mediaWikiPage) {
    // wfDebug($mediaWikiPage);
    // print_r($mediaWikiPage);
    // Here we define which fields of $mediaWikiPage become node properties (and not relationships)
    $coreProperties = '{
      name: $mw0__rawUrl,
      release_timestamp: $release_timestamp
    }';
    $queries = [
        [
            "query" => '
                CALL apoc.merge.node(
                  [ "MediaWikiPage" ],
                  { name: $mw0__rawUrl }, // identProps
                  '.$coreProperties.',    // props
                  '.$coreProperties.'     // onMatchProps
                )
                YIELD node
                RETURN node
            ',
            "params" => $mediaWikiPage // This provides all fields. We select in $coreProperties.
        ]
    ];
    $queries = array_merge($queries, $this->templateTransactions($mediaWikiPage));
    $this->update($queries);
    echo $GLOBALS['wgDataspectsNeo4jURL'].":".$GLOBALS['wgDataspectsNeo4jDatabase'].": ADDED: ".$mediaWikiPage["mw0__rawUrl"]."\n";
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

  public function releaseTimestampXago() {
    $results = $this->query([
      "query" => '
        // LEX2211071526
        MATCH     (mwp:MediaWikiPage)
        WITH      (timestamp() / 1000) - mwp.release_timestamp AS difference,
                  mwp AS mwp
        ORDER BY  difference
        WITH      collect(
                      DISTINCT CASE
                          WHEN difference < 60 THEN [difference + CASE WHEN difference > 1 THEN " seconds ago" ELSE " second ago" END, id(mwp)]
                          WHEN difference < 3600 THEN [difference / 60 + CASE WHEN difference / 60 > 1 THEN " minutes ago" ELSE " minute ago" END, id(mwp)]
                          WHEN difference < 86400 THEN [difference / 3600 + CASE WHEN difference / 3600 > 1 THEN " hours ago" ELSE " hour ago" END, id(mwp)]
                          WHEN difference < 2620800 THEN [difference / 86400 + CASE WHEN difference / 86400 > 1 THEN " days ago" ELSE " day ago" END, id(mwp)]
                          WHEN difference < 31449600 THEN [difference / 2620800 + CASE WHEN difference / 2620800 > 1 THEN " months ago" ELSE " month ago" END, id(mwp)]
                          ELSE difference / 31449600 + [CASE WHEN difference / 31449600 > 1 THEN " years ago" ELSE " year ago" END, id(mwp)]
                      END
                  ) AS buckets
        UNWIND    buckets AS bucket
            RETURN  DISTINCT bucket[0] AS ago,
                    count(bucket[1]) AS count
      ',
      "params" => []
    ]);
    $xagos = [ "labels" => [], "datasets" => [] ];
    foreach ($results as $result) {
      $xagos[ "labels" ][] = $result->get("ago");
      $xagos[ "datasets" ][] = $result->get("count");
    }
    return $xagos;
  }

  public function firstXCharacters($firstXCharacters, $property) {
    $results = $this->query([
      "query" => '
        // LEX2211071527
        // toString() is so that we can also query for non-string props
        MATCH       (mwp:MediaWikiPage)
        WITH        collect(DISTINCT [substring(toString(mwp[$property]), 0, $firstXCharacters), id(mwp)]) AS buckets,
                    mwp AS mwp
        ORDER BY    toString(mwp[$property])
        UNWIND      buckets AS bucket
            RETURN  DISTINCT bucket[0]  AS firstXCharacters,
                    count(bucket[1])    AS count
      ',
      "params" => [
        "firstXCharacters" => (int) $firstXCharacters,
        "property" => $property
      ]
    ]);
    $data = [ "labels" => [], "datasets" => [] ];
    foreach ($results as $result) {
      $data[ "labels" ][] = $result->get("firstXCharacters");
      $data[ "datasets" ][] = $result->get("count");
    }
    return $data;
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
