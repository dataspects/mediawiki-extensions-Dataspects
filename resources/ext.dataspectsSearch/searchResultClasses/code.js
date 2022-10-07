CodeSearchResult = class extends SearchResult {
  constructor(hit) {
    super(hit);
  }

  resultIcon = (hit) => {
    return (
      "<img class='resultIcon' src='" +
      mw.config.get("wgServer") +
      "/w/images/0/0e/Vscodelogo.png'>"
    );
  };

  searchResultBody = (hit, instantsearch) => {
    return this.annotations();
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
            '" class="blinking">' +
            annotation.predicate +
            "</a></td><td>::</td><td class='annotationObjectLiteral'>" +
            this.objectLiteral(annotation) +
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
