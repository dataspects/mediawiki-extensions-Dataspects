let login = ["lex", "globi2000globi"];

import queryHitsCombinations from "../../fixtures/query-hits-combinations.json";

it("should show the saved search facets", () => {
  // cy.mediawiki_login(login);
  cy.visit("/wiki/Special:Dataspects");
  cy.get('[data-cy="showSavedSearchFacetsButton"]').click();
  cy.takeScreenshot("saved-search-facets");
  cy.get("li.savedSearchFacet a").first().click();
});
it("should save a new search facet and remove it again", () => {
  // Visit
  cy.mediawiki_login(login);
  const unixTimestamp = Math.floor(Date.now());
  cy.saveSearchFacet(unixTimestamp);
  // Check
  cy.get('[data-cy="showSavedSearchFacetsButton"]').click();
  cy.get('[data-cy="savedSearchFacetsUL"]').contains(
    "li.savedSearchFacet div[data-cy='searchFacetControl'] a.searchFacetControlName",
    unixTimestamp
  );
  // Remove
  cy.removeSearchFacet(unixTimestamp);
  cy.get('[data-cy="showSavedSearchFacetsButton"]').click().click();
  // Check
  cy.get('[data-cy="savedSearchFacetsUL"]')
    .contains(
      "li.savedSearchFacet div[data-cy='searchFacetControl'] a.searchFacetControlName",
      unixTimestamp
    )
    .should("not.exist");
});

it("should save two new search facets and use them again", () => {
  cy.mediawiki_login(login);
  const sfName0 = Math.floor(Date.now()).toString();
  cy.saveSearchFacet(sfName0);
  cy.typeIntoTextInput("input.ais-SearchBox-input", sfName0.substring(0, 3));
  cy.get('div[data-cy="searchFacetControl"]').contains(
    'a[data-cy="searchFacetControlName"]',
    sfName0
  );
  // const sfName1 = Math.floor(Date.now());
  // cy.saveSearchFacet(sfName1);
  //
  // cy.removeSearchFacet(sfName0);
  // cy.removeSearchFacet(sfName1);
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
