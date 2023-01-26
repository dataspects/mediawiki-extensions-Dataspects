let login = ["lex", "globi2000globi"];

import queryHitsCombinations from "../../fixtures/query-hits-combinations.json";

describe("dataspects", () => {
  it("should be able to search for 'clone'", () => {
    cy.visit("/wiki/Special:Dataspects");
    cy.fixture("query-hits-combinations").then((scenario) => {
      cy.typeIntoTextInput("input.ais-SearchBox-input", scenario[0].query);
      cy.get('div.hit[data-cy="' + scenario[0].hitIdInTop5 + '"]').should(
        "be.visible"
      );
    });
  });
});

describe("dataspects", () => {
  it("should be triggered by MediaWiki's top right corner search input's 'containing option'", () => {
    cy.visit("/wiki");
    cy.fixture("query-hits-combinations").then((scenario) => {
      cy.typeIntoTextInput("#searchInput", scenario[0].query);
      cy.get("div.special-query").click();
      cy.get('div.hit[data-cy="' + scenario[0].hitIdInTop5 + '"]').should(
        "be.visible"
      );
    });
  });
});
