const { SearchResult } = require("./searchResult.js");
const { ElementSearchResult } = require("./searchResultClasses/element.js");
const { MediaWikiSearchResult } = require("./searchResultClasses/mediaWiki.js");
const {
  MediaWikiMetaPageSearchResult,
} = require("./searchResultClasses/mediaWikiMetaPage.js");
const {
  SMWCindyKateSearchResult,
} = require("./searchResultClasses/sMWCindyKate.js");
const {
  WikiDataspectsSearchResult,
} = require("./searchResultClasses/wikiDataspects.js");
const {
  SearchFacetSearchResult,
} = require("./searchResultClasses/searchFacet.js");
const profiles = require("./profiles.json");

SearchResultMatcher = class {
  constructor(hit, instantsearch, n4j) {
    this.hit = hit;
    this.instantsearch = instantsearch;
    this.error = new SearchResultMatchError();
    this.info = new SearchResultMatchInfo();
    this.searchResultClass = this.getSearchResultClass();
    // this.defaultSearchResultClass = "SearchResult"; // FIXME: see below
  }

  searchResultClassMappings = (searchResultClassName) => {
    var theClass = null;
    switch (searchResultClassName) {
      case "SearchResult":
        this.searchResultClassName = searchResultClassName;
        theClass = new SearchResult(this.hit);
        break;
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
      case "SearchFacetSearchResult":
        this.searchResultClassName = searchResultClassName;
        theClass = new SearchFacetSearchResult(this.hit);
        break;
      case "MediaWikiSearchResult":
        this.searchResultClassName = searchResultClassName;
        theClass = new MediaWikiSearchResult(this.hit);
        break;
      case "MediaWikiMetaPageSearchResult":
        this.searchResultClassName = searchResultClassName;
        theClass = new MediaWikiMetaPageSearchResult(this.hit);
        break;
      default:
        this.error.message =
          "ERROR: SearchResult subclass " +
          searchResultClassName +
          " matched but not found. Reverting to SearchResult class.";
        this.searchResultClassName = "SearchResult";
        theClass = new SearchResult(this.hit);
    }
    return theClass;
  };

  getSearchResultClass = () => {
    var theClass = this.searchResultClassMappings("SearchResult"); // FIXME: this.defaultSearchResultClass doesn't work here, since the constructor doesn't seem to have completed before this is run?!
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
    return theClass;
  };

  // FIXME: If we move this method to the top of the class, it doesn't work as expected?! Class not fully loaded?!
  searchResult = () => {
    this.info.message = "searchResultClassName: " + this.searchResultClassName;
    return this.searchResultClass.searchResult(
      this.hit,
      this.error,
      this.info,
      instantsearch
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

SearchResultMatchInfo = class {
  #messageValue;
  constructor() {}
  set message(m) {
    this.#messageValue = '<div class="hitInfo" title="' + m + '">?</div>';
  }

  get message() {
    return this.#messageValue;
  }
};

module.exports = { SearchResultMatcher };
