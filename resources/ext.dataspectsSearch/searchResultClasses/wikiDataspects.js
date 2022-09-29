WikiDataspectsSearchResult = class extends MediaWikiSearchResult {
  constructor(hit) {
    super(hit);
  }

  eppo0__hasEntityTitle = () => {
    // FIXME: snippet in dynamic nested field
    return (
      '<span class="eppo0__hasEntityTitle"><a href="' +
      this.hit.mw0__rawUrl +
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

module.exports = { WikiDataspectsSearchResult };
