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
