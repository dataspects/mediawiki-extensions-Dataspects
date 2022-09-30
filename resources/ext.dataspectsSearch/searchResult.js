SearchResult = class {
  /**
   * dsImplementation: how to configure search result design/behaviour/interaction
   * https://wiki.dataspects.com/wiki/C0332407119
   *
   */
  constructor(hit) {
    this.hit = hit;
  }

  // THIS METHOD MUST NOT BE OVERWRITTEN BY SUBCLASSES!
  searchResult = (hit, config, error, info, instantsearch) => {
    var isrcss = this.initialSearchResultCSS(config);
    return (
      isrcss.main + // The all encompassing hit class
      (typeof error.message == "string" ? error.message : "") +
      (typeof info.message == "string" ? info.message : "") +
      isrcss.srh + // The header to be shown in compact mode
      this.searchResultHeader() +
      "</div>" +
      isrcss.srb + // The body to be hidden in compact mode
      this.searchResultBody(hit, instantsearch) +
      "</div>" +
      "</div>"
    );
  };

  initialSearchResultCSS = (config) => {
    /**
     * dsImplementation: allow for compact search results by get parameter
     * FIXME: this does not check $("#compactList")
     */
    if (config.compact) {
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

  searchResultHeader = () => {
    return (
      "<table><tr><td>" +
      this.resultIcon() +
      "</td><td>" +
      this.eppo0__hasEntityType() +
      this.eppo0__hasEntityTitle() +
      this.eppo0__categories() +
      this.mw0__namespace() +
      "</td></tr><tr><td></td><td>" +
      this.eppo0__hasEntityBlurb() +
      "</td></tr></table>"
    );
  };

  searchResultBody = (hit, instantsearch) => {
    return (
      "<div>" +
      this.mw0__rawUrl() +
      "</div>" +
      "<div>" +
      this.ds0__text(instantsearch) +
      "</div>" +
      this.mw0__attachment(instantsearch) +
      this.annotations() +
      this.parsedPageTextFieldset() +
      "<script>" +
      this.parsedPageText(hit) +
      +"</script>"
    );
  };

  eppo0__hasEntityTitle = () => {
    var iss = instantsearch.snippet({
      attribute: "eppo0__hasEntityTitle",
      highlightedTagName: "mark",
      hit: this.hit,
    });
    if (this.hit.mw0__rawUrl) {
      return (
        '<a href="' +
        this.hit.mw0__rawUrl +
        '" class="eppo0__hasEntityTitle">' +
        iss +
        "</a>"
      );
    }
    return '<span class="eppo0__hasEntityTitle">' + iss + "</span>";
  };

  mw0__rawUrl = () => {
    return this.hit.mw0__rawUrl
      ? '<a href="' +
          this.hit.mw0__rawUrl +
          '" class="mw0__rawUrl">' +
          this.hit.mw0__rawUrl +
          "</a>"
      : "";
  };

  ds0__text = (instantsearch) => {
    return instantsearch.snippet({
      attribute: "ds0__text",
      highlightedTagName: "mark",
      hit: this.hit,
    });
  };

  myURLEncode = (url) => {
    return url.replaceAll(" ", "_");
  };

  mw0__attachment = (instantsearch) => {
    //FIXME: handle non-image displays
    if (["File"].includes(this.hit.mw0__namespace)) {
      return (
        "<fieldset><legend>" +
        this.hit.mw0__attachment.type +
        "</legend>" +
        '<table class="mw0__attachment"><tr><td><a href="' +
        this.hit.mw0__rawUrl +
        '"><img src="' +
        this.myURLEncode(
          this.hit.mw0__attachment.thumbURL + "/120px-" + this.hit.name
        ) +
        '"></a></td><td><div class="mw0__attachmentsText">' +
        instantsearch.snippet({
          attribute: "mw0__attachment.text",
          highlightedTagName: "mark",
          hit: this.hit,
        }) +
        "</div></td></tr></table></fieldset>"
      ); // FIXME: img!
    }
    return "";
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
            mw.config.get("wgServer") +
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
            mw.config.get("wgServer") +
            "/wiki/Property:" +
            annotation.predicate +
            '">' +
            annotation.predicate +
            "</a></td><td>::</td><td class='annotationObjectLiteral'>" +
            this.objectLiteral(annotation) +
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

  objectLiteral = (annotation) => {
    if (annotation.objectLiteral.match(/^https?:\/\//)) {
      return (
        "<a href='" +
        annotation.objectLiteral +
        "'>" +
        annotation.objectLiteral +
        "</a>"
      );
    }
    return annotation.objectLiteral;
  };

  createMetaPageLink = () => {
    return "";
  };

  mw0__namespace = () => {
    if (this.hit.mw0__namespace && this.hit.mw0__namespace != "Main") {
      return (
        "<span class='mw0__namespace'>" + this.hit.mw0__namespace + "</span>"
      );
    }
    return "";
  };

  annotationByPredicate = (predicate) => {
    for (const key in Object.keys(this.hit.annotations)) {
      const annot = this.hit.annotations[key];
      if (annot.predicate == predicate) {
        return annot.objectLiteral;
      }
    }
    return this.hit.name;
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

module.exports = { SearchResult };
