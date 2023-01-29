let login = [Cypress.env("TESTUSERNAME"), Cypress.env("TESTPASSWORD")];

import queryHitsCombinations from "../../fixtures/query-hits-combinations.json";

it.only("should 1) save a new facet and 2) use it", () => {
  cy.mediawiki_login(login);
  cy.visit("/wiki/Special:Dataspects");
  cy.get("span.ds0__specialAspect").contains("Selected Aspects").click();
  cy.get("span.ds0__specialAspect").contains("Selected Aspect 1").click();
  const unixTimestamp = Math.floor(Date.now());
  cy.save_search_facet(unixTimestamp);
  cy.clear_current_facet();
  cy.number_of_search_results_should_be(2);
  cy.get('[data-cy="showSavedSearchFacetsButton"]').click();
  cy.get('[data-cy="savedSearchFacetsUL"]')
    .contains(
      "li.savedSearchFacet div[data-cy='searchFacetControl'] a.searchFacetControlName",
      unixTimestamp
    )
    .click();
  cy.number_of_search_results_should_be(1);
  cy.remove_search_facet(unixTimestamp);
  cy.clear_current_facet();
  cy.number_of_search_results_should_be(2);
});

// cy.remove_search_facet(unixTimestamp);

// cy.typeIntoTextInput("input.ais-SearchBox-input", sfName0.substring(0, 3));

// cy.fixture("query-hits-combinations").then((scenario) => {
//   cy.typeIntoTextInput("input.ais-SearchBox-input", scenario[1].query);
//   cy.get('div.hit[data-cy="' + scenario[1].hitIdInTop5 + '"]').should(
//     "be.visible"
//   );
//   cy.get('div[data-cy="searchFacetControl"]')
//     .contains('a[data-cy="searchFacetControlName"]', scenario[0].query)
//     .click();
//   cy.get('div.hit[data-cy="' + scenario[0].hitIdInTop5 + '"]').should(
//     "be.visible"
//   );
// });
