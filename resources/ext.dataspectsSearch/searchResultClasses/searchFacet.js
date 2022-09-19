SearchFacetSearchResult = class extends MediaWikiSearchResult {
  constructor(hit) {
    super(hit);
  }

  searchResult = (hit, error, instantsearch) => {
    return (
      '<div class="hit">' +
      (error.message ? error.message : "") +
      "<div>" +
      this.resultIcon() +
      this.eppo0__hasEntityType() +
      this.eppo0__hasEntityTitle() +
      this.eppo0__categories() +
      this.mw0__namespace() +
      "</div>" +
      this.mw0__rawUrl() +
      "<div>" +
      this.activateLink() +
      this.ds0__text(instantsearch) +
      "</div>" +
      this.mw0__attachment(instantsearch) +
      this.annotations() +
      this.parsedPageTextFieldset() +
      "<script>" +
      this.parsedPageText(hit) +
      +"</script></div>"
    );
  };

  activateLink = () => {
    return (
      "<a href='" +
      mw.config.get("wgServer") +
      "/wiki/Special:DataspectsSearch?helper=" +
      this.annotationByPredicate("Ds0:instantsearchHelper") +
      "' style='display:block;'>Activate this search facet</a>"
    );
  };

  eppo0__hasEntityTitle = () => {
    var iss = instantsearch.snippet({
      attribute: "eppo0__hasEntityTitle",
      highlightedTagName: "mark",
      hit: this.hit,
    });
    if (this.hit.mw0__rawUrl) {
      return (
        '<a href="' +
        this.hit.mw0__rawUrl +
        '" class="eppo0__hasEntityTitle" style="background-color:#CCFFCC;">' +
        iss +
        "</a>"
      );
    }
    return (
      '<span class="eppo0__hasEntityTitle" style="background-color:#CCFFCC;">' +
      iss +
      "</span>"
    );
  };
};

module.exports = { SearchFacetSearchResult };
