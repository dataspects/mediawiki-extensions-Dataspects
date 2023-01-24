const {
  SearchResult,
  MediaWikiSearchResult,
  MediaWikiFileSearchResult,
  MediaWikiMetaPageSearchResult,
  ElementSearchResult,
  CodeSearchResult,
  DataspectsSpecialDatatables,
  SearchFacetSearchResult,
  SMWCindyKateSearchResult,
  WikiDataspectsResult,
} = require("./searchResultClasses.js");

const profiles = require("./profiles.json");

ProfilesMatcher = class {
  constructor(hit, currentContext) {
    this.hit = hit;
    this.environment = currentContext.environment;
  }
  getSearchResultClass = () => {
    for (const key in Object.keys(profiles)) {
      if (this.#profilesMatch(profiles[key])) {
        return profiles[key].searchResultClassName;
      }
    }
    return "SearchResult";
  };
  #profilesMatch = (profile) => {
    if ("environment" in profile) {
      if (
        this.#firstContainsSecond(this.hit, profile.hit) &&
        this.#firstContainsSecond(this.environment, profile.environment)
      ) {
        return true;
      }
    } else if (this.#firstContainsSecond(this.hit, profile.hit)) {
      return true;
    }
    return false;
  };
  #firstContainsSecond = (object1, object2) => {
    // ds1:implements: FIXME: match on annotations array containing annotation fragment(s)
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    for (const key of keys2) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = this.#isObject(val1) && this.#isObject(val2);
      if (
        (areObjects && !this.#firstContainsSecond(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    }
    return true;
  };

  #isObject = (object) => {
    return object != null && typeof object === "object";
  };
};

SearchResultMatcher = class {
  constructor(hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    this.hit = hit;
    this.currentContext = currentContext;
    this.instantsearch = instantsearch;
    this.dsMWAPI = dsMWAPI;
    this.mwapi = mwapi;
    this.error = new SearchResultMatchError();
    this.info = new SearchResultMatchInfo(this.hit);
  }

  searchResult = () => {
    this.info.message =
      "Item " +
      this.hit.id +
      " is displayed using searchResultClass '" +
      this.hit.searchResultClassName +
      "'";
    const searchResultClass = this.#searchResultClassMappings(
      this.hit.searchResultClassName
    );
    return searchResultClass.searchResult(
      this.hit,
      this.currentContext,
      this.instantsearch,
      this.dsMWAPI,
      this.mwapi,
      this.error,
      this.info
    );
  };

  #searchResultClassMappings = (searchResultClassName) => {
    this.error.message = false;
    switch (searchResultClassName) {
      case "SearchResult":
        this.searchResultClassName = searchResultClassName;
        return new SearchResult(
          this.error,
          this.info,
          this.hit,
          this.currentContext,
          this.instantsearch,
          this.dsMWAPI,
          this.mwapi
        );
        break;
      case "ElementSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new ElementSearchResult(
          this.error,
          this.info,
          this.hit,
          this.currentContext,
          this.instantsearch,
          this.dsMWAPI,
          this.mwapi
        );
        break;
      case "SMWCindyKateSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new SMWCindyKateSearchResult(
          this.error,
          this.info,
          this.hit,
          this.currentContext,
          this.instantsearch,
          this.dsMWAPI,
          this.mwapi
        );
        break;
      case "WikiDataspectsResult":
        this.searchResultClassName = searchResultClassName;
        return new WikiDataspectsResult(
          this.error,
          this.info,
          this.hit,
          this.currentContext,
          this.instantsearch,
          this.dsMWAPI,
          this.mwapi
        );
        break;
      case "SearchFacetSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new SearchFacetSearchResult(
          this.error,
          this.info,
          this.hit,
          this.currentContext,
          this.instantsearch,
          this.dsMWAPI,
          this.mwapi
        );
        break;
      case "MediaWikiSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new MediaWikiSearchResult(
          this.error,
          this.info,
          this.hit,
          this.currentContext,
          this.instantsearch,
          this.dsMWAPI,
          this.mwapi
        );
        break;
      case "MediaWikiMetaPageSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new MediaWikiMetaPageSearchResult(
          this.error,
          this.info,
          this.hit,
          this.currentContext,
          this.instantsearch,
          this.dsMWAPI,
          this.mwapi
        );
        break;
      case "MediaWikiFileSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new MediaWikiFileSearchResult(
          this.error,
          this.info,
          this.hit,
          this.currentContext,
          this.instantsearch,
          this.dsMWAPI,
          this.mwapi
        );
        break;
      case "CodeSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new CodeSearchResult(
          this.error,
          this.info,
          this.hit,
          this.currentContext,
          this.instantsearch,
          this.dsMWAPI,
          this.mwapi
        );
        break;
      case "DataspectsSpecialDatatables":
        this.searchResultClassName = searchResultClassName;
        return new DataspectsSpecialDatatables(
          this.error,
          this.info,
          this.hit,
          this.currentContext,
          this.instantsearch,
          this.dsMWAPI,
          this.mwapi
        );
        break;
      default:
        return "SearchResult";
    }
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

// LEX230108155400
SearchResultMatchInfo = class {
  #messageValue;
  constructor(hit) {
    this.hit = hit;
  }

  #pluralizer = (output) => {
    return output > 1 ? "s" : "";
  };

  xago = (timestamp) => {
    const now = Math.floor(new Date().getTime() / 1000);
    const difference = Math.floor(now - timestamp);
    var output = "";
    var unit = "";
    if (difference < 60) {
      output = difference;
      unit = "second" + this.#pluralizer(output);
    } else if (difference < 3600) {
      output = Math.floor(difference / 60);
      unit = "minute" + this.#pluralizer(output);
    } else if (difference < 86400) {
      output = Math.floor(difference / 3600);
      unit = "hour" + this.#pluralizer(output);
    } else if (difference < 2620800) {
      output = Math.floor(difference / 86400);
      unit = "day" + this.#pluralizer(output);
    } else if (difference < 31449600) {
      output = Math.floor(difference / 2620800);
      unit = "month" + this.#pluralizer(output);
    } else {
      output = Math.floor(difference / 31449600);
      unit = "year" + this.#pluralizer(output);
    }
    return output + " " + unit;
  };

  set message(m) {
    if (m) {
      const xago = this.xago(this.hit.release_timestamp);
      this.#messageValue =
        '<div class="hitInfo">' +
        (this.hit.release_timestamp
          ? '<span class="hitAgo" title="Item ' +
            this.hit.id +
            " was last indexed " +
            xago +
            ' ago">' +
            xago +
            "</span>"
          : '<span class="hitAgo" title="Missing this.hit.release_timestamp">release_timestamp</span>') +
        '<span class="searchResultClassName" title="' +
        m +
        '">?</span></div>';
    }
  }

  get message() {
    return this.#messageValue;
  }
};

module.exports = { ProfilesMatcher, SearchResultMatcher };
