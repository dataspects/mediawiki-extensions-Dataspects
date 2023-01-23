DataspectsSpecialDatatables = class extends SearchResult {
  constructor(error, info, hit, currentContext, instantsearch, n4j, mwapi) {
    super(error, info, hit, currentContext, instantsearch, n4j, mwapi);
  }

  searchResultBody = () => {
    console.log(this.n4j);
    return '<table id="table_id"></table>';
  };

  script = () => {
    return $(document).ready(function () {
      $("#table_id").DataTable({
        data: [
          {
            name: "Tiger Nixon",
            position: "System Architect",
            salary: "$3,120",
            start_date: "2011/04/25",
            office: "Edinburgh",
            extn: "5421",
          },
          {
            name: "Garrett Winters",
            position: "Director",
            salary: "$5,300",
            start_date: "2011/07/25",
            office: "Edinburgh",
            extn: "8422",
          },
        ],
        columns: [
          { data: "name" },
          { data: "position" },
          { data: "salary" },
          { data: "office" },
        ],
      });
    });
  };
};

module.exports = { DataspectsSpecialDatatables };
