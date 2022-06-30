$(function () {
  require("./instant-meilisearch.umd.min.js");
  require("./instantsearch.js@4");
  const search = instantsearch({
    indexName: "mediawiki",
    // FIXME: How to get these from $GLOBALS?
    searchClient: instantMeiliSearch("http://localhost:7700", "masterKey"),
  });
  search.addWidgets([
    instantsearch.widgets.configure({
      attributesToSnippet: ["mw0__text"],
    }),
    instantsearch.widgets.searchBox({
      container: "#searchbox",
    }),
    instantsearch.widgets.hierarchicalMenu({
      container: "#hierarchical-menu",
      attributes: ["eppo0__hasEntityType.1v10", "eppo0__hasEntityType.1v11"],
      templates: {
        item: `
          <a class="{{cssClasses.link}}" href="{{url}}">
            <span class="{{cssClasses.label}}">{{label}}</span>
            <span class="{{cssClasses.count}}">
              {{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}
            </span>
          </a>
        `,
      },
    }),
    instantsearch.widgets.hits({
      container: "#hits",
      templates: {
        item: `
          <article>
            <h3>
                {{#helpers.highlight}}{ "attribute": "eppo0__hasEntityTitle", "highlightedTagName": "mark" }{{/helpers.highlight}}
            </h3>
            <p>{{#helpers.snippet}}{ "attribute": "mw0__text", "highlightedTagName": "mark" }{{/helpers.snippet}}</p>
          </article>
        `,
        empty: "No results for <q>{{ query }}</q>",
      },
    }),
  ]);
  search.start();
})();
