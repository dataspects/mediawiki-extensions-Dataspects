MediaWikiSearchResult = class extends SearchResult {
  constructor(error, info, hit, currentContext, instantsearch, n4j, mwapi) {
    super(error, info, hit, currentContext, instantsearch, n4j, mwapi);
  }

  resultIcon = (hit) => {
    return (
      "<img class='resultIcon' src='" +
      currentDeFactoWgServer() +
      "/w/images/a/a9/Mediawikilogo.png'>"
    );
  };

  searchResultBody = (hit, instantsearch) => {
    return (
      "<div>" +
      this.ds0__contentText(instantsearch) +
      "</div>" +
      // this.mw0__attachment(instantsearch) +
      this.annotations() +
      this.parsedPageTextFieldset() +
      "<script>" +
      this.parsedPageText(hit) +
      +"</script>"
    );
  };

  // LEX230108165801
  parsedPageText = (hit) => {
    // FIXME: This must be run only when opening "Show original page contents"
    // if ("ds0__sourceParseTextURL" in hit && hit.ds0__sourceParseTextURL != "") {
    //   this.api
    //     .get({
    //       action: "dataspectsapi",
    //       querytype: "originalpagecontent",
    //       ds0__sourceParseTextURL: hit.ds0__sourceParseTextURL,
    //     })
    //     .done(function (data) {
    //       $("#" + hit.id).html(data.data.originalpagecontent);
    //     });
    // } else {
    //   $("#" + hit.id).html(
    //     "<p>SORRY: ds0__sourceParseTextURL is not defined for this entity.</p>"
    //   );
    //   console.debug(
    //     "ds0__sourceParseTextURL is not defined for " + hit.eppo0__hasEntityURL
    //   );
    // }
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
