let login = [Cypress.env("TESTUSERNAME"), Cypress.env("TESTPASSWORD")];

import queryHitsCombinations from "../../fixtures/query-hits-combinations.json";

it.only("should save a new facet, find, use and remove it", () => {
  cy.mediawiki_login(login);
  cy.visit("/wiki/Special:Dataspects");
  // Configure a facet
  cy.get("span.ds0__specialAspect").contains("Selected Aspects").click();
  cy.get("span.ds0__specialAspect").contains("Selected Aspect 1").click();
  cy.take_screenshot("configure-a-facet");
  // Save the facet
  const unixTimestamp = Math.floor(Date.now());
  cy.save_search_facet(unixTimestamp);
  cy.take_screenshot("save-a-facet");
  // Clear facets
  cy.clear_current_facet();
  cy.number_of_search_results_should_be(2);
  // Show facets
  cy.get('[data-cy="showSavedSearchFacetsButton"]').click();
  cy.take_screenshot("show-facets");
  // Load the facet from the facet list
  cy.get('[data-cy="savedSearchFacetsUL"]')
    .contains(
      "li.savedSearchFacet div[data-cy='searchFacetControl'] a.searchFacetControlName",
      unixTimestamp
    )
    .click();
  cy.take_screenshot("load-a-facet");
  cy.number_of_search_results_should_be(1);
  // Clear facets
  cy.clear_current_facet();
  cy.number_of_search_results_should_be(2);
  // Find and load the facet from typeahead
  cy.type_text_into_text_input("input.ais-SearchBox-input", "75 66");
  cy.take_screenshot("find-and-load-a-facet");
  cy.click_first_typeahead_searchfacetcontrol();
  cy.number_of_search_results_should_be(1);
  // Remove the facet
  cy.remove_search_facet(unixTimestamp);
  cy.take_screenshot("remove-a-facet");
  cy.clear_current_facet();
  cy.number_of_search_results_should_be(2);
});
