<?php

namespace MediaWiki\Extension\Dataspects;

class DataspectsSQLite3 extends \SQLite3 {
    // FIXME: mustn't this be a "singleton"?
    function __construct() {
        $this->db_dir = "/var/www/mediawiki/w/user-extensions/Dataspects/sqlite/";
        $this->db_file = $this->db_dir."dataspects.sqlite";
        $this->perms = 0777; // FIXME
    }

    private function openDB() {
        try {
            $this->open($this->db_file);
            return true;
        } catch (Exception $e) {
            wfDebug("### ".$e->getMessage());
            return false;
        }
    }

    public function initialize() {
        if(!is_dir($this->db_dir)) {
            if(!mkdir($this->db_dir)) {
                return false;
            }
            if(!chmod($this->db_dir, $this->perms)) {
                return false;
            }
        }
        $this->open($this->db_file);
        if(chmod($this->db_file, $this->perms)) {
            $this->exec("CREATE TABLE IF NOT EXISTS facets(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, comment TEXT, ds0instantsearchHelper TEXT);");
            return true;
        }
        return false;
    }

    public function putSearchFacet($name, $comment, $currentHelper) { // FIXME: SQL injection safe?
        if(!$this->openDB()) {
            return false;
        }
        $result = $this->exec("INSERT INTO facets(name, comment, ds0instantsearchHelper) VALUES('$name', '$comment', '$currentHelper');");
        wfDebug("### $result");
        return $result;
    }

    public function deleteSearchFacet($name) { // FIXME: SQL injection safe?
        $this->openDB();
        $result = $this->exec("DELETE FROM facets WHERE name = '".$name."';");
        return $result;
    }

    public function getSearchFacets() {
        if(!$this->openDB()) {
            return false;
        }
        $results = $this->query("SELECT name, ds0instantsearchHelper FROM facets;");
        $arr = [];
        while ($row = $results->fetchArray()) {    
            $arr[] = [
                "name" => $row["name"],
                "comment" => $row["comment"],
                "ds0__instantsearchHelper" => json_decode($row["ds0instantsearchHelper"], true)
            ];
		}
        return $arr;
    }

    public function getSearchFacet($searchfacetname) {
        if(!$this->openDB()) {
            return false;
        }
        $results = $this->query("SELECT name, ds0instantsearchHelper FROM facets WHERE name = '$searchfacetname';");
        $arr = [];
        while ($row = $results->fetchArray()) {    
            $arr[] = [
                "name" => $row["name"],
                "comment" => $row["comment"],
                "ds0__instantsearchHelper" => json_decode($row["ds0instantsearchHelper"], true)
            ];
		}
        return $arr;
    }
}