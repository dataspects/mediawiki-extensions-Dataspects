MediaWikiFileSearchResult = class extends MediaWikiSearchResult {
  constructor(hit, n4j) {
    super(hit, n4j);
  }

  searchResultBody = (hit, instantsearch) => {
    return (
      "<div>" +
      this.ds0__text(instantsearch) +
      "</div>" +
      this.mw0__attachments(hit, instantsearch) +
      this.annotations() +
      this.parsedPageTextFieldset() +
      "<script>" +
      this.parsedPageText(hit) +
      +"</script>"
    );
  };

  mw0__attachments = (hit, instantsearch) => {
    //FIXME: handle non-image displays
    if (this.hit.mw0__attachments) {
      return this.hit.mw0__attachments.map((attachment) => {
        return (
          "<fieldset><legend>" +
          attachment.type +
          "</legend>" +
          '<table class="mw0__attachment"><tr><td><a href="' +
          this.hit.mw0__rawUrl +
          '"><img src="' +
          this.myURLEncode(attachment.thumbURL + "/120px-" + this.hit.name) +
          '"></a></td><td><div class="mw0__attachmentsText">' +
          instantsearch.snippet({
            attribute: "mw0__attachment.text",
            highlightedTagName: "mark",
            hit: this.hit,
          }) +
          "</div></td></tr></table></fieldset>"
        );
      });
    }
    return "AA";
  };
};

module.exports = { MediaWikiFileSearchResult };
