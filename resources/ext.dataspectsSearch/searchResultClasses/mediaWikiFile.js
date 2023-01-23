MediaWikiFileSearchResult = class extends MediaWikiSearchResult {
  constructor(error, info, hit, currentContext, instantsearch, n4j, mwapi) {
    super(error, info, hit, currentContext, instantsearch, n4j, mwapi);
    this.typesHavingViewer = ["image/png"];
  }

  searchResultBody = (hit, instantsearch) => {
    return (
      "<div>" +
      this.ds0__contentText(instantsearch) +
      "</div>" +
      this.ds0__attachments(hit, instantsearch) +
      this.annotations() +
      this.parsedPageTextFieldset() +
      "<script>" +
      this.parsedPageText(hit) +
      +"</script>"
    );
  };

  ds0__attachments = (hit, instantsearch) => {
    //FIXME: handle non-image displays
    if (this.hit.ds0__attachments) {
      return this.hit.ds0__attachments.map((attachment) => {
        return (
          "<fieldset><legend>" +
          attachment.type +
          "</legend>" +
          (this.typesHavingViewer.includes(attachment.type)
            ? '<table class="mw0__attachment"><tr><td><a href="' +
              this.hit.eppo0__hasEntityURL +
              '"><img src="' +
              this.myURLEncode(
                attachment.thumbURL + "/120px-" + this.hit.name
              ) +
              '"></a></td><td><div class="ds0__attachmentsText">' +
              instantsearch.snippet({
                attribute: "mw0__attachments.text",
                highlightedTagName: "mark",
                hit: this.hit,
              }) +
              "</div></td></tr></table>"
            : "No viewer available") +
          "</fieldset>"
        );
      });
    }
    return "";
  };
};

module.exports = { MediaWikiFileSearchResult };
