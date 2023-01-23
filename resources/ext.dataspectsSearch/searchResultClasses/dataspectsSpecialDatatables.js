DataspectsSpecialDatatables = class extends SearchResult {
  constructor(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi) {
    super(error, info, hit, currentContext, instantsearch, dsMWAPI, mwapi);
  }

  searchResultBody = () => {
    return '<table id="table_id"></table>';
  };

  script = () => {
    const dataTablesOptions = {
      columns: [{ data: "name" }],
    };
    this.dsMWAPI.nodesList("table_id", dataTablesOptions);
  };
};

module.exports = { DataspectsSpecialDatatables };
