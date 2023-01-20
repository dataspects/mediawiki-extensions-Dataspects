require("mediawiki.api");
const mwapi = new mw.Api();
require("./helpers.js");
require("./chart.js");
require("./chartjs-plugin-datalabels.js");
const { SearchFacets } = require("./SearchFacets.js");
const searchFacets = new SearchFacets(mwapi);
/*

instantsearch.widgets.hierarchicalMenus cover domain-agnostic predicates:

  - mw0
  - ds0
  - eppo0

*/

const { DSNeo4j } = require("./DSneo4j.js");
var isCompact = false;
var initialPageLoad = true;
var theDs0__sources = [];
const n4j = new DSNeo4j(); //FIXME: ok to be global?

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

// Is this Jquery code at the right place and properly implemented?
// LEX230108165801
$("#originalPageContent").click(function () {
  if ($("#originalPageContent").prop("checked")) {
    $(this).text("Hide original page contents");
    $(".parsedPageText").css("display", "block");
  } else {
    $(this).text("Show original page contents");
    $(".parsedPageText").css("display", "none");
  }
});

// LEX230108165800
$("#compactList").click(function () {
  if ($("#compactList").prop("checked")) {
    $(".searchResultBody").css("display", "none");
    $(".hit").removeClass("hit").addClass("compactHit");
    isCompact = true;
  } else {
    $(".searchResultBody").css("display", "block");
    $(".compactHit").removeClass("compactHit").addClass("hit");
    isCompact = false;
  }
});

$('[data-cy="showSavedSearchFacetsButton"]').click(function (e) {
  e.preventDefault();
  let $this = $(this);
  if ($this.next().hasClass("show")) {
    $this.next().removeClass("show");
    $this.next().slideUp(350);
  } else {
    searchFacets.showSavedSearchFacetsList(mwapi);
    $this.parent().parent().find("li .inner").removeClass("show");
    $this.parent().parent().find("li .inner").slideUp(350);
    $this.next().toggleClass("show");
    $this.next().slideToggle(350);
  }
});

const onPageLoadComplete = () => {
  if (getUrlParameter("intro")) {
    $("#intro").html(getUrlParameter("intro"));
  }
  $("#facetingMenus").click();
};

const setCurrentHelper = (helper) => {
  window.localStorage.setItem(
    "dataspectsSearchFacet",
    JSON.stringify({
      environment: { user: mw.config.get("user") },
      meilisearchHelper: helper,
    })
  );
};

$('[data-cy="saveCurrentFacetButton"]').click(function (e) {
  e.preventDefault();
  searchFacets.placeSearchFacetFormHTML("dropzone0");
  $('[data-cy="saveSearchFacetFormHTML"]').on("submit", (e) => {
    e.preventDefault();
    const payload = {
      searchFacetName: $('[data-cy="saveSearchFacetFormHTMLName"]').val(),
      currentHelper: window.localStorage.getItem("dataspectsSearchFacet"),
    };
    if (payload.searchFacetName === "" || payload.currentHelper === {}) {
      alert("saveCurrentFacet data error!");
    }
    mwapi
      .get({
        action: "dataspectsapi",
        querytype: "putsearchfacet",
        searchfacetname: payload.searchFacetName,
        currenthelper: payload.currentHelper,
      })
      .done(function (response) {
        $('[data-cy="savesearchfacet_result"]').text(response.data.status);
        console.log(JSON.stringify(response, null, 2));
      })
      .fail(function (response) {
        console.error(response);
      });
  });
});

// LEX230108163200
const saveSearchFacetFormOLD = (args) => {
  // return (
  //   "<a href='" +
  //   currentDeFactoWgServer() +
  //   "/wiki/Special:FormEdit/SearchFacet" +
  //   "?" +
  //   Object.keys(args)
  //     .map((key) => {
  //       return encodeURI("SearchFacet[" + key + "]" + "=" + args[key]);
  //     })
  //     .join("&") +
  //   "'>Save current facet</a>"
  // );
};

const configureThisSearch = (helper) => {
  if (initialPageLoad) {
    defaultToAuthorizedSources(helper); //FIXME: HACK: this confines the FIRST helper to authorized sources. However, unchecking all options expands search across ALL sources!
    if (getUrlParameter("q")) {
      helper.state.query = getUrlParameter("q"); // This populates the search input
    } else if (getUrlParameter("helper")) {
      helper.setState(
        JSON.parse(getUrlParameter("helper")).meilisearchHelper.state
      );
    }
  }
};

const defaultToAuthorizedSources = (helper) => {
  mw.config.get("sources").forEach((source) => {
    helper.addDisjunctiveFacetRefinement("ds0__source", source);
  });
};
/**
 * Switch by special page type
 */
if (
  window.location.href.startsWith(
    currentDeFactoWgServer() + "/wiki/Special:DataspectsBackstage"
  )
) {
  handleSpecialDataspectsBackstage();
} else if (
  window.location.href.startsWith(
    currentDeFactoWgServer() + "/wiki/Special:Dataspects"
  )
) {
  handleSpecialDataspects();
}

function handleSpecialDataspects() {
  if (!mw.config.get("wgDataspectsSearchURL")) {
    return;
  }

  const { SearchResultMatcher } = require("./searchResultMatcher.js");

  require("./instant-meilisearch.umd.js");
  require("./instantsearch.production.min.js");

  const search = instantsearch({
    indexName: mw.config.get("wgDataspectsIndex"),
    searchClient: instantMeiliSearch(
      mw.config.get("wgDataspectsSearchURL"),
      mw.config.get("wgDataspectsSearchKey")
    ),
    searchFunction(helper) {
      /*
        This code is executed on page load as well as "as-you-type"
      */
      configureThisSearch(helper);
      if (helper.state.disjunctiveFacetsRefinements.ds0__source.length > 0) {
        // FXIME!
        searchFacets.typeahead(helper.state.query);
        helper.search();
      } else {
        alert("You have to select one or more source(s).");
      }
      setCurrentHelper(helper);
    },
  });
  search.addWidgets([
    instantsearch.widgets.configure({
      // FIXME: https://github.com/algolia/instantsearch/discussions/4762?sort=top?sort=top
      attributesToSnippet: mw.config.get("wgDataspectsAttributesToSnippet"),
      hitsPerPage: 5,
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
      cssClasses: {
        root: "no-root-bullet-in-list",
      },
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
      templates: {
        item: '<a class="{{cssClasses.link}}" href="{{url}}"><span class="badge ds0__source">{{label}}</span>&nbsp;<span class="badge ms-count">{{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}</span></a>',
      },
      cssClasses: {
        root: "sources-refinement-list",
      },
    }),
    instantsearch.widgets.refinementList({
      container: "#ds0__sourceNamespace-menu",
      attribute: "ds0__sourceNamespace",
      showMore: true,
      showMoreLimit: 20,
      limit: 1,
      templates: {
        item: '<a class="{{cssClasses.link}}" href="{{url}}"><span class="ds0__sourceNamespace">{{label}}</span>&nbsp;<span class="badge ms-count">{{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}</span></a>',
      },
      cssClasses: {
        root: "ds0__sourceNamespace-menu",
      },
    }),
    instantsearch.widgets.hierarchicalMenu({
      container: "#coke-menu",
      attributes: [
        "ck0__containsCognitiveKeyword.1v10",
        "ck0__containsCognitiveKeyword.1v11",
      ],
      templates: {
        item: '{{=<% %>=}}<a class="<%cssClasses.link%>" href="<%url%>"><span class="ds0__source"><%label%></span>&nbsp;<span class="ms-count"><%#helpers.formatNumber%><%count%><%/helpers.formatNumber%></span></a>',
      },
      cssClasses: {
        root: "no-root-bullet-in-list",
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
        root: "no-root-bullet-in-list",
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
        root: "no-root-bullet-in-list",
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
        root: "no-root-bullet-in-list",
      },
      limit: 1000,
    }),
    // FIXME: ${currentDeFactoWgServer()}/wiki/ by variable
    instantsearch.widgets.infiniteHits({
      container: "#hits",
      templates: {
        item(hit) {
          /**
           * ds1:implements: Match SearchResult class against hit/env profile
           * We have:
           *  1) a hit JSON from Meilisearch and
           *  2) an environment JSON from the browser.
           * These are matched against profiles.json in order to load
           * the correct SearchResult subclass or default SearchResult class.
           */
          var srm = new SearchResultMatcher(
            hit,
            JSON.parse(
              window.localStorage.getItem("dataspectsSearchFacet")
            ).environment,
            instantsearch,
            n4j
          );
          console.info(
            "Returning " + hit.name + " using " + srm.searchResultClassName
          );
          return srm.searchResult();
        },
        empty:
          "No results for <q>{{ query }}</q> or no results for your authorization level.",
      },
      transformItems(items, { results }) {
        return items.map((item, index) => {
          return {
            ...item,
            position: { index, page: results.page },
          };
        });
      },
    }),
  ]);
  search.start();
}

function handleSpecialDataspectsBackstage() {
  n4j.numberOfNodes("#numberOfNeo4jNodes");
  n4j.releaseTimestampXago();
  n4j.firstXCharacters(20, "name");

  $(document).ready(function () {
    $("#initializetopictype_form").submit(function (event) {
      event.preventDefault();
      mwapi
        .get({
          action: "dataspectsapi",
          querytype: "initializetopictype",
          topictype_name: $("#topictype_name").val(),
        })
        .done(function (response) {
          $("#initializetopictype_result").text(response.data.status);
        })
        .fail(function (response) {
          console.error(response);
        });
    });
  });
}
