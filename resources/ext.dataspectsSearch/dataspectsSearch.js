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

const configureQ = (helper) => {
  if (!helper.state.query) {
    let q = getUrlParameter("q");
    if (q) {
      helper.state.query = q;
    }
  }
};

const setCurrentHelper = (helper) => {
  window.localStorage.setItem("dataspectsSearchFacet", JSON.stringify(helper));
};

const getCurrentHelperAndUpdateUI = () => {
  let currentHelper = JSON.parse(
    window.localStorage.getItem("dataspectsSearchFacet")
  );
  $("#currentHelper").html(
    JSON.stringify(
      {
        query: currentHelper.state.query,
        hierarchicalFacetsRefinements:
          currentHelper.state.hierarchicalFacetsRefinements,
      },
      0,
      2
    )
  );
  let args = {
    "eppo0:hasEntityTitle": "title",
    "eppo0:hasEntityBlurb": "blurb",
    "ds0:instantsearchHelper": JSON.stringify(currentHelper),
  };
  $("#saveFacetLink").html(saveFacetLink(args));
};

saveFacetLink = (args) => {
  return (
    "<a href='" +
    mw.config.get("wgServer") +
    "/wiki/Special:FormEdit/Topic" +
    "?" +
    Object.keys(args)
      .map((key) => {
        return encodeURI("Topic[" + key + "]" + "=" + args[key]);
      })
      .join("&") +
    "'>Save this facet</a>"
  );
};

const configureFacets = (helper) => {
  // https://localhost/wiki/Special:DataspectsSearch?q=&facets={%22ds0__allPredicates.1v11%22:%22All%20Predicates%20%3E%20Ds0:hasDescription%22,%20%22ds0__allPredicates.1v12%22:%20%22All%20Predicates%20%3E%20Ds0:hasDescription%20%3E%20This%20namespace%20cover...%22}
  if (getUrlParameter("facets")) {
    const facetsJSON = JSON.parse(getUrlParameter("facets"));
    helper.setState(helper.state.setFacets(Object.keys(facetsJSON)));
    for (const [predicate, value] of Object.entries(facetsJSON)) {
      helper.addFacetRefinement(predicate, value);
    }
  }
};

const configureThisSearch = (helper) => {
  configureQ(helper);
  configureFacets(helper);
  helper.setState(helper.state.setDisjunctiveFacets(["ds0__source"]));
  mw.config.get("sources").forEach((source) => {
    helper.addDisjunctiveFacetRefinement("ds0__source", source);
  });
};

$(function () {
  const { ElementSource } = require("./indexDataSources/element.js");
  const { MediaWikiSource } = require("./indexDataSources/mediaWiki.js");
  const { SMWCindyKateSource } = require("./indexDataSources/sMWCindyKate.js");
  const {
    WikiDataspectsSource,
  } = require("./indexDataSources/wikiDataspects.js");
  require("./instant-meilisearch.umd.js");
  require("./instantsearch.production.js");

  const search = instantsearch({
    indexName: mw.config.get("wgDataspectsSearchIndex"),
    searchClient: instantMeiliSearch(
      mw.config.get("wgDataspectsSearchSearchURL"),
      mw.config.get("wgDataspectsSearchSearchKey")
    ),
    searchFunction(helper) {
      // console.debug(JSON.stringify(helper, null, 2));
      configureThisSearch(helper);
      helper.search();
      setCurrentHelper(helper);
      getCurrentHelperAndUpdateUI();
    },
  });
  search.addWidgets([
    instantsearch.widgets.configure({
      attributesToSnippet: ["ds0__text"],
      hitsPerPage: 20,
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
      attributes: [
        "ds0__allPredicates.1v10",
        "ds0__allPredicates.1v11",
        "ds0__allPredicates.1v12",
      ],
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
            case "https://smw-cindykate.com/wiki/":
              var sr = new SMWCindyKateSource(hit);
              break;
            case "https://wiki.dataspects.com/wiki/":
              var sr = new WikiDataspectsSource(hit);
              break;
            default: // FIXME
              var sr = new MediaWikiSource(hit);
          }
          return (
            '<div class="hit">' +
            "<div>" +
            sr.resultIcon() +
            sr.eppo0__hasEntityType() +
            sr.eppo0__hasEntityTitle() +
            sr.eppo0__categories() +
            sr.mw0__namespace() +
            " " +
            sr.createMetaPageLink() +
            "</div>" +
            sr.mw0__rawUrl() +
            "<div>" +
            sr.ds0__text(instantsearch) +
            "</div>" +
            sr.mw0__attachment(instantsearch) +
            sr.annotations() +
            sr.parsedPageTextFieldset() +
            "<script>" +
            sr.parsedPageText(hit) +
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
