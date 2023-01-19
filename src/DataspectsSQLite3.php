<?php

namespace MediaWiki\Extension\Dataspects;

class DataspectsSQLite3 extends \SQLite3
{
    function __construct($name) {
        $this->open("./extensions/Dataspects/".$name);
    }

    public function initialize() {
        $this->exec("CREATE TABLE IF NOT EXISTS facets(id INTEGER PRIMARY KEY, name TEXT UNIQUE, ds0instantsearchHelper TEXT);");
    }

    public function getDs0instantsearchHelpers() {
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