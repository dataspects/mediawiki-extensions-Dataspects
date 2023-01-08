MediaWikiMetaPageSearchResult = class extends MediaWikiSearchResult {
  constructor(hit, n4j) {
    super(hit, n4j);
  }

  ds0__text = (instantsearch) => {
    // LEX230108161800
    this.n4j.testGraph(this.hit.mw0__rawUrl);
    return (
      "<div id='" +
      this.hit.mw0__rawUrl +
      "' class='visjsGraph'></div>" +
      "<pre>" +
      instantsearch.snippet({
        attribute: "mw0__wikitext",
        highlightedTagName: "mark",
        hit: this.hit,
      }) +
      "</pre>"
    );
  };
};

module.exports = { MediaWikiMetaPageSearchResult };
