SearchResult = class {
  constructor(hit) {
    this.hit = hit;
  }

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
    //FIXME
    if ("mw0__apiParseTextURL" in hit && hit.mw0__apiParseTextURL != "") {
      $.ajax({
        url: encodeURI(hit.mw0__apiParseTextURL),
        success: function (data) {
          $("#" + hit.id).html(data.parse.text["*"]);
          // $("#" + this.hit.id + "_fieldset").css("display", "block");
          $("#ds0__topicMetaTemplate").remove(); // FIXME
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // FIXME: make this available here
          $("#" + hit.id).html(
            "<p>SORRY: There's an issue displaying this content. Please check your browser's error console.</p>"
          );
        },
      });
    } else {
      // FIXME: Is it correct that $("#" + this.hit.id) does not yet exist when this is run?
      $("#" + hit.id).html(
        "<p>SORRY: mw0__apiParseTextURL is not defined for this entity.</p>"
      );
      console.debug(
        "mw0__apiParseTextURL is not defined for " + hit.mw0__rawUrl
      );
    }
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
            "</a></td><td>::</td><td>" +
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
};

module.exports = { SearchResult };
