MediaWikiMetaPageSearchResult = class extends MediaWikiSearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
  }

  ds0__contentText = (instantsearch) => {
    // LEX230108161800
    this.dsMWAPI.testGraph(this.hit.eppo0__hasEntityURL);
    return (
      "<div id='" +
      this.hit.eppo0__hasEntityURL +
      "' class='visjsGraph'></div>" +
      "<pre>" +
      instantsearch.snippet({
        attribute: "ds0__contentSource",
        highlightedTagName: "mark",
        hit: this.hit,
      }) +
      "</pre>"
    );
  };
};

module.exports = { MediaWikiMetaPageSearchResult };
