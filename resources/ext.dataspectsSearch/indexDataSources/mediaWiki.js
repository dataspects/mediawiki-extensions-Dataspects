const { SearchResult } = require("../searchResult.js");

MediaWikiSource = class extends SearchResult {
  constructor(hit) {
    super(hit);
  }

  ds0__text = (instantsearch) => {
    if (
      ["Template", "Form", "Module", "Concept"].includes(
        this.hit.mw0__namespace
      )
    ) {
      return (
        "<pre>" +
        instantsearch.snippet({
          attribute: "mw0__wikitext",
          highlightedTagName: "mark",
          hit: this.hit,
        }) +
        "</pre>"
      );
    }
    return instantsearch.snippet({
      attribute: "ds0__text",
      highlightedTagName: "mark",
      hit: this.hit,
    });
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
};

module.exports = { MediaWikiSource };
