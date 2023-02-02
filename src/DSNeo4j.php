<?php


namespace MediaWiki\Extension\Dataspects;

use Laudis\Neo4j\Authentication\Authenticate;
use Laudis\Neo4j\ClientBuilder;
use Laudis\Neo4j\Contracts\TransactionInterface;

// https://github.com/neo4j-php/neo4j-php-client

class DSNeo4j {

  public function __construct($url, $username, $password, $database) {
    $this->url = $url;
    $this->database = $database;
    wfDebug("### Backend neo4j loading");
    try {
      $this->neo4jClient = \Laudis\Neo4j\ClientBuilder::create()->withDriver(
        'neo4j',
        $this->url."?database=".$this->database, // FIXME: does ?database= have an effect?
        Authenticate::basic($username, $password)
      )->build();
      wfDebug("### Backend neo4j loaded ");
    } catch (Exception $e) {
      wfDebug("### Backend neo4j ".$e->getMessage());
    } 
  }

  public function listDatabaseNames() {
    $query = [
      "query" => '
        SHOW DATABASES
        YIELD name
        RETURN name AS name
      ',
      "params" => []
    ];
    $results = $this->query($query);
    $databaseNames = [];
    foreach ($results as $result) {
      $databaseNames[] = $result->get("name");
    }
    return $databaseNames;
  }

  public function concludedannotations() {
    $query = [
      "query" => '
        MATCH       (n)
        UNWIND      keys(n) AS key
        RETURN      DISTINCT key AS predicate,
                    apoc.text.split(key, "__")[0] AS namespace,
                    count(n) AS count,
                    "property" AS annotationType
        UNION
        MATCH       (s)-[r]->(o)
        RETURN      DISTINCT type(r) AS predicate,
                    apoc.text.split(type(r), "__")[0] AS namespace,
                    count(r) AS count,
                    "relationship" AS annotationType
        ORDER BY    namespace
      ',
      "params" => []
    ];
    $results = $this->query($query);
    $concludedannotations = [];
    foreach ($results as $result) {
        $concludedannotations[] = [
            "predicate" => $result->get("predicate"),
            "namespace" => $result->get("namespace"),
            "count" => $result->get("count"),
            "annotationType" => $result->get("annotationType")
        ];
    }
    return $concludedannotations;
  }

  public function deleteAllNodes() {
    $queries = [
      [
        "query" => '
            MATCH (n)
            DETACH DELETE n
        ',
        "params" => []
      ]
    ];
    $this->update($queries);
    wfDebug("Deleted all nodes");
  }

  public function countNodes() {
    $query = [
      "query" => '
        MATCH     (n)
        RETURN    count(n) AS numberOfNodes
      ',
      "params" => []
    ];
    $results = $this->query($query);
    return $results->first()->get("numberOfNodes");
  }

  public function nodeslisttype0($cypherparams) {
    // https://neo4j.com/docs/cypher-manual/5/functions/predicate/
    $query = [
      "query" => '
        MATCH   (sub)-[pre]->(obj)
        WHERE   all(
                    label IN $subMatchesAllTheseLabels
                    WHERE apoc.label.exists(sub, label)
                )
            AND all(
                    label IN $objMatchesAllTheseLabels
                    WHERE apoc.label.exists(obj, label)
                )
            AND obj.name = $objName
            AND type(pre) = $predicate
        RETURN  sub.name AS name,
                sub.eppo0__hasEntityTitle AS eppo0__hasEntityTitle,
                sub.eppo0__hasEntityURL AS eppo0__hasEntityURL
        ORDER BY eppo0__hasEntityTitle
      ',
      "params" => $cypherparams // LEX230201101200
    ];
    $results = $this->query($query);
    $nodesList = [];
    foreach ($results as $result) {
      $nodesList[] = [
        name => $result->get("eppo0__hasEntityTitle"),
        eppo0__hasEntityURL => $result->get("eppo0__hasEntityURL")
      ];
    }
    return $nodesList;
  }

  public function typeahead($queryString) {
    $query = [
      "query" => '
        MATCH     (n:SearchFacet)
        WITH      apoc.coll.toSet(
                    apoc.text.regexGroups(n.name, $regex)
                  ) AS matches,
                  n.name AS name
        RETURN    name, matches
        ORDER BY  size(matches) DESC
      ',
      "params" => [
        "regex" => "(?i)".str_replace(" ", "|", trim($queryString))
      ]
    ];
    $results = $this->query($query);
    $matches = [];
    foreach ($results as $result) {
      $matches[] = [
        "name" => $result->get("name"),
        "matches" => array_map(fn($val): string => $val[0], $result->getAsArrayList("matches")->toRecursiveArray())
      ];
    }
    return $matches;
  }

  public function deleteSearchFacet($name) {
    $query = [
      "query" => '
        MATCH         (n:SearchFacet)
        WHERE         n.name = $name
        DETACH DELETE n
      ',
      "params" => [
        "name" => $name
      ]
    ];
    $results = $this->query($query);
    return $results;
  }

  public function addSearchFacet($name, $eppo0__hasEntityBlurb) {
    $queries = [
      [
        "query" => '
            CALL apoc.merge.node(
              [ "SearchFacet" ],
              { name: $name },        // identProps
              { eppo0__hasEntityBlurb: $eppo0__hasEntityBlurb },  // props
              { eppo0__hasEntityBlurb: $eppo0__hasEntityBlurb }   // onMatchProps
            )
            YIELD node
            RETURN node
        ',
        "params" => [
          "name" => $name,
          "eppo0__hasEntityBlurb" => $eppo0__hasEntityBlurb
        ]
      ]
    ];
    $this->update($queries);
    echo "Added SearchFacet ".$name;
  }

  public function addPageToNeo4j($meilisearchDocument) {
    $queries = [];
    $queries = array_merge($queries, $this->addNode($meilisearchDocument));
    $queries = array_merge($queries, $this->addRelationships($meilisearchDocument));
    $this->update($queries);
    wfDebug($this->url.":".$this->database.": ADDED: ".$meilisearchDocument["eppo0__hasEntityURL"]."\n");
  }

  private function addNode($meilisearchDocument) {
    $queries = [];
    $queries[] = [
      "query" => '
        CALL apoc.merge.node(
          $subjectLabels,
          {	// ident
            name: $name
          },
          {	// on create
            name: $name,
            eppo0__hasEntityURL: $eppo0__hasEntityURL,
            eppo0__hasEntityTitle: $eppo0__hasEntityTitle,
            ds0__sourceNamespace: $ds0__sourceNamespace,
            release_timestamp: $release_timestamp,
            eppo0__hasEntityType: $eppo0__hasEntityType
          },
          {	// on match
            eppo0__hasEntityURL: $eppo0__hasEntityURL,
            eppo0__hasEntityTitle: $eppo0__hasEntityTitle,
            ds0__sourceNamespace: $ds0__sourceNamespace,
            release_timestamp: $release_timestamp,
            eppo0__hasEntityType: $eppo0__hasEntityType
          }
        )
        YIELD node AS sub
        WITH sub AS sub
        CALL apoc.merge.node(
          $objectLabels,
          {name: $object},
          {},
          {}
        ) YIELD node AS obj
        WITH sub, obj
        CALL apoc.merge.relationship(
          sub,
          $predicate,
          {},
          {},
          obj,
          {}
        ) YIELD rel
        RETURN rel
      ',
      "params" => [
        "subjectLabels" =>         ["MediaWikiPage"],
        "name" =>                  strtolower($meilisearchDocument["eppo0__hasEntityURL"]),
        "eppo0__hasEntityURL" =>   $meilisearchDocument["eppo0__hasEntityURL"],
        "eppo0__hasEntityTitle" => $meilisearchDocument["eppo0__hasEntityTitle"],
        "ds0__sourceNamespace" =>  $meilisearchDocument["ds0__sourceNamespace"],
        "release_timestamp" =>     $meilisearchDocument["release_timestamp"],
        "eppo0__hasEntityType" =>  $meilisearchDocument["eppo0__hasEntityType"],
        "objectLabels" =>          ["MediaWiki"],
        "object" =>                $meilisearchDocument["ds0__source"],
        "predicate" =>             "ds0__originatedInSource"
      ]
    ];
    return $queries;
  }

  private function addRelationships($meilisearchDocument) {
    $queries = [];
    $queries = array_merge($queries, $this->addCategories($meilisearchDocument));
    $queries = array_merge($queries, $this->addOutgoingLinks($meilisearchDocument));
    $queries = array_merge($queries, $this->addIncomingLinks($meilisearchDocument));
    $queries = array_merge($queries, $this->addAnnotations($meilisearchDocument));
    $queries = array_merge($queries, $this->addTemplates($meilisearchDocument));
    $queries = array_merge($queries, $this->addAttachments($meilisearchDocument));
    return $queries;
  }

  private function addCategories($meilisearchDocument) {
    $queries = [];
    if(array_key_exists("eppo0__categories", $meilisearchDocument)) {
        foreach ($meilisearchDocument["eppo0__categories"] as $category) {
            $queries[] = [
                "query" => '
                MERGE (sub:MediaWikiPage{name: $subject})
                WITH sub AS sub
                CALL apoc.merge.node(
                    $objectLabels,
                    {name: $object},
                    {},
                    {}
                ) YIELD node AS obj
                WITH sub, obj
                CALL apoc.merge.relationship(
                    sub,
                    $predicate,
                    {},
                    {},
                    obj,
                    {}
                ) YIELD rel
                RETURN rel
                ',
                "params" => [
                "subject" =>       strtolower($meilisearchDocument["eppo0__hasEntityURL"]),
                "predicate" =>     "eppo0__hasCategory",
                "object" =>        strtolower($category),
                "objectLabels" =>  ["Category"]
                ]
            ];
        }
    }
    return $queries;
  }

  private function addOutgoingLinks($meilisearchDocument) {
    $queries = [];
    if(array_key_exists("ds0__outgoingLinks", $meilisearchDocument)) {
        foreach ($meilisearchDocument["ds0__outgoingLinks"] as $link) {
            $queries[] = [
                "query" => '
                MERGE (sub:MediaWikiPage{name: $subject})
                WITH sub AS sub
                CALL apoc.merge.node(
                    $objectLabels,
                    {name: $object},
                    {},
                    {}
                ) YIELD node AS obj
                WITH sub, obj
                CALL apoc.merge.relationship(
                    sub,
                    $predicate,
                    {},
                    {},
                    obj,
                    {}
                ) YIELD rel
                RETURN rel
                ',
                "params" => [
                "subject" =>       strtolower($meilisearchDocument["eppo0__hasEntityURL"]),
                "predicate" =>     "ds0__linksTo",
                "object" =>        strtolower($link),
                "objectLabels" =>  ["RELATIONSHIPLEAF"]
                ]
            ];
        }
    }
    return $queries;
  }

  private function addIncomingLinks($meilisearchDocument) {
    $queries = [];
    if(array_key_exists("ds0__incomingLinks", $meilisearchDocument) && is_array($meilisearchDocument["ds0__incomingLinks"])) {
        foreach ($meilisearchDocument["ds0__incomingLinks"] as $link) {
            $queries[] = [
                "query" => '
                MERGE (obj:MediaWikiPage{name: $object})
                WITH obj AS obj
                CALL apoc.merge.node(
                    $subjectLabels,
                    {name: $subject},
                    {},
                    {}
                ) YIELD node AS sub
                WITH sub, obj
                CALL apoc.merge.relationship(
                    sub,
                    $predicate,
                    {},
                    {},
                    obj,
                    {}
                ) YIELD rel
                RETURN rel
                ',
                "params" => [
                "subject" =>       strtolower($link),
                "subjectLabels" =>  ["RELATIONSHIPLEAF"],
                "predicate" =>     "ds0__linksTo",
                "object" =>        strtolower($meilisearchDocument["eppo0__hasEntityURL"])
                ]
            ];
        }
    }
    return $queries;
  }

  private function addAnnotations($meilisearchDocument) {
    $queries = [];
    if(array_key_exists("annotations", $meilisearchDocument)) {
        foreach ($meilisearchDocument["annotations"] as $annot) {
            if(in_array($annot["objectType"], ["URL", "Page"])) {
                // This annotation links to an URL or another MediaWiki page
                $queries[] = [
                "query" => '
                    // Subject
                        MERGE (sub:MediaWikiPage{name: $subject})
                        WITH sub AS sub
                    // Merge the object node
                        CALL apoc.merge.node(
                        $objectLabels,
                        {name: $object},
                        {},
                        {}
                        ) YIELD node AS obj
                        WITH sub, obj
                    // Merge the subject > object relationship
                        CALL apoc.merge.relationship(
                        sub,
                        $predicate,
                        {},
                        {},
                        obj,
                        {}
                        ) YIELD rel
                    RETURN rel
                ',
                "params" => [
                    "subject" =>       strtolower($annot["subject"]),
                    "predicate" =>     $annot["predicate"],
                    "object" =>        strtolower($annot["objectText"]),
                    "objectLabels" =>  ["RELATIONSHIPLEAF"]
                ]
                ];
            } else if(in_array($annot["objectType"], ["Text", "Boolean"])) {
                $queries[] = [
                "query" => '
                    MATCH (sub:MediaWikiPage{name: $subject})
                    CALL apoc.create.setProperties(
                        sub, [$predicate], [$object]
                    )
                    YIELD node
                    RETURN sub
                ',
                "params" => [
                    "subject" =>            strtolower($annot["subject"]),
                    "predicate" =>          str_replace(":", "__", $annot["predicate"]),
                    "object" =>             strtolower($annot["objectText"])
                ]
                ];
            } else {
                $queries[] = [
                    "query" => '
                    // Subject
                        MERGE (sub:MediaWikiPage{name: $subject})
                        WITH sub AS sub
                    // Merge the object node
                        CALL apoc.merge.node(
                        $objectLabels,
                        {name: $object},
                        {},
                        {}
                        ) YIELD node AS obj
                        WITH sub, obj
                    // Merge the subject > object relationship
                        CALL apoc.merge.relationship(
                        sub,
                        $predicate,
                        {},
                        {},
                        obj,
                        {}
                        ) YIELD rel
                    RETURN rel
                    ',
                    "params" => [
                    "subject" =>       strtolower($annot["subject"]),
                    "predicate" =>     $annot["predicate"],
                    "object" =>        strtolower($annot["objectText"]),
                    "objectLabels" =>  ["RELATIONSHIPLEAF", $annot["objectType"]]
                    ]
                ];
            }
        }
    }
    return $queries;
  }

  private function addTemplates($meilisearchDocument) {
    $queries = [];
    if(array_key_exists("ds0__templates", $meilisearchDocument)) {
        foreach ($meilisearchDocument["ds0__templates"] as $template) {
            $queries[] = [
                "query" => '
                MERGE (sub:MediaWikiPage{name: $subject})
                WITH sub AS sub
                CALL apoc.merge.node(
                    $objectLabels,
                    {name: $object},
                    {},
                    {}
                ) YIELD node AS obj
                WITH sub, obj
                CALL apoc.merge.relationship(
                    sub,
                    $predicate,
                    {},
                    {},
                    obj,
                    {}
                ) YIELD rel
                RETURN rel
                ',
                "params" => [
                "subject" =>       strtolower($meilisearchDocument["eppo0__hasEntityURL"]),
                "predicate" =>     "eppo0__hasTemplate",
                "object" =>        strtolower($template["title"]),
                "objectLabels" =>  ["Template"]
                ]
            ];
        }
    }
    if(array_key_exists("ds0__templates_by_regex", $meilisearchDocument)) {
        foreach ($meilisearchDocument["ds0__templates_by_regex"] as $template) {
            $queries[] = [
                "query" => '
                MERGE (sub:MediaWikiPage{name: $subject})
                WITH sub AS sub
                CALL apoc.merge.node(
                    $objectLabels,
                    {name: $object},
                    {},
                    {}
                ) YIELD node AS obj
                WITH sub, obj
                CALL apoc.merge.relationship(
                    sub,
                    $predicate,
                    {},
                    {},
                    obj,
                    {}
                ) YIELD rel
                RETURN rel
                ',
                "params" => [
                "subject" =>       strtolower($meilisearchDocument["eppo0__hasEntityURL"]),
                "predicate" =>     "eppo0__hasTemplate",
                "object" =>        strtolower($template["title"]),
                "objectLabels" =>  ["Template"]
                ]
            ];
        }
    }
    return $queries;
  }

  private function addAttachments($meilisearchDocument) {
    $queries = [];
    if(array_key_exists("ds0__attachments", $meilisearchDocument)) {
        foreach ($meilisearchDocument["ds0__attachments"] as $attachment) {
            $queries[] = [
                "query" => '
                MERGE (sub:MediaWikiPage{name: $subject})
                WITH sub AS sub
                CALL apoc.merge.node(
                    $objectLabels,
                    {name: $object},
                    {},
                    {}
                ) YIELD node AS obj
                WITH sub, obj
                CALL apoc.merge.relationship(
                    sub,
                    $predicate,
                    {},
                    {},
                    obj,
                    {}
                ) YIELD rel
                RETURN rel
                ',
                "params" => [
                "subject" =>       strtolower($meilisearchDocument["eppo0__hasEntityURL"]),
                "predicate" =>     "eppo0__hasCategory",
                "object" =>        strtolower($attachment),
                "objectLabels" =>  ["RELATIONSHIPLEAF"]
                ]
            ];
        }
    }
    return $queries;
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

  private function eppo0__hasEntityURL($someName) {
    return $GLOBALS['wgServer'].str_replace("$1", "", $GLOBALS['wgArticlePath']).$someName;
  }

}
