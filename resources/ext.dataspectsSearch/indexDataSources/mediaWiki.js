const { SearchResult } = require("../searchResult.js");

MediaWikiSource = class extends SearchResult {
  constructor(hit) {
    super(hit);
  }
};

module.exports = { MediaWikiSource };
