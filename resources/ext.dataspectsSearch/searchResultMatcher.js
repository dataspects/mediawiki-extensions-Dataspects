const { SearchResult } = require("./searchResultClasses/searchResult.js");
const { ElementSearchResult } = require("./searchResultClasses/element.js");
const { MediaWikiSearchResult } = require("./searchResultClasses/mediaWiki.js");
const {
  MediaWikiMetaPageSearchResult,
} = require("./searchResultClasses/mediaWikiMetaPage.js");
const {
  MediaWikiFileSearchResult,
} = require("./searchResultClasses/mediaWikiFile.js");
const {
  SMWCindyKateSearchResult,
} = require("./searchResultClasses/sMWCindyKate.js");
const {
  WikiDataspectsResult,
} = require("./searchResultClasses/wikiDataspects.js");
const {
  SearchFacetSearchResult,
} = require("./searchResultClasses/searchFacet.js");
const { CodeSearchResult } = require("./searchResultClasses/code.js");
const profiles = require("./profiles.json");

SearchResultMatcher = class {
  constructor(hit, currentContext, instantsearch, n4j) {
    this.hit = hit;
    this.n4j = n4j;
    this.instantsearch = instantsearch;
    this.error = new SearchResultMatchError();
    this.info = new SearchResultMatchInfo(this.hit);
    this.environment = currentContext.environment;
    this.defaultSearchResultClass = "SearchResult";
    this.searchResultClass = this.getSearchResultClass();
  }

  searchResult = () => {
    this.info.message =
      "Item " +
      this.hit.id +
      " is displayed using searchResultClass '" +
      this.searchResultClassName +
      "'";
    return this.searchResultClass.searchResult(
      this.hit,
      this.error,
      this.info,
      instantsearch
    );
  };

  getSearchResultClass = () => {
    for (const key in Object.keys(profiles)) {
      if (this.#profilesMatch(profiles[key])) {
        /**
         * We check the hit against the profiles. THE FIRST THAT MATCHES IS USED!
         * So, more general profiles need to be placed at the end of profiles.json.
         * E.g. ds0__sourceNamespace is more specific than ds0__source, so in profiles.json:
         * [
         *  {
         *    "hit": {
         *      "ds0__sourceNamespace": ...
         *    }
         *  },
         *  {
         *    "hit": {
         *      "ds0__source": ...
         *    }
         *  }
         * ]
         */
        return this.#searchResultClassMappings(
          profiles[key].searchResultClassName
        );
      }
    }
    return this.#defaultSearchResultClass();
  };

  #defaultSearchResultClass = () => {
    this.error.message = "ERROR: No searchResultClass found!";
    this.searchResultClassName = "SearchResult";
    return new SearchResult(this.hit, this.n4j);
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

  #searchResultClassMappings = (searchResultClassName) => {
    this.error.message = false;
    switch (searchResultClassName) {
      case "SearchResult":
        this.searchResultClassName = searchResultClassName;
        return new SearchResult(this.hit, this.n4j);
        break;
      case "ElementSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new ElementSearchResult(this.hit, this.n4j);
        break;
      case "SMWCindyKateSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new SMWCindyKateSearchResult(this.hit, this.n4j);
        break;
      case "WikiDataspectsResult":
        this.searchResultClassName = searchResultClassName;
        return new WikiDataspectsResult(this.hit, this.n4j);
        break;
      case "SearchFacetSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new SearchFacetSearchResult(this.hit, this.n4j);
        break;
      case "MediaWikiSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new MediaWikiSearchResult(this.hit, this.n4j);
        break;
      case "MediaWikiMetaPageSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new MediaWikiMetaPageSearchResult(this.hit, this.n4j);
        break;
      case "MediaWikiFileSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new MediaWikiFileSearchResult(this.hit, this.n4j);
        break;
      case "CodeSearchResult":
        this.searchResultClassName = searchResultClassName;
        return new CodeSearchResult(this.hit, this.n4j);
        break;
      default:
        return this.#defaultSearchResultClass();
    }
  };

  #firstContainsSecond = (object1, object2) => {
    // ds1:implements: FIXME: match on annotations array containing annotation fragment(s)
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    for (const key of keys2) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = this.isObject(val1) && this.isObject(val2);
      if (
        (areObjects && !this.#firstContainsSecond(val1, val2)) ||
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
    const date = new Date();
    const now = Math.floor(date.getTime() / 1000);
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

module.exports = { SearchResultMatcher };
