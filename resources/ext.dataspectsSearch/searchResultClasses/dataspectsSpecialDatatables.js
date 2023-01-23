DataspectsSpecialDatatables = class extends SearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
  }

  searchResultBody = () => {
    return '<table id="table_id"></table>';
  };

  script = () => {
    console.log(this.dsMWAPI);
    this.dsMWAPI.nodesList();
  };
};

module.exports = { DataspectsSpecialDatatables };
