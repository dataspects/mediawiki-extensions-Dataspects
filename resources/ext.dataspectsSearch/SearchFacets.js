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
    $("a.searchFacetAction").unbind();
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
              "Activate " +
                event.target.attributes["searchfacetname"].value +
                "..."
            );
            this.search.helper.setState(
              response.data.searchfacets[0].ds0__instantsearchHelper
                .meilisearchHelper.state
            );
            // Update currentContext in localStorage
            var currentContext = JSON.parse(
              window.localStorage.getItem("currentContext")
            );
            currentContext.searchFacetName = response.data.searchfacets[0].name;
            window.localStorage.setItem(
              "currentContext",
              JSON.stringify(currentContext)
            );
            //
            this.search.helper.search();
            console.log(
              "Activated " +
                event.target.attributes["searchfacetname"].value +
                "."
            );
          }
        })
        .fail((response) => {
          console.error(response);
        });
    });
  };
};

module.exports = { SearchFacets };
