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
  it("should display DataspectsSpecialDatatables for f=Bryan", () => {
    cy.visit("/wiki/Special:Dataspects?f=Bryan");
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

  it("should search by the 'f' URL parameter", () => {
    cy.fixture("query-hits-combinations").then((scenario) => {
      cy.visit("/wiki/Special:Dataspects?f=" + scenario[2].searchFacetName);
      cy.get('div.hit[data-cy="' + scenario[2].hitIdInTop5 + '"]').should(
        "be.visible"
      );
    });
  });

  it("should show the saved search facets", () => {
    // cy.mediawiki_login(login);
    cy.visit("/wiki/Special:Dataspects");
    cy.get('[data-cy="showSavedSearchFacetsButton"]').click();
    cy.takeScreenshot("saved-search-facets");
    cy.get("li.savedSearchFacet a").first().click();
  });

  it("should find 'backup' and then 'About cloning' by search facet", () => {
    cy.visit("/wiki/Special:Dataspects");
    cy.fixture("query-hits-combinations").then((scenario) => {
      cy.typeIntoTextInput("input.ais-SearchBox-input", scenario[1].query);
      cy.get('div.hit[data-cy="' + scenario[1].hitIdInTop5 + '"]').should(
        "be.visible"
      );
      cy.get('div[data-cy="searchFacetControl"]')
        .contains('a[data-cy="searchFacetControlName"]', scenario[0].query)
        .click();
      cy.get('div.hit[data-cy="' + scenario[0].hitIdInTop5 + '"]').should(
        "be.visible"
      );
    });
  });
});
