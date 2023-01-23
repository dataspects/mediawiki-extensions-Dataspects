SMWCindyKateSearchResult = class extends MediaWikiSearchResult {
  constructor(error, info, hit, currentContext, instantsearch, n4j, mwapi) {
    super(error, info, hit, currentContext, instantsearch, n4j, mwapi);
  }
};

module.exports = { SMWCindyKateSearchResult };
