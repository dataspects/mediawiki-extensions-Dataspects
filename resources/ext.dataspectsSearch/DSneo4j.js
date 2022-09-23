DSNeo4j = class {
  constructor() {}

  numberOfNodes = (elementID) => {
    mw.loader.using("mediawiki.api", function () {
      //FIXME
      var api = new mw.Api();
      api
        .get({
          action: "neo4japi",
          querytype: "numberofnodes",
        })
        .done(function (data) {
          $(elementID).text(data.data.numberofnodes);
        });
    });
  };

  // toNumber({ low, high }) {
  //   let res = high;
  //   for (let i = 0; i < 32; i++) {
  //     res *= 2;
  //   }
  //   return low + res;
  // }
};

module.exports = { DSNeo4j };
