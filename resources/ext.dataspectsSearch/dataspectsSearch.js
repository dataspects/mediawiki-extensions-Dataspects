/*

instantsearch.widgets.hierarchicalMenus cover domain-agnostic predicates:

  - mw0
  - ds0
  - eppo0

*/

const { DSNeo4j } = require("./DSneo4j.js");
var initialPageLoad = true;
var theDs0__sources = [];
window.n4j = new DSNeo4j(); //FIXME: ok to be global?

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
  if ($("#originalPageContent").prop("checked")) {
    $(this).text("Hide original page contents");
    $(".parsedPageText").css("display", "block");
  } else {
    $(this).text("Show original page contents");
    $(".parsedPageText").css("display", "none");
  }
});

$("#compactList").click(function () {
  if ($("#compactList").prop("checked")) {
    $(".searchResultBody").css("display", "none");
    $(".hit").removeClass("hit").addClass("compactHit");
  } else {
    $(".searchResultBody").css("display", "block");
    $(".compactHit").removeClass("compactHit").addClass("hit");
  }
});

$(".toggle").click(function (e) {
  e.preventDefault();
  let $this = $(this);
  if ($this.next().hasClass("show")) {
    $this.next().removeClass("show");
    $this.next().slideUp(350);
  } else {
    $this.parent().parent().find("li .inner").removeClass("show");
    $this.parent().parent().find("li .inner").slideUp(350);
    $this.next().toggleClass("show");
    $this.next().slideToggle(350);
  }
});
$("#facetingMenus").click();

const setCurrentHelper = (helper) => {
  window.localStorage.setItem(
    "dataspectsSearchFacet",
    JSON.stringify({
      user: mw.config.get("user"),
      meilisearchHelper: helper,
    })
  );
};

const getCurrentHelperAndUpdateUI = () => {
  let currentHelper = JSON.parse(
    window.localStorage.getItem("dataspectsSearchFacet")
  );
  $("#currentHelper").html(
    JSON.stringify(
      {
        user: currentHelper.user,
        query: currentHelper.meilisearchHelper.state.query,
        hierarchicalFacetsRefinements:
          currentHelper.meilisearchHelper.state.hierarchicalFacetsRefinements,
        disjunctiveFacetsRefinements:
          currentHelper.meilisearchHelper.state.disjunctiveFacetsRefinements,
      },
      0,
      2
    )
  );
  let args = {
    "ds0:instantsearchHelper": JSON.stringify(currentHelper)
      .replaceAll("{", "@@@ocb@@@")
      .replaceAll("}", "@@@ccb@@@"), // FIXME
  };
  $("#saveFacetLink").html(saveFacetLink(args));
};

saveFacetLink = (args) => {
  return (
    "<a href='" +
    mw.config.get("wgServer") +
    "/wiki/Special:FormEdit/SearchFacet" +
    "?" +
    Object.keys(args)
      .map((key) => {
        return encodeURI("SearchFacet[" + key + "]" + "=" + args[key]);
      })
      .join("&") +
    "'>Save current facet</a>"
  );
};

const configureThisSearch = (helper) => {
  if (initialPageLoad) {
    defaultToAuthorizedSources(helper); //FIXME: HACK: this confines the FIRST helper to authorized sources. However, unchecking all options expands search across ALL sources!
    if (getUrlParameter("q")) {
      helper.state.query = getUrlParameter("q");
    } else if (getUrlParameter("helper")) {
      helper.setState(
        JSON.parse(
          getUrlParameter("helper")
            .replaceAll("@@@ocb@@@", "{")
            .replaceAll("@@@ccb@@@", "}")
        ).state
      );
    }
  }
};

const defaultToAuthorizedSources = (helper) => {
  mw.config.get("sources").forEach((source) => {
    helper.addDisjunctiveFacetRefinement("ds0__source", source);
  });
};

$(function () {
  const { SearchResultMatcher } = require("./searchResultMatcher.js");

  require("./instant-meilisearch.umd.js");
  require("./instantsearch.production.js");

  // UI elements from Neo4j
  n4j.numberOfNodes("#numberOfNeo4jNodes");

  const search = instantsearch({
    indexName: mw.config.get("wgDataspectsSearchIndex"),
    searchClient: instantMeiliSearch(
      mw.config.get("wgDataspectsSearchSearchURL"),
      mw.config.get("wgDataspectsSearchSearchKey")
    ),
    searchFunction(helper) {
      /*
        This code is executed on page load as well as "as-you-type"
      */
      configureThisSearch(helper);
      if (helper.state.disjunctiveFacetsRefinements.ds0__source.length > 0) {
        // FXIME!
        helper.search();
      } else {
        alert("You have to select one or more source(s).");
      }
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
    instantsearch.widgets.refinementList({
      container: "#sources-refinement-list",
      attribute: "ds0__source",
      transformItems(items, { results }) {
        if (initialPageLoad) {
          // In order to always show all sources (disjunctively),
          // we initialize theDs0__sources on initialPageLoad to all sources.
          // FIXME: 1) properly implement disjunctive facets, 2) templating with checkboxes

          // FIXME: The following merely confines the options list to the authorized sources.
          // It does not restrict the helper's disjunctiveFacetsRefinements!
          // This could be done if we were able to access the helper here.
          theDs0__sources = items
            .filter((item) => {
              if (mw.config.get("sources").includes(item.value)) {
                return true;
              }
              return false;
            })
            .map((item) => {
              return item;
            });
          initialPageLoad = false;
        }

        // enforceAuthorizedSources(helper);
        return theDs0__sources;
      },
    }),
    instantsearch.widgets.refinementList({
      container: "#mw0__namespace-menu",
      attribute: "mw0__namespace",
      showMore: true,
      showMoreLimit: 20,
      limit: 1,
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
          /**
           * dsImplementation: Match SearchResult class against hit/env profile
           * We have:
           *  1) a hit JSON from Meilisearch and
           *  2) an environment JSON from the browser.
           * These are matched against profiles.json in order to load
           * the correct SearchResult subclass or default SearchResult class.
           */
          var srm = new SearchResultMatcher(hit, instantsearch);
          console.info(
            "Returning " + hit.name + " using " + srm.searchResultClassName
          );
          return srm.searchResult();
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
