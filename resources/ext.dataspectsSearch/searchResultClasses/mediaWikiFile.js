MediaWikiFileSearchResult = class extends MediaWikiSearchResult {
  constructor(hit, n4j) {
    super(hit, n4j);
  }

  ds0__text = (instantsearch) => {
    return "<pre>" + this.hit.mw0__attachment + "</pre>";
  };
};

module.exports = { MediaWikiFileSearchResult };
