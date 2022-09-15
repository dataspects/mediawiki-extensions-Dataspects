const { SearchResult } = require("../searchResult.js");

MediaWikiSource = class extends SearchResult {
  constructor(hit) {
    super(hit);
  }

  ds0__text = (instantsearch) => {
    if (
      ["Template", "Form", "Module", "Concept"].includes(
        this.hit.mw0__namespace
      )
    ) {
      return (
        "<pre>" +
        instantsearch.snippet({
          attribute: "mw0__wikitext",
          highlightedTagName: "mark",
          hit: this.hit,
        }) +
        "</pre>"
      );
    }
    return instantsearch.snippet({
      attribute: "ds0__text",
      highlightedTagName: "mark",
      hit: this.hit,
    });
  };
};

module.exports = { MediaWikiSource };
