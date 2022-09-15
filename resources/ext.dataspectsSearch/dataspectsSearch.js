/*

instantsearch.widgets.hierarchicalMenus cover domain-agnostic predicates:

  - mw0
  - ds0
  - eppo0

*/

const getUrlParameter = (sParam) => {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

$("#originalPageContent").click(function () {
  if ($(this).text() === "Show original page contents") {
    $(this).text("Hide original page contents");
    $(".parsedPageText").css("display", "block");
  } else {
    $(this).text("Show original page contents");
    $(".parsedPageText").css("display", "none");
  }
});

$(function () {
  const { ElementSource } = require("./indexDataSources/element.js");
  const { MediaWikiSource } = require("./indexDataSources/mediaWiki.js");
  require("./instant-meilisearch.umd.js");
  require("./instantsearch.production.js");

  const search = instantsearch({
    indexName: mw.config.get("wgDataspectsSearchIndex"),
    searchClient: instantMeiliSearch(
      mw.config.get("wgDataspectsSearchSearchURL"),
      mw.config.get("wgDataspectsSearchSearchKey")
    ),
    searchFunction(helper) {
      if (!helper.state.query) {
        let q = getUrlParameter("q");
        if (q) {
          helper.state.query = q;
        }
      }
      helper.setState(helper.state.setDisjunctiveFacets(["ds0__source"]));
      mw.config.get("sources").forEach((source) => {
        helper.addDisjunctiveFacetRefinement("ds0__source", source);
      });
      helper.search();
    },
  });
  search.addWidgets([
    instantsearch.widgets.configure({
      attributesToSnippet: ["ds0__text"],
    }),
    instantsearch.widgets.searchBox({
      container: "#searchbox",
      showReset: false,
      showSubmit: false,
    }),
    instantsearch.widgets.hierarchicalMenu({
      container: "#topic-types-hierarchical-menu",
      attributes: [
        "eppo0__hasEntityType.1v10",
        "eppo0__hasEntityType.1v11",
        "eppo0__hasEntityType.1v12",
      ],
      templates: {
        item: '<a class="{{cssClasses.link}}" href="{{url}}"><span class="badge eppo0__hasEntityType">{{label}}</span>&nbsp;<span class="badge ms-count">{{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}</span></a>',
      },
      limit: 50,
    }),
    instantsearch.widgets.hierarchicalMenu({
      container: "#sources-hierarchical-menu",
      attributes: [
        "ds0__source.1v10",
        "ds0__source.1v11",
        "ds0__source.1v12",
        "ds0__source.1v13",
      ],
      templates: {
        item: '{{=<% %>=}}<a class="<%cssClasses.link%>" href="<%url%>"><span class="ds0__source"><%label%></span>&nbsp;<span class="ms-count"><%#helpers.formatNumber%><%count%><%/helpers.formatNumber%></span></a>',
      },
      cssClasses: {
        parentItem: "parentItem",
        selectedItem: "selectedItem",
      },
      limit: 50,
    }),
    instantsearch.widgets.hierarchicalMenu({
      container: "#sea-kay-menu",
      attributes: [
        "ck0__containsCognitiveKeyword.1v10",
        "ck0__containsCognitiveKeyword.1v11",
      ],
      templates: {
        item: '{{=<% %>=}}<a class="<%cssClasses.link%>" href="<%url%>"><span class="ds0__source"><%label%></span>&nbsp;<span class="ms-count"><%#helpers.formatNumber%><%count%><%/helpers.formatNumber%></span></a>',
      },
      cssClasses: {
        parentItem: "parentItem",
        selectedItem: "selectedItem",
      },
      limit: 50,
    }),
    instantsearch.widgets.hierarchicalMenu({
      container: "#actions-menu",
      attributes: ["ds0__featuresAction.1v10", "ds0__featuresAction.1v11"],
      templates: {
        item: '{{=<% %>=}}<a class="<%cssClasses.link%>" href="<%url%>"><span class="badge ds0__featuresAction"><%label%></span>&nbsp;<span class="ms-count"><%#helpers.formatNumber%><%count%><%/helpers.formatNumber%></span></a>',
      },
      cssClasses: {
        parentItem: "parentItem",
        selectedItem: "selectedItem",
      },
      limit: 50,
    }),
    instantsearch.widgets.hierarchicalMenu({
      container: "#selected-aspects-menu",
      attributes: ["ds0__specialAspect.1v10", "ds0__specialAspect.1v11"],
      templates: {
        item: '{{=<% %>=}}<a class="<%cssClasses.link%>" href="<%url%>"><span class="badge ds0__specialAspect"><%label%></span>&nbsp;<span class="ms-count"><%#helpers.formatNumber%><%count%><%/helpers.formatNumber%></span></a>',
      },
      cssClasses: {
        parentItem: "parentItem",
        selectedItem: "selectedItem",
      },
      limit: 50,
    }),
    instantsearch.widgets.hierarchicalMenu({
      container: "#all-predicates-menu",
      attributes: ["ds0__allPredicates.1v10", "ds0__allPredicates.1v11"],
      templates: {
        item: '{{=<% %>=}}<a class="<%cssClasses.link%>" href="<%url%>"><span class="badge ds0__allPredicates"><%label%></span>&nbsp;<span class="ms-count"><%#helpers.formatNumber%><%count%><%/helpers.formatNumber%></span></a>',
      },
      cssClasses: {
        parentItem: "parentItem",
        selectedItem: "selectedItem",
      },
      limit: 1000,
    }),
    // FIXME: ${mw.config.get("wgServer")}/wiki/ by variable
    instantsearch.widgets.hits({
      container: "#hits",
      templates: {
        item(hit) {
          switch (hit.ds0__source) {
            case "Element":
              // console.debug(JSON.stringify(hit, null, 2));
              var sr = new ElementSource(hit);
              break;
            default: // FIXME
              var sr = new MediaWikiSource(hit);
          }
          return (
            '<div class="hit">' +
            "<div>" +
            sr.eppo0__hasEntityType() +
            "&nbsp;" +
            sr.eppo0__hasEntityTitle() +
            "&nbsp;" +
            sr.eppo0__categories() +
            " " +
            sr.createMetaPageLink() +
            "</div>" +
            sr.mw0__rawUrl() +
            "<div>" +
            sr.ds0__text(instantsearch) +
            "</div>" +
            sr.mw0__attachment(instantsearch) +
            sr.annotations() +
            '<fieldset id="' +
            hit.id +
            '_fieldset" class="parsedPageText"><legend><i>This is the original page content</i></legend><div id="' +
            hit.id +
            '"></div></fieldset><script>' +
            sr.parsedPageText() +
            +"</script></div>"
          );
        },
        empty:
          "No results for <q>{{ query }}</q> or no results for your authorization level.",
      },
      transformItems(items) {
        return items;
      },
    }),
  ]);
  search.start();
})();
