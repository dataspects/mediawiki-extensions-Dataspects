WikiDataspectsSource = class extends MediaWikiSource {
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
};

module.exports = { WikiDataspectsSource };
