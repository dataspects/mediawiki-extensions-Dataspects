SearchFacetControl = class {
  constructor(searchFacet) {
    this.searchFacet = searchFacet;
  }

  html = () => {
    return (
      '<div data-cy="searchFacetControl" class="searchFacetControl">' +
      this.#name() +
      "</div>"
    );
  };

  #name = () => {
    return (
      '<div data-cy="searchFacetControlName" class="searchFacetControlName">' +
      this.#mark(this.searchFacet.name) +
      "</div>"
    );
  };

  #mark = (str) => {
    const re = new RegExp("(" + this.searchFacet.matches.join("|") + ")", "g");
    str = str.replaceAll(re, "<mark>$1</mark>");
    return str;
  };
};

module.exports = { SearchFacetControl };
