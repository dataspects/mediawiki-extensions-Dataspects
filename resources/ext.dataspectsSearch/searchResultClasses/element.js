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
      currentDeFactoWgServer() +
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

  // ds0__contentText = (instantsearch) => {
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
      currentDeFactoWgServer() +
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
      currentDeFactoWgServer() +
      "/w/images/a/a9/Mediawikilogo.png'>"
    );
  };

  objectText = (annotation) => {
    if (annotation.predicate == "ds77__isReplyTo") {
      return (
        "<img class='resultIcon' src='" +
        currentDeFactoWgServer() +
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

module.exports = { ElementSearchResult };
