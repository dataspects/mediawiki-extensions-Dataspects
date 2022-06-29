$(function () {
  require("./instant-meilisearch.umd.min.js");
  require("./instantsearch.js@4");
  const search = instantsearch({
    indexName: "movies",
    searchClient: instantMeiliSearch("http://localhost:7700", "masterKey"),
  });
  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: "#searchbox",
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
