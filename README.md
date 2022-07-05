# dataspects Search for MediaWiki

```php
wfLoadExtension( 'DataspectsSearch' );
$wgDataspectsSearchTikaURL = "http://tika:9998";
$wgDataspectsSearchMeiliURL = "http://meili:7700";
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

* $this->elementsToBeRemoved

```bash
sudo docker exec -it canasta-dockercompose_web_1 /bin/bash
```

## Tika and Meilisearch

https://github.com/dataspects/MVP/tree/main/MeiliSearch


composer require meilisearch/meilisearch-php guzzlehttp/guzzle http-interop/http-factory-guzzle:^1.0


```yaml
tika:
    container_name: tika
    image: apache/tika:2.4.0-full
    ports:
      - "9998:9998"
meili:
    container_name: meili
    image: getmeili/meilisearch:v0.27.2
    ports:
      - 7700:7700
    environment:
      - MEILI_MASTER_KEY=masterKey
    volumes:
      - /home/lex/meili_data:/meili_data
```

## Test
```bash
sudo docker exec -it canasta-dockercompose_web_1 /bin/bash
root@95e3ef5ecc17:/var/www/mediawiki/w# php tests/phpunit/phpunit.php \
  extensions/DataspectsSearch/tests/phpunit/unit/DataspectsSearchTest.php
```


## Develop

```bash
root@95e3ef5ecc17:/var/www/mediawiki/w# clear; php extensions/DataspectsSearch/maintenance/feedOne.php
lex@lexYoga:~/MVP/MeiliSearch$ MEILI_MASTER_KEY=masterKey ./getDocument.sh

tail -f  apache2/error_log.current
```

https://www.digitalocean.com/community/tutorials/how-to-run-a-meilisearch-frontend-using-instantsearch-on-ubuntu-22-04