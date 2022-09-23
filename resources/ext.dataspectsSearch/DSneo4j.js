require("./vis-network.min.js");
DSNeo4j = class {
  constructor() {
    var nodes = new vis.DataSet([
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
    ]);

    // create an array with edges
    var edges = new vis.DataSet([{ from: 1, to: 2 }]);

    // create a network
    var container = document.getElementById("graphTest");
    var data = {
      nodes: nodes,
      edges: edges,
    };
    var options = {};
    var network = new vis.Network(container, data, options);
  }

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
