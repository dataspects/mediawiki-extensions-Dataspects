SMWCindyKateSearchResult = class extends MediaWikiSearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
  }
};

module.exports = { SMWCindyKateSearchResult };
