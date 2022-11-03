MediaWikiSearchResult = class extends SearchResult {
  constructor(hit, n4j) {
    super(hit, n4j);
  }

  resultIcon = (hit) => {
    return (
      "<img class='resultIcon' src='" +
      mw.config.get("wgServer") +
      "/w/images/a/a9/Mediawikilogo.png'>"
    );
  };

  searchResultBody = (hit, instantsearch) => {
    return (
      "<div>" +
      this.ds0__text(instantsearch) +
      "</div>" +
      // this.mw0__attachment(instantsearch) +
      this.annotations() +
      this.parsedPageTextFieldset() +
      "<script>" +
      this.parsedPageText(hit) +
      +"</script>"
    );
  };

  parsedPageText = (hit) => {
    if ("mw0__apiParseTextURL" in hit && hit.mw0__apiParseTextURL != "") {
      this.api
        .get({
          action: "dataspectsapi",
          querytype: "originalpagecontent",
          mw0__apiParseTextURL: hit.mw0__apiParseTextURL,
        })
        .done(function (data) {
          $("#" + hit.id).html(data.data.originalpagecontent);
        });
    } else {
      $("#" + hit.id).html(
        "<p>SORRY: mw0__apiParseTextURL is not defined for this entity.</p>"
      );
      console.debug(
        "mw0__apiParseTextURL is not defined for " + hit.mw0__rawUrl
      );
    }
  };

  parsedPageTextFieldset = () => {
    return (
      '<fieldset id="' +
      this.hit.id +
      '_fieldset" class="parsedPageText"><legend><i>This is the original page content</i></legend><div id="' +
      this.hit.id +
      '">Loading...</div></fieldset>'
    );
  };
};

module.exports = { MediaWikiSearchResult };
