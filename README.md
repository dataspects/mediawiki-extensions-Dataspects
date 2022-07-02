# dataspects Search for MediaWiki

```php
wfLoadExtension( 'DataspectsSearch' );
$wgDataspectsSearchURL = "http://meili:7700";
$wgDataspectsSearchKey = "masterKey";
$wgDataspectsSearchIndex = "mediawiki";
$wgDataspectsSearchMediaWikiID = "dscan";

$wgDisableTextSearch = true;
$wgSearchForwardUrl = "/wiki/Special:DataspectsSearch?q=$1";
$wgDebugLogGroups['dataspects'] = "/var/log/dataspects.log";

// FIXME: this is so that the minifier doesn't destroy the hits templates
$wgResourceLoaderDebug = true; 
```

## Manual indexing

```bash
sudo docker exec -it canasta-dockercompose_web_1 /bin/bash
```

## Meilisearch

https://github.com/dataspects/MVP/tree/main/MeiliSearch

## Develop

```bash
root@95e3ef5ecc17:/var/www/mediawiki/w# clear; php extensions/DataspectsSearch/maintenance/feedOne.php
lex@lexYoga:~/MVP/MeiliSearch$ MEILI_MASTER_KEY=masterKey ./getDocument.sh
```