let login = [Cypress.env("TESTUSERNAME"), Cypress.env("TESTPASSWORD")];

import queryHitsCombinations from "../../fixtures/query-hits-combinations.json";

it.only("should save a new facet, find, use and remove it", () => {
  cy.mediawiki_login(login);
  cy.visit("/wiki/Special:Dataspects");
  // Configure a facet
  cy.get("span.ds0__specialAspect")
    .contains("Selected Aspects")
    .then(($target) => {
      cy.clip_screenshot_and_click($target, "configure-a-facet");
    });
  cy.get("span.ds0__specialAspect").contains("Selected Aspect 1").click();
  // Save the facet
  const unixTimestamp = Math.floor(Date.now());
  cy.clip_screenshot_and_save_search_facet(unixTimestamp, "save-a-facet");

  // Clear facets
  cy.__clear_current_facet();
  cy.__number_of_search_results_should_be(2);
  // Show facets
  cy.get('[data-cy="showSavedSearchFacetsButton"]').then(($target) => {
    cy.clip_screenshot_and_click($target, "show-facets");
  });
  // Load the facet from the facet list
  cy.get('[data-cy="savedSearchFacetsUL"]')
    .contains(
      "li.savedSearchFacet div[data-cy='searchFacetControl'] a.searchFacetControlName",
      unixTimestamp
    )
    .click();
  cy.__take_screenshot("load-a-facet");
  cy.__number_of_search_results_should_be(1);
  // Clear facets
  cy.__clear_current_facet();
  cy.__number_of_search_results_should_be(2);
  // Find and load the facet from typeahead
  cy.type_text_into_text_input("input.ais-SearchBox-input", "75 66");
  cy.__take_screenshot("find-and-load-a-facet");
  cy.click_first_typeahead_searchfacetcontrol();
  cy.__number_of_search_results_should_be(1);
  // Remove the facet
  cy.remove_search_facet(unixTimestamp);
  cy.__take_screenshot("remove-a-facet");
  cy.__clear_current_facet();
  cy.__number_of_search_results_should_be(2);
});
