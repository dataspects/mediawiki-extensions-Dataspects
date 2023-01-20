<?php

namespace MediaWiki\Extension\Dataspects;

class DataspectsSQLite3 extends \SQLite3
{
    function __construct() {
        $this->open("/var/www/mediawiki/w/user-extensions/Dataspects/sqlite/dataspects.sqlite");
    }

    public function initialize() {
        $this->exec("CREATE TABLE IF NOT EXISTS facets(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, ds0instantsearchHelper TEXT);");
    }

    public function putSearchFacet($name, $currentHelper) { // FIXME: SQL injection safe?
        $result = $this->exec("INSERT INTO facets(name, ds0instantsearchHelper) VALUES('$name', '$currentHelper');");
        return $result;
    }

    public function deleteSearchFacet($id) { // FIXME: SQL injection safe?
        $result = $this->exec("DELETE FROM facets WHERE id = ".intval($id).";");
        return $result;
    }

    public function getSearchFacets() {
        $results = $this->query("SELECT id, name, ds0instantsearchHelper FROM facets;");
        $arr = [];
        while ($row = $results->fetchArray()) {    
            $arr[] = [
                "id" => $row["id"],
                "name" => $row["name"],
                "ds0__instantsearchHelper" => json_decode($row["ds0instantsearchHelper"])
            ];
		}
        return $arr;
    }
}