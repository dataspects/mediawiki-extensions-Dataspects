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
  constructor(hit, environment, instantsearch) {
    this.hit = hit;
    this.instantsearch = instantsearch;
    this.error = new SearchResultMatchError();
    this.info = new SearchResultMatchInfo();
    this.environment = environment;
    this.defaultSearchResultClass = "SearchResult";
    this.searchResultClass = this.getSearchResultClass();
  }

  searchResult = (config) => {
    this.info.message = "searchResultClassName: " + this.searchResultClassName;
    return this.searchResultClass.searchResult(
      this.hit,
      config,
      this.error,
      this.info,
      instantsearch
    );
  };

  searchResultClassMappings = (searchResultClassName) => {
    var theClass = null;
    this.error.message = false;
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
          " requested by profile match but not found. Reverting to SearchResult class.";
        this.searchResultClassName = "SearchResult";
        theClass = new SearchResult(this.hit);
    }
    return theClass;
  };

  profilesMatch = (profile) => {
    if ("environment" in profile) {
      if (
        this.firstContainsSecond(this.hit, profile.hit) &&
        this.firstContainsSecond(this.environment, profile.environment)
      ) {
        return true;
      }
    } else if (this.firstContainsSecond(this.hit, profile.hit)) {
      return true;
    }
    return false;
  };

  getSearchResultClass = () => {
    var theClass = this.searchResultClassMappings(
      this.defaultSearchResultClass
    );
    for (const key in Object.keys(profiles)) {
      if (this.profilesMatch(profiles[key])) {
        theClass = this.searchResultClassMappings(
          profiles[key].searchResultClassName
        );
      }
    }
    return theClass;
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
    if (m) {
      this.#messageValue = '<div class="hitAlert" title="' + m + '">!</div>';
    }
  }

  get message() {
    return this.#messageValue;
  }
};

SearchResultMatchInfo = class {
  #messageValue;
  constructor() {}
  set message(m) {
    if (m) {
      this.#messageValue = '<div class="hitInfo" title="' + m + '">?</div>';
    }
  }

  get message() {
    return this.#messageValue;
  }
};

module.exports = { SearchResultMatcher };
