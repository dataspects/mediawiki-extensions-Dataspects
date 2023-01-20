let login = ["lex", "globi2000globi"];

describe("dataspects", () => {
  it("should be able to search for 'clone'", () => {
    cy.mediawiki_login(login);
    cy.visit("/wiki/Special:Dataspects");
    cy.takeScreenshot("dataspects-Search-page");
    cy.typeIntoTextInput("input.ais-SearchBox-input", "clone");
    cy.takeScreenshot("instant-search-results");
    cy.clearCurrentFacet();
    cy.takeScreenshot("cleared-facet");
  });
});

describe("dataspects", () => {
  it("should show the saved search facets", () => {
    // cy.mediawiki_login(login);
    cy.visit("/wiki/Special:Dataspects");
    cy.get('[data-cy="showSavedSearchFacetsButton"]').click();
    cy.takeScreenshot("saved-search-facets");
    cy.get("li.savedSearchFacet a").first().click();
  });
  it.only("should save a new search facet and remove it again", () => {
    // Visit
    cy.mediawiki_login(login);
    cy.visit("/wiki/Special:Dataspects");
    // Open
    cy.get('[data-cy="saveCurrentFacetButton"]').click();
    cy.get('[data-cy="saveSearchFacetFormHTML"]')
      .should("be.visible")
      .then((form$) => {
        // FIXME: can this .then() be moved as a function to commands.js?
        form$.on("submit", (e) => {
          e.preventDefault();
        });
      });
    // Type
    const unixTimestamp = Math.floor(Date.now() / 1000);
    cy.typeIntoTextInput(
      '[data-cy="saveSearchFacetFormHTMLName"]',
      unixTimestamp
    );
    // Save
    cy.get('[data-cy="saveSearchFacetFormHTMLSave"]').click();
    // Check
    cy.get('[data-cy="showSavedSearchFacetsButton"]').click();
    cy.get('[data-cy="savedSearchFacetsUL"]').contains(
      "li.savedSearchFacet a.itemName",
      unixTimestamp
    );
    // Remove
    cy.get('[data-cy="savedSearchFacetsUL"]')
      .contains("li.savedSearchFacet a.itemName", unixTimestamp)
      .siblings()
      .contains("a.itemAction", "remove")
      .click();
    cy.get('[data-cy="savedSearchFacetsUL"]')
      .contains("li.savedSearchFacet a.itemName", unixTimestamp)
      .should("not.exist");
  });
});
