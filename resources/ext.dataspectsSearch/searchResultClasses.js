const { DataspectsHelpers } = require("./helpers.js");
SearchResult = class {
  /**
   * dsImplementation: how to configure search result design/behaviour/interaction
   * https://wiki.dataspects.com/wiki/C0332407119
   *
   */
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    this.error = error;
    this.info = info;
    this.hit = hit;
    this.currentContext = currentContext;
    this.instantsearch = instantsearch;
    this.dsMWAPI = dsMWAPI;
    this.mwapi = mwapi;
  }

  // THIS METHOD MUST NOT BE OVERWRITTEN BY SUBCLASSES!
  searchResult = () => {
    var isrcss = this.initialSearchResultCSS();
    return (
      isrcss.main + // The all encompassing hit class
      (typeof this.error.message == "string" ? this.error.message : "") +
      (typeof this.info.message == "string" ? this.info.message : "") +
      isrcss.srh + // The header to be shown in compact mode
      this.searchResultHeader() +
      "</div>" +
      isrcss.srb + // The body to be hidden in compact mode
      this.searchResultBody() +
      "</div><script type='text/javascript'>" +
      this.script() +
      "</script></div>"
    );
  };

  initialSearchResultCSS = () => {
    /**
     * dsImplementation: allow for compact search results by get parameter
     * FIXME: this does not check $("#compactList")
     */
    if (this.isCompact) {
      return {
        main: '<div class="compactHit" data-cy="' + this.hit.id + '">',
        srh: "<div class='searchResultHeader'>",
        srb: "<div class='searchResultBody' style='display:none'>",
      };
    }
    return {
      main: '<div class="hit" data-cy="' + this.hit.id + '">',
      srh: "<div class='searchResultHeader'>",
      srb: "<div class='searchResultBody' style='display:block'>",
    };
  };

  searchResultHeader = () => {
    return (
      "<table><tr><td>" +
      this.resultIcon() +
      "</td><td>" +
      this.eppo0__hasEntityType() +
      this.eppo0__hasEntityTitle(this.instantsearch) +
      this.eppo0__categories() +
      this.ds0__sourceNamespace() +
      "</td></tr><tr><td></td><td>" +
      this.eppo0__hasEntityURL() +
      this.eppo0__hasEntityBlurb() +
      "</td></tr></table>"
    );
  };

  searchResultBody = () => {
    return "<div>" + this.ds0__contentText() + "</div>" + this.annotations();
  };

  eppo0__hasEntityTitle = () => {
    var iss = this.instantsearch.snippet({
      attribute: "eppo0__hasEntityTitle",
      highlightedTagName: "mark",
      hit: this.hit,
    });
    if (this.hit.eppo0__hasEntityURL) {
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

  eppo0__hasEntityURL = () => {
    return this.hit.eppo0__hasEntityURL
      ? '<a href="' +
          this.hit.eppo0__hasEntityURL +
          '" class="eppo0__hasEntityURL">' +
          this.hit.eppo0__hasEntityURL +
          "</a>"
      : "";
  };

  ds0__contentText = () => {
    return this.instantsearch.snippet({
      attribute: "ds0__contentText",
      highlightedTagName: "mark",
      hit: this.hit,
    });
  };

  myURLEncode = (url) => {
    return url.replaceAll(" ", "_");
  };

  eppo0__hasEntityType = () => {
    if (this.hit.eppo0__hasEntityType) {
      return (
        '<a href="' +
        this.hit.eppo0__hasEntityType +
        '"><span class="badge eppo0__hasEntityType">' +
        this.hit.eppo0__hasEntityType +
        "</span></a>"
      );
    }
    return "";
  };

  eppo0__hasEntityBlurb = () => {
    if (this.hit.eppo0__hasEntityBlurb) {
      return (
        "<div class='eppo0__hasEntityBlurb'>" +
        this.hit.eppo0__hasEntityBlurb +
        "</div>"
      );
    }
    return "";
  };

  eppo0__categories = () => {
    if (this.hit.eppo0__categories) {
      return this.hit.eppo0__categories
        .map((category) => {
          return (
            '<a href="' +
            DataspectsHelpers.currentDeFactoWgServer() +
            "/wiki/Category:" +
            category +
            '"><span class="eppo0__category">' +
            category +
            "</span></a>"
          );
        })
        .join(", ");
    }
    return "";
  };

  parsedPageText = () => {
    return "parsedPageText";
  };

  resultIcon = () => {
    return "";
  };

  annotations = () => {
    if (this.hit.annotations && this.hit.annotations.length > 0) {
      var annots = this.hit.annotations
        .map((annotation) => {
          return (
            '<tr><td><a href="' +
            DataspectsHelpers.currentDeFactoWgServer() +
            "/wiki/Property:" +
            annotation.predicate +
            '">' +
            annotation.predicate +
            "</a></td><td>::</td><td class='annotationObjectLiteral'>" +
            this.objectText(annotation) +
            "</td></tr>"
          );
        })
        .join("");
      return (
        '<table class="eppo0__hasAnnotations"><tbody>' +
        annots +
        "</tbody></table>"
      );
    }
    return "";
  };

  objectText = (annotation) => {
    return DataspectsHelpers.ifURLreturnAnchorTag(annotation.objectText);
  };

  createMetaPageLink = () => {
    return "";
  };

  ds0__sourceNamespace = () => {
    if (
      this.hit.ds0__sourceNamespace &&
      this.hit.ds0__sourceNamespace != "Main"
    ) {
      return (
        "<span class='ds0__sourceNamespace'>" +
        this.hit.ds0__sourceNamespace +
        "</span>"
      );
    }
    return "";
  };

  annotationByPredicate = (predicate) => {
    for (const key in Object.keys(this.hit.annotations)) {
      const annot = this.hit.annotations[key];
      if (annot.predicate == predicate) {
        return annot.objectText;
      }
    }
    return this.hit.name;
  };

  script = () => {
    return "";
  };
};
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
      this.parsedPageText()
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
    return "";
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
      this.parsedPageText()
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

CodeSearchResult = class extends SearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
  }

  resultIcon = () => {
    return (
      "<img class='resultIcon' src='" +
      DataspectsHelpers.currentDeFactoWgServer() +
      "/w/images/0/0e/Vscodelogo.png'>"
    );
  };

  searchResultBody = () => {
    return this.annotations();
  };

  annotations = () => {
    if (this.hit.annotations && this.hit.annotations.length > 0) {
      var annots = this.hit.annotations
        .map((annotation) => {
          return (
            '<tr><td><a href="' +
            DataspectsHelpers.currentDeFactoWgServer() +
            "/wiki/Property:" +
            annotation.predicate +
            '" class="blinking">' +
            annotation.predicate +
            "</a></td><td>::</td><td class='annotationObjectLiteral'>" +
            this.objectText(annotation) +
            "</td></tr>"
          );
        })
        .join("");
      return (
        '<table class="eppo0__hasAnnotations codeAspects"><tbody>' +
        annots +
        "</tbody></table>"
      );
    }
    return "";
  };
};

DataspectsSpecialDatatables = class extends SearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
  }

  eppo0__hasEntityTitle = () => {
    return (
      '<span class="eppo0__hasEntityTitle">' +
      this.hit.eppo0__hasEntityTitle +
      "</span>"
    );
  };

  searchResultBody = () => {
    return '<table id="table_id"></table>';
  };

  script = () => {
    // $(document).ready(function () {
    const dataTablesOptions = {
      columns: [{ data: "name" }, { data: "eppo0__hasEntityURL" }],
    };
    this.dsMWAPI.nodesList("table_id", dataTablesOptions);
    // });
  };
};

SearchFacetSearchResult = class extends MediaWikiSearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
  }

  searchResultHeader = () => {
    return (
      "<table><tr><td>" +
      this.resultIcon() +
      "</td><td>" +
      this.eppo0__hasEntityType() +
      this.eppo0__hasEntityTitle() +
      this.eppo0__categories() +
      this.ds0__sourceNamespace() +
      "</td></tr><tr><td></td><td>" +
      this.eppo0__hasEntityURL() +
      this.eppo0__hasEntityBlurb() +
      this.activateLink() +
      "</td></tr></table>"
    );
  };

  searchResultBody = () => {
    return (
      this.ds0__contentText() +
      // this.mw0__attachment(instantsearch) +
      this.annotations() +
      this.parsedPageTextFieldset() +
      this.parsedPageText()
    );
  };

  activateLink = () => {
    return (
      "<a href='" +
      mw.config.get("wgServer") +
      "/wiki/Special:Dataspects?helper=" +
      this.annotationByPredicate("Ds0:instantsearchHelper") +
      "' style='display:block;'>Activate this search facet</a>"
    );
  };

  eppo0__hasEntityTitle = () => {
    var iss = this.instantsearch.snippet({
      attribute: "eppo0__hasEntityTitle",
      highlightedTagName: "mark",
      hit: this.hit,
    });
    if (this.hit.eppo0__hasEntityURL) {
      return (
        '<a href="' +
        this.hit.eppo0__hasEntityURL +
        '" class="eppo0__hasEntityTitle" style="background-color:#CCFFCC;">' +
        iss +
        "</a>"
      );
    }
    return (
      '<span class="eppo0__hasEntityTitle" style="background-color:#CCFFCC;">' +
      iss +
      "</span>"
    );
  };
};

SMWCindyKateSearchResult = class extends MediaWikiSearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
  }
};

WikiDataspectsResult = class extends MediaWikiSearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
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

module.exports = {
  SearchResult,
  MediaWikiSearchResult,
  MediaWikiFileSearchResult,
  MediaWikiMetaPageSearchResult,
  ElementSearchResult,
  CodeSearchResult,
  DataspectsSpecialDatatables,
  SearchFacetSearchResult,
  SMWCindyKateSearchResult,
  WikiDataspectsResult,
};
