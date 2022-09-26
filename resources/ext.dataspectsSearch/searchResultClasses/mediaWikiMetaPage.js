MediaWikiMetaPageSearchResult = class extends MediaWikiSearchResult {
  constructor(hit) {
    super(hit);
  }

  ds0__text = (instantsearch) => {
    return (
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
