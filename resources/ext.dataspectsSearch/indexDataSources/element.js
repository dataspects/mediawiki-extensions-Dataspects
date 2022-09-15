const { SearchResult } = require("../searchResult.js");

ElementSource = class extends SearchResult {
  constructor(hit) {
    super(hit);
  }
  eppo0__hasEntityTitle = () => {
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
  createMetaPageLink = () => {
    //#IndexConfigSetting
    var eppo0__hasEntityTitle = "Topic";
    var args = {
      "eppo0:hasEntityTitle": this.hit.eppo0__hasEntityTitle,
      "eppo0:hasEntityBlurb": this.hit.ds0__text,
    };
    var backlink =
      "Annotation[1][AnnotationPredicate]=ds0:copiedFromElementMessage&Annotation[1][AnnotationObject]=" +
      this.hit.name;
    // FIXME: this must be moved!

    return (
      '&rarr; <a href="' +
      mw.config.get("wgServer") +
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
      '">Create a meta page for this</a>'
    );
  };
};

module.exports = { ElementSource };
