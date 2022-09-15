SpecialDataspects = class {
  constructor() {}

  eppo0__hasEntityTitle = (hit) => {
    var iss = instantsearch.snippet({
      attribute: "eppo0__hasEntityTitle",
      highlightedTagName: "mark",
      hit,
    });
    if (hit.mw0__rawUrl) {
      return (
        '<a href="' +
        hit.mw0__rawUrl +
        '" class="eppo0__hasEntityTitle">' +
        iss +
        "</a>"
      );
    }
    return '<span class="eppo0__hasEntityTitle">' + iss + "</span>";
  };

  mw0__rawUrl = (hit) => {
    return hit.mw0__rawUrl
      ? '<a href="' +
          hit.mw0__rawUrl +
          '" class="mw0__rawUrl">' +
          hit.mw0__rawUrl +
          "</a>"
      : "";
  };

  ds0__text = (hit, instantsearch) => {
    if (["Element"].includes(hit.ds0__source)) {
      // https://www.algolia.com/doc/api-reference/widgets/highlight/js/
      // FIXME: this still snippets!
      return hit.ds0__text;
    }
    if (
      ["Template", "Form", "Module", "Concept"].includes(hit.mw0__namespace)
    ) {
      return (
        "<pre>" +
        instantsearch.snippet({
          attribute: "mw0__wikitext",
          highlightedTagName: "mark",
          hit,
        }) +
        "</pre>"
      );
    }
    return instantsearch.snippet({
      attribute: "ds0__text",
      highlightedTagName: "mark",
      hit,
    });
  };

  myURLEncode = (url) => {
    return url.replaceAll(" ", "_");
  };

  mw0__attachment = (hit, instantsearch) => {
    //FIXME: handle non-image displays
    if (["File"].includes(hit.mw0__namespace)) {
      return (
        "<fieldset><legend>" +
        hit.mw0__attachment.type +
        "</legend>" +
        '<table class="mw0__attachment"><tr><td><a href="' +
        hit.mw0__rawUrl +
        '"><img src="' +
        this.myURLEncode(hit.mw0__attachment.thumbURL + "/120px-" + hit.name) +
        '"></a></td><td><div class="mw0__attachmentsText">' +
        instantsearch.snippet({
          attribute: "mw0__attachment.text",
          highlightedTagName: "mark",
          hit,
        }) +
        "</div></td></tr></table></fieldset>"
      ); // FIXME: img!
    }
    return "";
  };

  eppo0__hasEntityType = (hit) => {
    if (hit.eppo0__hasEntityType) {
      return (
        '<a href="' +
        hit.eppo0__hasEntityType +
        '"><span class="badge eppo0__hasEntityType">' +
        hit.eppo0__hasEntityType +
        "</span></a>"
      );
    }
    return "";
  };

  eppo0__categories = (hit) => {
    if (hit.eppo0__categories) {
      return hit.eppo0__categories
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
          // $("#" + hit.id + "_fieldset").css("display", "block");
          $("#ds0__topicMetaTemplate").remove(); // FIXME
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $("#" + hit.id).html(
            "<p>SORRY: There's an issue displaying this content. Please check your browser's error console.</p>"
          );
        },
      });
    } else {
      // FIXME: Is it correct that $("#" + hit.id) does not yet exist when this is run?
      $("#" + hit.id).html(
        "<p>SORRY: mw0__apiParseTextURL is not defined for this entity.</p>"
      );
      console.debug(
        "mw0__apiParseTextURL is not defined for " + hit.mw0__rawUrl
      );
    }
  };

  annotations = (hit, instantsearch) => {
    if (hit.annotations && hit.annotations.length > 0) {
      var annots = hit.annotations
        .map((annotation) => {
          return (
            '<tr><td><a href="' +
            mw.config.get("wgServer") +
            "/wiki/Property:" +
            annotation.predicate +
            '">' +
            annotation.predicate +
            "</a></td><td>::</td><td>" +
            annotation.objectLiteral +
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
};

module.exports = { SpecialDataspects };
