WikiDataspectsResult = class extends MediaWikiSearchResult {
  constructor(error, info, hit, currentContext, instantsearch, n4j, mwapi) {
    super(error, info, hit, currentContext, instantsearch, n4j, mwapi);
  }

  eppo0__hasEntityTitle = () => {
    // FIXME: snippet in dynamic nested field
    return (
      '<span class="eppo0__hasEntityTitle"><a href="' +
      this.hit.eppo0__hasEntityURL +
      '">' +
      this.annotationByPredicate("HasEntityTypeAndEntityTitle") +
      "</a></span>"
    );
  };

  eppo0__hasEntityBlurb = () => {
    return (
      "<div class='eppo0__hasEntityBlurb'>" +
      this.annotationByPredicate("HasEntityBlurb") +
      "</div>"
    );
  };
};

module.exports = { WikiDataspectsResult };
