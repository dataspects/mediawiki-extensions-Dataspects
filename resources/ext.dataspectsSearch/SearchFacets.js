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
      .done(function (response) {
        const sfs = response.data.searchfacets
          .map((sf) => {
            return (
              "<li><a href='#' title='" +
              JSON.stringify(sf.ds0__instantsearchHelper, null, 2) +
              "' class='savedSearchFacet' data-cy='savedSearchFacet" +
              sf.id +
              "'>" +
              sf.name +
              "</a></li>"
            );
          })
          .join("");
        $('[data-cy="savedSearchFacetsList"]').html(
          "<ul data-cy='savedSearchFacetsUL'>" + sfs + "</ul>"
        );
      })
      .fail(function (response) {
        console.error(response);
      });
  };
};

module.exports = { SearchFacets };
