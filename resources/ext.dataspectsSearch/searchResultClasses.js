const { DataspectsHelpers } = require("./helpers.js");
MediaWikiSearchResult = class extends SearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
  }

  resultIcon = () => {
    return (
      "<img class='resultIcon' src='" +
      DataspectsHelpers.currentDeFactoWgServer() +
      "/w/images/a/a9/Mediawikilogo.png'>"
    );
  };

  searchResultBody = () => {
    return (
      "<div>" +
      this.ds0__contentText() +
      "</div>" +
      // this.mw0__attachment(instantsearch) +
      this.annotations() +
      this.parsedPageTextFieldset() +
      "<script>" +
      this.parsedPageText() +
      +"</script>"
    );
  };

  // LEX230108165801
  parsedPageText = () => {
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

MediaWikiFileSearchResult = class extends MediaWikiSearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
    this.typesHavingViewer = ["image/png"];
  }

  searchResultBody = () => {
    return (
      "<div>" +
      this.ds0__contentText() +
      "</div>" +
      this.ds0__attachments() +
      this.annotations() +
      this.parsedPageTextFieldset() +
      "<script>" +
      this.parsedPageText() +
      +"</script>"
    );
  };

  ds0__attachments = () => {
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
              this.instantsearch.snippet({
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

MediaWikiMetaPageSearchResult = class extends MediaWikiSearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
  }

  ds0__contentText = () => {
    // LEX230108161800
    this.dsMWAPI.testGraph(this.hit.eppo0__hasEntityURL);
    return (
      "<div id='" +
      this.hit.eppo0__hasEntityURL +
      "' class='visjsGraph'></div>" +
      "<pre>" +
      this.instantsearch.snippet({
        attribute: "ds0__contentSource",
        highlightedTagName: "mark",
        hit: this.hit,
      }) +
      "</pre>"
    );
  };
};

ElementSearchResult = class extends SearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
  }

  searchResultHeader = () => {
    return (
      this.resultIcon() +
      this.eppo0__hasEntityType() +
      this.eppo0__hasEntityTitle()
    );
  };

  searchResultBody = () => {
    return (
      "&rarr; " +
      this.createMetaPageLink() +
      "<div>" +
      this.eppo0__hasEntityURL() +
      "<div>" +
      this.ds0__contentText() +
      "</div>" +
      // this.mw0__attachment(instantsearch) +
      this.annotations()
    );
  };

  resultIcon = () => {
    return (
      "<img class='resultIcon' src='" +
      DataspectsHelpers.currentDeFactoWgServer() +
      "/w/images/5/5c/Elementlogo.png'>"
    );
  };

  eppo0__hasEntityTitle = () => {
    var iss = this.instantsearch.snippet({
      attribute: "eppo0__hasEntityTitle",
      highlightedTagName: "mark",
      hit: this.hit,
    });
    if (this.hit.eppo0__hasEntityURL) {
      // FIXME: Image resource link
      return (
        '<a href="' +
        this.hit.eppo0__hasEntityURL +
        '" class="eppo0__hasEntityTitle">' +
        iss +
        "</a>"
      );
    }
    return '<span class="eppo0__hasEntityTitle">' + iss + "</span>";
  };

  // ds0__contentText = () => {
  //   // FIXME: highlight but don't snippet! (https://www.algolia.com/doc/api-reference/widgets/highlight/js/)
  //   return this.hit.ds0__contentText;
  // };

  createMetaPageLink = () => {
    //#IndexConfigSetting
    var eppo0__hasEntityTitle = "Topic";
    var args = {
      "eppo0:hasEntityTitle": this.hit.eppo0__hasEntityTitle,
      "eppo0:hasEntityBlurb": this.hit.ds0__contentText.replaceAll(
        "'",
        "&#39;"
      ), // FIXME
    };
    var backlink =
      "Annotation[1][AnnotationPredicate]=ds0:copiedFromElementMessage&Annotation[1][AnnotationObject]=" +
      this.hit.name;

    return (
      "<a href='" +
      DataspectsHelpers.currentDeFactoWgServer() +
      "/wiki/Special:FormEdit/" +
      eppo0__hasEntityTitle +
      "?" +
      Object.keys(args)
        .map((key) => {
          return encodeURI(
            eppo0__hasEntityTitle + "[" + key + "]" + "=" + args[key]
          );
        })
        .join("&") +
      "&" +
      backlink +
      "'>Create a meta page for this</a> on <img class='resultIcon' src='" +
      DataspectsHelpers.currentDeFactoWgServer() +
      "/w/images/a/a9/Mediawikilogo.png'>"
    );
  };

  objectText = (annotation) => {
    if (annotation.predicate == "ds77__isReplyTo") {
      return (
        "<img class='resultIcon' src='" +
        DataspectsHelpers.currentDeFactoWgServer() +
        "/w/images/5/5c/Elementlogo.png'>&nbsp;<a href='" +
        annotation.objectText +
        "'>" +
        annotation.objectText +
        "</a>"
      );
    }
    return annotation.objectText;
  };
};

module.exports = {
  MediaWikiSearchResult,
  MediaWikiFileSearchResult,
  MediaWikiMetaPageSearchResult,
  ElementSearchResult,
};
