$(function () {
  require("./instant-meilisearch.umd.min.js");
  require("./instantsearch.js@4");
  const search = instantsearch({
    indexName: "mediawiki",
    // FIXME: How to get these from $GLOBALS?
    searchClient: instantMeiliSearch("http://localhost:7700", "masterKey"),
  });
  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: "#searchbox",
    }),
    instantsearch.widgets.refinementList({
      container: "#refinementList",
      attribute: "annotations.objectLiteral", // LEX2206291735: this is a dummy
      transformItems(items, { results }) {
        console.debug(JSON.stringify(items, null, 2));
        items = [];
        results.hits.forEach((hit) => {
          hit.annotations.forEach((annotation) => {
            if (annotation.predicate === "Eppo0:hasEntityType") {
              if (Object.keys(items).includes(annotation.objectLiteral)) {
                items[annotation.objectLiteral].count += 1;
              } else {
                items[annotation.objectLiteral] = {
                  count: 1,
                  isRefined: false,
                  value: annotation.objectLiteral,
                  label: annotation.objectLiteral,
                  highlighted: annotation.objectLiteral,
                };
              }
            }
          });
        });
        return Object.values(items);
      },
    }),
    instantsearch.widgets.hits({
      container: "#hits",
      templates: {
        item: `
        <h2>
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
        </h2>
        <p>{{ description }}</p>
      `,
      },
    }),
  ]);
  search.start();
})();
