SpecialDataspects = class {
  constructor() {}

  mw0RawUrl = (hit) => {
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

  mw0__attachment = (hit, instantsearch) => {
    if (["File"].includes(hit.mw0__namespace)) {
      return (
        "<fieldset><legend>" +
        hit.mw0__attachment.type +
        "</legend>" +
        '<div class="mw0__attachmentsText">' +
        instantsearch.snippet({
          attribute: "mw0__attachment.text",
          highlightedTagName: "mark",
          hit,
        }) +
        "</div></fieldset>"
      );
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
    if (
      hit.ds0__source == "https://mwstake.org/mwstake/wiki/" &&
      hit.mw0__namespace == "Main"
    ) {
      $.ajax({
        url:
          mw.config.get("wgServer") +
          "/w/api.php?action=parse&page=" +
          hit.name +
          "&prop=text&disablelimitreport&format=json",
        success: function (data) {
          $("#" + hit.id).html(data.parse.text["*"]);
          $("#" + hit.id + "_fieldset").css("display", "block");
          $("#ds0__topicMetaTemplate").remove();
        },
      });
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
