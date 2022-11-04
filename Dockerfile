FROM ghcr.io/canastawiki/canasta:1.2.0

RUN cd $MW_HOME \
    && composer require --with-all-dependencies \
        meilisearch/meilisearch-php:0.25.0 \
        symfony/http-client \
        nyholm/psr7 \
        laudis/neo4j-php-client

EXPOSE 80
WORKDIR $MW_HOME

HEALTHCHECK --interval=1m --timeout=10s \
    CMD wget -q --method=HEAD localhost/w/api.php

CMD ["/run-apache.sh"]