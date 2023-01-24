require("mediawiki.api");
require("./helpers.js");
require("./chart.js");
require("./chartjs-plugin-datalabels.js");
require("./instant-meilisearch.umd.js");
require("./instantsearch.production.min.js");
require("./datatables.js");
const profiles = require("./profiles.json");
const { DataspectsHelpers } = require("./helpers.js");
const { SearchFacets } = require("./SearchFacets.js");
const { DSMWAPI } = require("./DSMWAPI.js");
const mwapi = new mw.Api();
var isCompact = false;
var initialPageLoad = true;
var currentDs0__sources = [];
const dsMWAPI = new DSMWAPI(); //FIXME: ok to be global?

/**
 *
 * @param {*} sParam
 * @returns
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
/**
 * Switch by special page type
 */
if (
  window.location.href.startsWith(
    DataspectsHelpers.currentDeFactoWgServer() +
      "/wiki/Special:DataspectsBackstage"
  )
) {
  handleSpecialDataspectsBackstage();
} else if (
  window.location.href.startsWith(
    DataspectsHelpers.currentDeFactoWgServer() + "/wiki/Special:Dataspects"
  )
) {
  handleSpecialDataspects();
}
/**
 *
 * @param {*} helper
 */
const defaultToAuthorizedSources = (helper) => {
  mw.config.get("sources").forEach((source) => {
    helper.addDisjunctiveFacetRefinement("ds0__source", source);
  });
};

function handleSpecialDataspects() {
  /**
   * Check config
   */
  if (!mw.config.get("wgDataspectsSearchURL")) {
    return;
  }
  /**
   * Load special classes
   */
  const { SearchResultMatcher } = require("./searchResultMatcher.js");

  /**
   *
   * @param {*} helper
   */
  const storeCurrentContextInLocalStorage = (helper, searchFacet) => {
    var currentContext = {
      environment: { user: mw.config.get("user") },
      meilisearchHelper: helper,
      searchFacetName: false,
    };
    if (searchFacet) {
      currentContext.searchFacetName = searchFacet.name;
    }
    window.localStorage.setItem(
      "currentContext",
      JSON.stringify(currentContext)
    );
  };

  /**
   * https://community.algolia.com/algoliasearch-helper-js/reference.html
   *
   * derive()
   * hasPedningRequests()
   * setQueryParameter()
   * clearRefinements()
   * addFacetRefinements()
   * removeFacetRefinements()
   * hasRefinement()
   * getRefinements()
   * clearRefinements()
   * removeDisjunctiveFacetRefinement()
   * hasRefinements()
   * addHierarchicalFacetRefinement()
   * addFacetExclusion()
   * addTag()
   * helper.on('change|search|result|error|searchQueueEmpty|searchForFacetValues'
   * results.npPages|nbHits
   * parsedQuery
   * serverUsed
   * setTypoTolerance()
   */

  const setQueryIfQURLParameter = (helper) => {
    const currentQueryString = getUrlParameter("q");
    if (currentQueryString) {
      helper.setQuery(currentQueryString);

      return true;
    }
    return false;
  };
  const checkForFURLParameter = () => {
    // FIXME: is this correctly and completely implemented?
    return new Promise(function (resolve, reject) {
      const currentSearchFacet = decodeURIComponent(getUrlParameter("f"));
      if (currentSearchFacet) {
        mwapi
          .get({
            action: "dataspectsapi",
            querytype: "activatesearchfacet",
            searchfacetname: currentSearchFacet,
          })
          .done((response) => {
            if (response.data.searchfacets.length > 0) {
              resolve(response.data.searchfacets[0]);
            } else {
              resolve(false);
            }
          })
          .fail((response) => {
            console.error(response);
          });
      }
    });
  };

  var currentContext = JSON.parse(
    window.localStorage.getItem("currentContext")
  );

  const search = instantsearch({
    indexName: mw.config.get("wgDataspectsIndex"),
    searchClient: instantMeiliSearch(
      mw.config.get("wgDataspectsSearchURL"),
      mw.config.get("wgDataspectsSearchKey")
    ),
    async searchFunction(helper) {
      /*
        This code is executed on page load as well as "as-you-type"
      */
      var searchFacet = {};
      if (initialPageLoad) {
        // defaultToAuthorizedSources(helper);
        /**
         * Check for q URL parameter and setQuery if there is one
         */
        if (!setQueryIfQURLParameter(helper)) {
          /**
           * If there is no q URL parameter, then check for
           * f URL parameter and get the corresponding facet:
           */
          searchFacet = await checkForFURLParameter();
          if (searchFacet) {
            console.log("Loading search facet " + searchFacet.name);
            helper.setState(
              searchFacet.ds0__instantsearchHelper.meilisearchHelper.state
            );
          }
        }
        storeCurrentContextInLocalStorage(helper, searchFacet);
      }

      initialPageLoad = false;
      // if (helper.state.disjunctiveFacetsRefinements.ds0__source.length > 0) {
      // FXIME!
      searchFacets.typeahead(helper.state.query);
      currentContext = JSON.parse(
        window.localStorage.getItem("currentContext")
      );
      helper.search();
      // } else {
      //   alert("You have to select one or more source(s).");
      // }
    },
  });

  const searchFacets = new SearchFacets(mwapi, search);

  theHelper = null;
  search.addWidgets([
    {
      init: (options) => {
        theHelper = options.helper;
      },
    },
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
      operator: "or",
      // https://discourse.algolia.com/t/auto-select-facet-values-on-page-load/15819/4
      transformItems(items, { results }) {
        // In order to always show all sources (disjunctively),
        // we initialize currentDs0__sources on initialPageLoad to all sources.
        // FIXME: 1) properly implement disjunctive facets, 2) templating with checkboxes
        // FIXME: operator: "or" seems to have no effect!?
        // FIXME: The following merely confines the options list to the authorized sources.
        // It does not restrict the helper's disjunctiveFacetsRefinements!
        currentDs0__sources = items
          .filter((item) => {
            if (mw.config.get("sources").includes(item.value)) {
              return true;
            }
            return false;
          })
          .map((item) => {
            return item;
          });

        //   // enforceAuthorizedSources(helper);
        return currentDs0__sources;
      },
      // templates: {
      //   item: '<a class="{{cssClasses.link}}" href="{{url}}"><span class="badge ds0__source">{{label}}</span>&nbsp;<span class="badge ms-count">{{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}</span></a>',
      // },
      templates: {
        item(item, { html }) {
          const { url, label, count, isRefined } = item;
          console.log(isRefined);
          const a = '<a href="' + url + '">' + label + " (" + count + ")</a>";
          if (isRefined) {
            return (
              a +
              " <span class='dsHint'>Click again to return to all sources&hellip;</span>"
            );
          }
          return a;
        },
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
    // FIXME: ${DataspectsHelpers.currentDeFactoWgServer()}/wiki/ by variable
    instantsearch.widgets.infiniteHits({
      container: "#hits",
      transformItems(items, { results }) {
        console.log(
          "currentContext.searchFacetName in transformItems: " +
            currentContext.searchFacetName
        );
        var theItems = [];
        /**
         * >>> Handle currentContext.searchFacetName
         */
        if (currentContext.searchFacetName != false) {
          //FIXME: VERY UGLY!!!!
          /**
           * If the hit matches:
           *                                "hit": {
           *                                   "ds0__source": "dataspectsSystem",
           *                                   "eppo0__hasEntityType": "DataspectsSearchFacet"
           *                                 }
           * then we want to consider a
           * a special search result class and prepend it to the hits as a pseudo-hit.
           */
          for (const key in Object.keys(profiles)) {
            if (
              profiles[key].hit.eppo0__hasEntityTitle ==
              currentContext.searchFacetName
            ) {
              theItems.push({
                id: "dataspectsSpecialID",
                ds0__source: "dataspectsSystem",
                eppo0__hasEntityType: "DataspectsSearchFacet",
                eppo0__hasEntityTitle: currentContext.searchFacetName,
              });
            }
          }
        }
        /**
         * <<< Handle currentContext.searchFacetName
         */
        theItems.push(
          ...items.map((item, index) => {
            return {
              ...item,
              position: { index, page: results.page },
            };
          })
        );
        return theItems;
      },
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
          console.log(
            "currentContext.searchFacetName in templates: " +
              currentContext.searchFacetName
          );
          var srm = new SearchResultMatcher(
            hit,
            currentContext,
            instantsearch,
            dsMWAPI,
            mwapi
          );
          console.info(
            "Returning " + hit.name + " using " + srm.searchResultClassName
          );
          if (
            hit.eppo0__hasEntityType == "DataspectsSearchFacet" &&
            srm.searchResultClassName == "SearchResult"
          ) {
            console.log("me");
          }
          return srm.searchResult();
        },
        empty:
          "No results for <q>{{ query }}</q> or no results for your authorization level.",
      },
    }),
  ]);
  search.start();

  $('[data-cy="saveCurrentFacetButton"]').click(function (e) {
    e.preventDefault();
    searchFacets.placeSearchFacetFormHTML("dropzone0");
    $('[data-cy="saveSearchFacetFormHTML"]').on("submit", (e) => {
      e.preventDefault();
      const payload = {
        searchFacetName: $('[data-cy="saveSearchFacetFormHTMLName"]').val(),
        currentHelper: window.localStorage.getItem("currentContext"),
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
        })
        .fail(function (response) {
          console.error(response);
        });
    });
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
}

function handleSpecialDataspectsBackstage() {
  dsMWAPI.numberOfNodes("#numberOfNeo4jNodes");
  dsMWAPI.releaseTimestampXago();
  dsMWAPI.firstXCharacters(20, "name");

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

// const onPageLoadComplete = () => {
//   if (getUrlParameter("intro")) {
//     $("#intro").html(getUrlParameter("intro"));
//   }
//   $("#facetingMenus").click();
// };
