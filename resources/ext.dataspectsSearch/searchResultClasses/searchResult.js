require("mediawiki.api");
SearchResult = class {
  /**
   * dsImplementation: how to configure search result design/behaviour/interaction
   * https://wiki.dataspects.com/wiki/C0332407119
   *
   */
  constructor(hit, n4j) {
    this.hit = hit;
    this.api = new mw.Api();
    this.n4j = n4j;
  }

  // THIS METHOD MUST NOT BE OVERWRITTEN BY SUBCLASSES!
  searchResult = (hit, error, info, instantsearch) => {
    var isrcss = this.initialSearchResultCSS();
    return (
      isrcss.main + // The all encompassing hit class
      (typeof error.message == "string" ? error.message : "") +
      (typeof info.message == "string" ? info.message : "") +
      isrcss.srh + // The header to be shown in compact mode
      this.searchResultHeader(instantsearch) +
      "</div>" +
      isrcss.srb + // The body to be hidden in compact mode
      this.searchResultBody(hit, instantsearch) +
      "</div>" +
      "</div>"
    );
  };

  initialSearchResultCSS = () => {
    /**
     * dsImplementation: allow for compact search results by get parameter
     * FIXME: this does not check $("#compactList")
     */
    if (this.isCompact) {
      return {
        main: '<div class="compactHit">',
        srh: "<div class='searchResultHeader'>",
        srb: "<div class='searchResultBody' style='display:none'>",
      };
    }
    return {
      main: '<div class="hit">',
      srh: "<div class='searchResultHeader'>",
      srb: "<div class='searchResultBody' style='display:block'>",
    };
  };

  searchResultHeader = (instantsearch) => {
    return (
      "<table><tr><td>" +
      this.resultIcon() +
      "</td><td>" +
      this.eppo0__hasEntityType() +
      this.eppo0__hasEntityTitle(instantsearch) +
      this.eppo0__categories() +
      this.ds0__sourceNamespace() +
      "</td></tr><tr><td></td><td>" +
      this.eppo0__hasEntityURL() +
      this.eppo0__hasEntityBlurb() +
      "</td></tr></table>"
    );
  };

  searchResultBody = (hit, instantsearch) => {
    return (
      "<div>" +
      this.ds0__contentText(instantsearch) +
      "</div>" +
      this.annotations()
    );
  };

  eppo0__hasEntityTitle = (instantsearch) => {
    var iss = instantsearch.snippet({
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

  ds0__contentText = (instantsearch) => {
    return instantsearch.snippet({
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
            currentDeFactoWgServer() +
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

  parsedPageText = (hit) => {
    return "";
  };

  resultIcon = (hit) => {
    return "";
  };

  annotations = () => {
    if (this.hit.annotations && this.hit.annotations.length > 0) {
      var annots = this.hit.annotations
        .map((annotation) => {
          return (
            '<tr><td><a href="' +
            currentDeFactoWgServer() +
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
    return ifURLreturnAnchorTag(annotation.objectText);
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
};

module.exports = { SearchResult };
