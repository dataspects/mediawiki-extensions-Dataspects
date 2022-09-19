const { ElementSource } = require("./indexDataSources/element.js");
const { MediaWikiSource } = require("./indexDataSources/mediaWiki.js");
const { SMWCindyKateSource } = require("./indexDataSources/sMWCindyKate.js");
const {
  WikiDataspectsSource,
} = require("./indexDataSources/wikiDataspects.js");
const profiles = require("./profiles.json");

ProfileMatcher = class {
  constructor(hit, instantsearch) {
    this.hit = hit;
    this.instantsearch = instantsearch;
    this.searchResultClass = this.getSearchResultClass();
  }

  searchResultClassMappings = (searchResultClassName) => {
    switch (searchResultClassName) {
      case "ElementSource":
        return new ElementSource(this.hit);
      case "SMWCindyKateSource":
        return new SMWCindyKateSource(this.hit);
      case "WikiDataspectsSource":
        return new WikiDataspectsSource(this.hit);
      default:
        return new MediaWikiSource(this.hit);
    }
  };

  getSearchResultClass = () => {
    for (const key in Object.keys(profiles)) {
      if (this.firstContainsSecond(this.hit, profiles[key].hit)) {
        return this.searchResultClassMappings(
          profiles[key].searchResultClassName
        );
      }
    }
    return new MediaWikiSource(this.hit);
  };

  searchResult = () => {
    return (
      '<div class="hit">' +
      "<div>" +
      this.searchResultClass.resultIcon() +
      this.searchResultClass.eppo0__hasEntityType() +
      this.searchResultClass.eppo0__hasEntityTitle() +
      this.searchResultClass.eppo0__categories() +
      this.searchResultClass.mw0__namespace() +
      " " +
      this.searchResultClass.createMetaPageLink() +
      "</div>" +
      this.searchResultClass.mw0__rawUrl() +
      "<div>" +
      this.searchResultClass.ds0__text(this.instantsearch) +
      "</div>" +
      this.searchResultClass.mw0__attachment(this.instantsearch) +
      this.searchResultClass.annotations() +
      this.searchResultClass.parsedPageTextFieldset() +
      "<script>" +
      this.searchResultClass.parsedPageText(this.hit) +
      +"</script></div>"
    );
  };

  firstContainsSecond = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    for (const key of keys2) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = this.isObject(val1) && this.isObject(val2);
      if (
        (areObjects && !this.firstContainsSecond(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    }
    return true;
  };
  isObject = (object) => {
    return object != null && typeof object === "object";
  };
};

module.exports = { ProfileMatcher };
