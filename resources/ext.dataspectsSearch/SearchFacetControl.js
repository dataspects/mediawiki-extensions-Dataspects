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
      this.#activate() +
      " " +
      this.#replace() +
      " " +
      this.#remove() +
      " " +
      this.#link() +
      "</div>"
    );
  };

  highlightedHtml = () => {
    const html =
      '<div data-cy="searchFacetControl" class="searchFacetControl">' +
      this.#name(true) +
      "</div>";
    console.log(html);
    return html;
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
    if (this.searchFacet.matches.length > 0) {
      const re = new RegExp(
        "(" + this.searchFacet.matches.join("|") + ")",
        "g"
      );
      str = str.replaceAll(re, "<mark>$1</mark>");
    }
    console.log(str);
    return str;
  };

  #activate = () => {
    return (
      "<a searchfacetname='" +
      this.searchFacet.name +
      "' href='#' title='Activate' searchFacetAction='activate' class='searchFacetAction'>activate</a>"
    );
  };

  #remove = () => {
    return (
      "<a searchfacetname='" +
      this.searchFacet.name +
      "' href='#' title='Remove' searchFacetAction='delete' class='searchFacetAction'>remove</a>"
    );
  };

  #replace = () => {
    return (
      "<a searchfacetname='" +
      this.searchFacet.name +
      "' href='#' title='Replace' searchFacetAction='replace' class='searchFacetAction'>replace</a>"
    );
  };
  #link = () => {
    return (
      "<a href='" +
      mw.config.get("wgServer") +
      "/wiki/Special:Dataspects?f=" +
      encodeURIComponent(this.searchFacet.name) +
      "' title='Load this facet as a bookmarkable link' class='searchFacetAction'>link</a>"
    );
  };
};

module.exports = { SearchFacetControl };
