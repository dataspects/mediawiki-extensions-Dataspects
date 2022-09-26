MediaWikiSearchResult = class extends SearchResult {
  constructor(hit) {
    super(hit);
  }

  resultIcon = (hit) => {
    return (
      "<img class='resultIcon' src='" +
      mw.config.get("wgServer") +
      "/w/images/a/a9/Mediawikilogo.png'>"
    );
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

module.exports = { MediaWikiSearchResult };
