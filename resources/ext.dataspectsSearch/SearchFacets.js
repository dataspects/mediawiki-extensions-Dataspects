const { SearchFacetControl } = require("./SearchFacetControl.js");

SearchFacets = class {
  constructor(mwapi) {
    this.mwapi = mwapi;
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
        console.log(response);
        $("#searchFacetControls").html(
          response.data.status === 0
            ? response.data.matches.map((sf) => {
                return new SearchFacetControl(sf).html();
              })
            : response.data.status
        );
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
        console.log(response.data);
        const sfs = response.data.searchfacets
          .map((sf) => {
            return this.#listItem(sf);
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

  #listItem = (sf) => {
    const id = "savedSearchFacet" + sf.id;
    const link =
      "<a searchfacetid='" +
      sf.id +
      "' href='#' title='" +
      JSON.stringify(sf.ds0__instantsearchHelper, null, 2) +
      "'  data-cy='" +
      id +
      "' class='itemName'>" +
      sf.name +
      "</a>";
    const activate =
      "<a searchfacetid='" +
      sf.id +
      "' href='#' title='' itemaction='activate' class='itemAction'>activate</a>";
    const remove =
      "<a searchfacetid='" +
      sf.id +
      "' href='#' title='' itemaction='delete' class='itemAction'>remove</a>";
    const replace =
      "<a searchfacetid='" +
      sf.id +
      "' href='#' title='' itemaction='replace' class='itemAction'>replace</a>";
    return (
      "<li class='savedSearchFacet'>" +
      link +
      " " +
      activate +
      " " +
      replace +
      " " +
      remove +
      "</li>"
    );
  };

  #eventHandlers = () => {
    return $("li.savedSearchFacet a.itemAction").click((event) => {
      const sfID = event.target.attributes["searchfacetid"].value;
      const itemAction = event.target.attributes["itemaction"].value;
      this.mwapi
        .get({
          action: "dataspectsapi",
          querytype: itemAction + "searchfacet",
          searchfacetid: sfID,
        })
        .done((response) => {
          console.log(response.data);
          this.showSavedSearchFacetsList();
        })
        .fail((response) => {
          console.error(response);
        });
    });
  };
};

module.exports = { SearchFacets };
