require("./vis-network.min.js");
require("mediawiki.api");

DSMWAPI = class {
  constructor() {
    this.mwapi = new mw.Api();
  }

  numberOfNodes = (name) => {
    this.mwapi
      .get({
        action: "dataspectsapi",
        querytype: "numberofnodes",
      })
      .done(function (data) {
        $(name).text(
          data.data.numberofnodes + ": [" + data.data.labels.join(", ") + "]"
        );
      })
      .fail(function (data) {
        console.error("numberofnodes");
        console.error(data);
      });
  };

  numberOfDocsInIndex = (name) => {
    this.mwapi
      .get({
        action: "dataspectsapi",
        querytype: "numberofdocsinindex",
      })
      .done(function (data) {
        $(name).text(data.data.numberofdocsinindex);
      })
      .fail(function (data) {
        console.error("numberofnodes");
        console.error(data);
      });
  };

  numberOfRecordsInDatabase = (name) => {
    this.mwapi
      .get({
        action: "dataspectsapi",
        querytype: "numberofrecordsindatabase",
      })
      .done(function (data) {
        $(name).text(data.data.numberofrecordsindatabase);
      })
      .fail(function (data) {
        console.error("numberofnodes");
        console.error(data);
      });
  };

  concludedAnnotations = (name) => {
    const dataTablesOptions = {
      columns: [
        { title: "Predicate", data: "predicate" },
        { title: "Namespace", data: "namespace" },
        { title: "Annotation Type", data: "annotationType" },
        { title: "Count", data: "count" },
      ],
    };
    this.mwapi
      .get({
        action: "dataspectsapi",
        querytype: "concludedannotations",
      })
      .done(function (data) {
        dataTablesOptions.data = data.data.concludedannotations;
        $(name).DataTable(dataTablesOptions);
      })
      .fail(function (data) {
        console.error("numberofnodes");
        console.error(data);
      });
  };

  firstXCharacters = (firstXCharacters, property) => {
    this.mwapi
      .get({
        action: "dataspectsapi",
        querytype: "firstxcharacters",
        firstxcharacters: firstXCharacters,
        property: property,
      })
      .done(function (data) {
        const ctx = $("#firstXCharacters");
        const myChart = new Chart(ctx, {
          plugins: [],
          type: "bar",
          data: {
            labels: data.data.firstxcharacters.labels,
            datasets: [
              {
                label:
                  "How many pages share the first " +
                  firstXCharacters +
                  " characters in their '" +
                  property +
                  "' property?",
                data: data.data.firstxcharacters.datasets,
                borderWidth: 1,
              },
            ],
          },
          options: {
            indexAxis: "y",
          },
        });
      })
      .fail(function (data) {
        console.error("firstxcharacters");
        console.error(data);
      });
  };

  releaseTimestampXago = () => {
    this.mwapi
      .get({
        action: "dataspectsapi",
        querytype: "releasetimestampxago",
      })
      .done(function (data) {
        const ctx = $("#releaseTimestampXago");
        const myChart = new Chart(ctx, {
          plugins: [],
          type: "bar",
          data: {
            labels: data.data.releasetimestampxago.labels,
            datasets: [
              {
                label: "When were how many pages indexed?",
                data: data.data.releasetimestampxago.datasets,
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              datalabels: {
                anchor: "end",
                align: "top",
                formatter: function (value, context) {
                  return value + " page" + (value > 1 ? "s" : "");
                },
              },
            },
          },
        });
      })
      .fail(function (data) {
        console.error(data);
      });
  };

  testGraph = (name) => {
    this.mwapi
      .get({
        action: "dataspectsapi",
        querytype: "templatecallssubgraph",
        name: name,
      })
      .done(function (data) {
        putVisNetwork(data.data.templatecallssubgraph, name);
      })
      .fail(function (data) {
        console.error(data);
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
  // https://visjs.github.io/vis-network/docs/network/#Events
  var gmd = { nodes: [], edges: [] };
  for (const key in rawData.nodes) {
    var n = rawData.nodes[key];
    gmd.nodes.push({
      id: n.id,
      label: "<b>" + n.label + "</b>\n" + n.content.join("\n"),
      font: { face: "Monospace", align: "left", background: "white" },
      title: n.title,
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
      title: edge.title,
    });
  }
  return gmd;
};

module.exports = { DSMWAPI };
