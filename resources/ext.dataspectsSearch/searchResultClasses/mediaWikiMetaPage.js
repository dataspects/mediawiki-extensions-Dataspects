MediaWikiMetaPageSearchResult = class extends MediaWikiSearchResult {
  constructor(hit) {
    super(hit);
  }

  ds0__text = (instantsearch) => {
    window.n4j.testGraph(this.hit.mw0__rawUrl);
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
