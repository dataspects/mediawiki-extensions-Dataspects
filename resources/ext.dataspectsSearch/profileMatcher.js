const { ElementSearchResult } = require("./searchResultClasses/element.js");
const { MediaWikiSearchResult } = require("./searchResultClasses/mediaWiki.js");
const {
  SMWCindyKateSearchResult,
} = require("./searchResultClasses/sMWCindyKate.js");
const {
  WikiDataspectsSearchResult,
} = require("./searchResultClasses/wikiDataspects.js");
const profiles = require("./profiles.json");

SearchResultMatcher = class {
  constructor(hit, instantsearch) {
    this.hit = hit;
    this.instantsearch = instantsearch;
    this.error = new SearchResultMatchError();
    this.searchResultClass = this.getSearchResultClass();
  }

  searchResultClassMappings = (searchResultClassName) => {
    var theClass = null;
    switch (searchResultClassName) {
      case "ElementSearchResult":
        this.searchResultClassName = searchResultClassName;
        theClass = new ElementSearchResult(this.hit);
        break;
      case "SMWCindyKateSearchResult":
        this.searchResultClassName = searchResultClassName;
        theClass = new SMWCindyKateSearchResult(this.hit);
        break;
      case "WikiDataspectsSearchResult":
        this.searchResultClassName = searchResultClassName;
        theClass = new WikiDataspectsSearchResult(this.hit);
        break;
      default:
        this.error.message =
          "ERROR: " +
          searchResultClassName +
          " matched but not found. Reverting to standard.";
        return null; // FIXME
    }
    return theClass;
  };

  getSearchResultClass = () => {
    var theClass = null;
    this.searchResultClassName = "MediaWikiSearchResult"; // This is if no profile matches!
    for (const key in Object.keys(profiles)) {
      // console.debug(JSON.stringify(this.hit, null, 2));
      // console.debug(JSON.stringify(profiles[key].hit, null, 2));
      if (this.firstContainsSecond(this.hit, profiles[key].hit)) {
        // This hit requests a class.
        theClass = this.searchResultClassMappings(
          profiles[key].searchResultClassName
        );
      }
    }
    if (theClass) {
      // The hit profiles DOES match a search result class
      return theClass;
    }
    return new MediaWikiSearchResult(this.hit);
  };

  searchResult = () => {
    return (
      '<div class="hit">' +
      (this.error.message ? this.error.message : "") +
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

SearchResultMatchError = class {
  #messageValue;
  constructor() {}
  set message(m) {
    this.#messageValue = '<div class="hitAlert" title="' + m + '">!</div>';
  }

  get message() {
    return this.#messageValue;
  }
};

module.exports = { SearchResultMatcher };
