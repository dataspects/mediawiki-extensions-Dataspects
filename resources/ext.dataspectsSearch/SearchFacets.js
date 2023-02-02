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
      '<form data-cy="saveSearchFacetFormHTML" action="#"><fieldset><legend>Save current search facet</legend>Name: <input type="text" data-cy="saveSearchFacetFormHTMLName"><br/>Comment: <input type="text" data-cy="saveSearchFacetFormHTMLComment"><br/><span data-cy="savesearchfacet_message" class="dsHint"></span><br/><button type="submit" data-cy="saveSearchFacetFormHTMLSave" style="margin-top:10px;">Save</button></fieldset></form>'
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
    $("a.searchfacetaction").unbind();
    return $("a.searchfacetaction").click((event) => {
      var currentNode = event.target;
      if (event.target.className === "searchFacetNameMarker") {
        currentNode = event.target.parentNode;
      }
      const re = new RegExp("[A-Za-z0-9]+__[A-Za-z0-9]+");
      if (re.test(currentNode.attributes["searchfacetname"].value)) {
        this.#handlePredicate(currentNode);
      } else {
        this.#handleSearchFacet(currentNode);
      }
    });
  };

  #handleSearchFacet = (currentNode) => {
    const searchfacetaction = currentNode.attributes["searchfacetaction"].value;
    this.mwapi
      .get({
        action: "dataspectsapi",
        querytype: searchfacetaction + "searchfacet",
        searchfacetname: currentNode.attributes["searchfacetname"].value,
      })
      .done((response) => {
        if (searchfacetaction === "activate") {
          console.log(
            "meilisearchHelper: Registering activation of " +
              response.data.searchfacets[0].name +
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
          console.log("Activated " + currentContext.searchFacetName + ".");
        }
        $(currentNode).siblings("sup").html(response.data.status);
      })
      .fail((response) => {
        console.error(response);
      });
  };

  #handlePredicate = (currentNode) => {
    var currentState = this.search.helper.state;
    currentState.query = "";
    const value =
      "All Predicates > " + currentNode.attributes["searchfacetname"].value;
    if (
      !currentState.hierarchicalFacetsRefinements[
        "ds0__allPredicates.1v10"
      ].includes(value)
    ) {
      currentState.hierarchicalFacetsRefinements[
        "ds0__allPredicates.1v10"
      ].push(value);
    }
    this.search.helper.setState(currentState);
    console.log(JSON.stringify(this.search.helper.state, null, 2));
    this.search.helper.search();
  };
};

module.exports = { SearchFacets };
