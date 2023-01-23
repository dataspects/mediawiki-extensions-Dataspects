SearchFacetSearchResult = class extends MediaWikiSearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
  }

  searchResultHeader = () => {
    return (
      "<table><tr><td>" +
      this.resultIcon() +
      "</td><td>" +
      this.eppo0__hasEntityType() +
      this.eppo0__hasEntityTitle() +
      this.eppo0__categories() +
      this.ds0__sourceNamespace() +
      "</td></tr><tr><td></td><td>" +
      this.eppo0__hasEntityURL() +
      this.eppo0__hasEntityBlurb() +
      this.activateLink() +
      "</td></tr></table>"
    );
  };

  searchResultBody = () => {
    return (
      this.ds0__contentText() +
      // this.mw0__attachment(instantsearch) +
      this.annotations() +
      this.parsedPageTextFieldset() +
      "<script>" +
      this.parsedPageText() +
      +"</script>"
    );
  };

  activateLink = () => {
    return (
      "<a href='" +
      mw.config.get("wgServer") +
      "/wiki/Special:Dataspects?helper=" +
      this.annotationByPredicate("Ds0:instantsearchHelper") +
      "' style='display:block;'>Activate this search facet</a>"
    );
  };

  eppo0__hasEntityTitle = () => {
    var iss = this.instantsearch.snippet({
      attribute: "eppo0__hasEntityTitle",
      highlightedTagName: "mark",
      hit: this.hit,
    });
    if (this.hit.eppo0__hasEntityURL) {
      return (
        '<a href="' +
        this.hit.eppo0__hasEntityURL +
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
