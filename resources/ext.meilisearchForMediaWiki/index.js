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
            <span class="eppo0__hasEntityType">{{label}}</span>
            <span class="ms-count">
              {{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}
            </span>
          </a>
        `,
      },
      // Using cssClasses: { list: ["count"] } with <span class="{{cssClasses.count}}"> causes
      // Uncaught (in promise) Error: Nesting error: helpers.highlight vs. helpers.highlight
    }),
    // FIXME: solve conditional display of eppo0__hasEntityType?
    instantsearch.widgets.hits({
      container: "#hits",
      templates: {
        item: `
          <article>
            <p>
            <a href="{{name}}">
              <span class="eppo0__hasEntityType">{{eppo0__hasEntityType}}</span> <span class="eppo0__hasEntityTitle">{{#helpers.highlight}}{ "attribute": "eppo0__hasEntityTitle"}{{/helpers.highlight}}</span>
            </a>
            </p>
            <p><span class="eppo0__categories">{{ eppo0__categories }}</span></p>
            <p>{{#helpers.snippet}}{ "attribute": "mw0__text" }{{/helpers.snippet}}</p>
          </article>
        `,
        empty: "No results for <q>{{ query }}</q>",
      },
    }),
  ]);
  search.start();
})();
