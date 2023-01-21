SearchFacetControl = class {
  constructor(searchFacet) {
    this.searchFacet = searchFacet;
  }

  html = () => {
    return '<span data-cy="searchFacetControl">' + this.#name() + "</span>";
  };

  #name = () => {
    return (
      '<span data-cy="searchFacetControlName">' +
      this.#mark(this.searchFacet.name) +
      "</span>"
    );
  };

  #mark = (str) => {
    const re = new RegExp("(" + this.searchFacet.matches.join("|") + ")", "g");
    console.log(re);
    str = str.replaceAll(re, "<mark>$1</mark>");
    console.log(str);
    return str;
  };
};

module.exports = { SearchFacetControl };
