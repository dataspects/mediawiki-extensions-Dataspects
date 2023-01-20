SearchFacets = class {
  constructor(mwapi) {
    this.mwapi = mwapi;
  }

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
      "' href='#' title='' data-cy='" +
      id +
      "_activate' class='itemAction'>activate</a>";
    const remove =
      "<a searchfacetid='" +
      sf.id +
      "' href='#' title='' data-cy='" +
      id +
      "_remove' class='itemAction'>remove</a>";
    const replace =
      "<a searchfacetid='" +
      sf.id +
      "' href='#' title='' data-cy='" +
      id +
      "_replace' class='itemAction'>replace</a>";
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
      this.mwapi
        .get({
          action: "dataspectsapi",
          querytype: "deletesearchfacet",
          searchfacetid: sfID,
        })
        .done((response) => {
          console.log(response.data);
        })
        .fail((response) => {
          console.error(response);
        });
    });
  };
};

module.exports = { SearchFacets };