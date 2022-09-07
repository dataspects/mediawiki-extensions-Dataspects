SpecialMWStakeORG = class {
  constructor() {}
  createMetaPageLink = (hit) => {
    //#IndexConfigSetting
    var eppo0__hasEntityTitle = "Topic";
    var args = {
      "eppo0:hasEntityTitle": hit.eppo0__hasEntityTitle,
      "eppo0:hasEntityBlurb": hit.ds0__text,
    };
    var backlink =
      "Annotation[1][AnnotationPredicate]=mwstake:copiedFromElementMessage&Annotation[1][AnnotationObject]=" +
      hit.name;
    if (["Element"].includes(hit.ds0__source)) {
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
    }
    return "";
  };
};

module.exports = { SpecialMWStakeORG };
