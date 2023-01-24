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

module.exports = { CodeSearchResult };
