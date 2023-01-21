SearchFacetControl = class {
  constructor(searchFacet) {
    this.searchFacet = searchFacet;
    // this.searchFacet.ds0__instantsearchHelper
  }

  html = () => {
    return (
      '<div data-cy="searchFacetControl" class="searchFacetControl">' +
      this.#name(false) +
      " " +
      this.#activateLink() +
      " " +
      this.#replaceLink() +
      " " +
      this.#removeLink() +
      "</div>"
    );
  };

  highlightedHtml = () => {
    return (
      '<div data-cy="searchFacetControl" class="searchFacetControl">' +
      this.#name(true) +
      "</div>"
    );
  };

  #name = (highlighted) => {
    var name = this.searchFacet.name;
    if (highlighted) {
      name = this.#mark(this.searchFacet.name);
    }
    return (
      '<a searchfacetname="' +
      this.searchFacet.name +
      '" href="#" data-cy="searchFacetControlName" class="searchFacetControlName searchFacetAction" searchFacetAction="activate" title="Activate">' +
      name +
      "</a>"
    );
  };

  #mark = (str) => {
    const re = new RegExp("(" + this.searchFacet.matches.join("|") + ")", "g");
    str = str.replaceAll(re, "<mark>$1</mark>");
    return str;
  };

  #activateLink = () => {
    return (
      "<a searchfacetname='" +
      this.searchFacet.name +
      "' href='#' title='Activate' searchFacetAction='activate' class='searchFacetAction'>activate</a>"
    );
  };

  #removeLink = () => {
    return (
      "<a searchfacetname='" +
      this.searchFacet.name +
      "' href='#' title='Remove' searchFacetAction='delete' class='searchFacetAction'>remove</a>"
    );
  };

  #replaceLink = () => {
    return (
      "<a searchfacetname='" +
      this.searchFacet.name +
      "' href='#' title='Replace' searchFacetAction='replace' class='searchFacetAction'>replace</a>"
    );
  };
};

module.exports = { SearchFacetControl };
