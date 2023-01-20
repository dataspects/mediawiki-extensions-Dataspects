SearchFacets = class {
  constructor(mwapi) {
    this.mwapi = mwapi;
  }

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
      "<a href='#' title='" +
      JSON.stringify(sf.ds0__instantsearchHelper, null, 2) +
      "'  data-cy='" +
      id +
      "' class='itemName'>" +
      sf.name +
      "</a>";
    const activate =
      "<a href='#' title='' data-cy='" +
      id +
      "_activate' class='itemAction'>activate</a>";
    const remove =
      "<a href='#' title='' data-cy='" +
      id +
      "_remove' class='itemAction'>remove</a>";
    const replace =
      "<a href='#' title='' data-cy='" +
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
      const dataCy = event.target.attributes["data-cy"].value;
      console.log(dataCy);
    });
  };
};

module.exports = { SearchFacets };
