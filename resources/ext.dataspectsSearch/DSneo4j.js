require("./vis-network.min.js");
require("mediawiki.api");

DSNeo4j = class {
  constructor() {
    this.api = new mw.Api();
  }

  numberOfNodes = (name) => {
    this.api
      .get({
        action: "neo4japi",
        querytype: "numberofnodes",
      })
      .done(function (data) {
        $(name).text(data.data.numberofnodes);
      });
  };

  testGraph = (name) => {
    this.api
      .get({
        action: "neo4japi",
        querytype: "templatecallssubgraph",
        name: name,
      })
      .done(function (data) {
        putVisNetwork(data.data.templatecallssubgraph, name);
      });
  };
};

const putVisNetwork = (data, name) => {
  var rawData = convertToVisNetwork(data);
  new vis.Network(
    document.getElementById(name),
    {
      nodes: rawData.nodes,
      edges: rawData.edges,
    },
    // https://visjs.github.io/vis-network/docs/network/
    {
      autoResize: false,
      height: "100%",
      width: "100%",
      clickToUse: true,
      configure: { enabled: false },
      nodes: {
        shape: "box",
        fixed: false,
        font: {
          multi: true,
        },
      },
      edges: {
        arrows: "to",
        color: "blue",
        physics: true,
      },
      layout: {
        improvedLayout: true,
        hierarchical: {
          enabled: true,
          direction: "UD",
          shakeTowards: "leaves",
        },
      },
      physics: {
        enabled: false,
        stabilization: false,
        solver: "repulsion",
        repulsion: {
          nodeDistance: 800,
        },
      },
      interaction: {
        hover: true,
        hoverConnectedEdges: true,
        selectConnectedEdges: false,
      },
    }
  );
};

const convertToVisNetwork = (rawData) => {
  // https://visjs.github.io/vis-network/examples/
  var gmd = { nodes: [], edges: [] };
  for (const key in rawData.nodes) {
    var n = rawData.nodes[key];
    gmd.nodes.push({
      id: n.id,
      label: "<b>" + n.label + "</b>\n" + n.content.join("\n"),
      font: { face: "Monospace", align: "left", background: "white" },
    });
  }
  for (const key in rawData.edges) {
    var edge = rawData.edges[key];
    try {
      var label = edge.label.join("\n");
    } catch (error) {
      if (!Array.isArray(edge.label)) {
        console.error(
          "Error labeling edge: " + edge.label + " must be an array"
        );
        label = "";
      } else {
        console.error(error);
        label = "";
      }
    }
    gmd.edges.push({
      from: edge.from,
      to: edge.to,
      label: label,
    });
  }
  return gmd;
};

module.exports = { DSNeo4j };
