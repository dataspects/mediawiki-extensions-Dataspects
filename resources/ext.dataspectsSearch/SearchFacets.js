const { SearchFacetControl } = require("./SearchFacetControl.js");

SearchFacets = class {
  constructor(mwapi, search) {
    this.mwapi = mwapi;
    this.search = search;
  }

  typeahead = (query) => {
    $("#searchFacetControls").html(
      '<div class="pulsate">Loading search facets&hellip;</div>'
    );
    this.mwapi
      .get({
        action: "dataspectsapi",
        querytype: "typeaheadsearchfacets",
        querystring: query,
      })
      .done((response) => {
        $("#searchFacetControls").html(
          response.data.status === 0
            ? response.data.matches.map((sf) => {
                return new SearchFacetControl(sf).highlightedHtml();
              })
            : response.data.status
        );
        this.#eventHandlers();
      })
      .fail((response) => {
        $("#searchFacetControls").html(
          '<div class="pulsate">Failed to load search facets.</div>'
        );
        console.error(response);
      });
  };

  placeSearchFacetFormHTML = (dropzone) => {
    $('[data-cy="' + dropzone + '"]').html(
      '<form data-cy="saveSearchFacetFormHTML" action="#"><fieldset><legend>Save current search facet</legend>Name: <input type="text" data-cy="saveSearchFacetFormHTMLName"><span data-cy="savesearchfacet_result"></span><br/><button type="submit" data-cy="saveSearchFacetFormHTMLSave">Save</button></fieldset></form>'
    );
  };

  showSavedSearchFacetsList = () => {
    this.mwapi
      .get({
        action: "dataspectsapi",
        querytype: "getsearchfacets",
      })
      .done((response) => {
        const sfs = response.data.searchfacets
          .map((sf) => {
            return (
              "<li class='savedSearchFacet'>" +
              new SearchFacetControl(sf).html() +
              "</li>"
            );
          })
          .join("");
        $('[data-cy="savedSearchFacetsList"]').html(
          "<ul data-cy='savedSearchFacetsUL'>" + sfs + "</ul>"
        );
        this.#eventHandlers();
      })
      .fail(function (response) {
        console.error(response);
      });
  };

  #eventHandlers = () => {
    return $("a.searchFacetAction").click((event) => {
      const searchFacetAction =
        event.target.attributes["searchFacetAction"].value;
      this.mwapi
        .get({
          action: "dataspectsapi",
          querytype: searchFacetAction + "searchfacet",
          searchfacetname: event.target.attributes["searchfacetname"].value,
        })
        .done((response) => {
          if (searchFacetAction === "activate") {
            console.log(
              "Activate " + event.target.attributes["searchfacetname"].value
            );
            var myhelper = {
              environment: { user: "Lex" },
              meilisearchHelper: {
                client: {},
                state: {
                  facets: [],
                  disjunctiveFacets: ["ds0__source", "ds0__sourceNamespace"],
                  hierarchicalFacets: [
                    {
                      name: "eppo0__hasEntityType.1v10",
                      attributes: [
                        "eppo0__hasEntityType.1v10",
                        "eppo0__hasEntityType.1v11",
                        "eppo0__hasEntityType.1v12",
                      ],
                      separator: " > ",
                      rootPath: null,
                      showParentLevel: true,
                    },
                    {
                      name: "ck0__containsCognitiveKeyword.1v10",
                      attributes: [
                        "ck0__containsCognitiveKeyword.1v10",
                        "ck0__containsCognitiveKeyword.1v11",
                      ],
                      separator: " > ",
                      rootPath: null,
                      showParentLevel: true,
                    },
                    {
                      name: "ds0__featuresAction.1v10",
                      attributes: [
                        "ds0__featuresAction.1v10",
                        "ds0__featuresAction.1v11",
                      ],
                      separator: " > ",
                      rootPath: null,
                      showParentLevel: true,
                    },
                    {
                      name: "ds0__specialAspect.1v10",
                      attributes: [
                        "ds0__specialAspect.1v10",
                        "ds0__specialAspect.1v11",
                      ],
                      separator: " > ",
                      rootPath: null,
                      showParentLevel: true,
                    },
                    {
                      name: "ds0__allPredicates.1v10",
                      attributes: [
                        "ds0__allPredicates.1v10",
                        "ds0__allPredicates.1v11",
                        "ds0__allPredicates.1v12",
                      ],
                      separator: " > ",
                      rootPath: null,
                      showParentLevel: true,
                    },
                  ],
                  facetsRefinements: {},
                  facetsExcludes: {},
                  disjunctiveFacetsRefinements: {
                    ds0__sourceNamespace: [],
                    ds0__source: [
                      "https://mwstake.org/mwstake/wiki/",
                      "Element",
                      "https://smw-cindykate.com/wiki/",
                      "https://wiki.dataspects.com/wiki/",
                      "Code",
                      "https://www.mediawiki.org/wiki/",
                    ],
                  },
                  numericRefinements: {},
                  tagRefinements: [],
                  hierarchicalFacetsRefinements: {
                    "eppo0__hasEntityType.1v10": [],
                    "ck0__containsCognitiveKeyword.1v10": [],
                    "ds0__featuresAction.1v10": [],
                    "ds0__specialAspect.1v10": [],
                    "ds0__allPredicates.1v10": [],
                  },
                  index: "mwstakeorg",
                  attributesToSnippet: [
                    "eppo0__hasEntityTitle",
                    "ds0__contentText:100",
                  ],
                  hitsPerPage: 5,
                  query: "clone",
                  maxValuesPerFacet: 1000,
                  highlightPreTag: "__ais-highlight__",
                  highlightPostTag: "__/ais-highlight__",
                  page: 0,
                },
                lastResults: null,
                _queryId: 1,
                _lastQueryIdReceived: -1,
                derivedHelpers: [],
                _currentNbQueries: 1,
                _events: {},
              },
            };
            this.search.helper.setState(myhelper.meilisearchHelper.state);
            this.search.helper.search();
          }
        })
        .fail((response) => {
          console.error(response);
        });
    });
  };
};

module.exports = { SearchFacets };
