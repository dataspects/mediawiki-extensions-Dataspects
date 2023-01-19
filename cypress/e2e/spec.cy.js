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
    cy.mediawiki_login(login);
    cy.visit("/wiki/Special:Dataspects");
    cy.get('[data-cy="showSavedSearchFacetsButton"]').click();
    cy.takeScreenshot("saved-search-facets");
  });
  it.only("should show the 'Save search facet' form", () => {
    // cy.mediawiki_login(login);
    cy.visit("/wiki/Special:Dataspects");
    cy.get('[data-cy="saveCurrentFacetButton"]').click();
    cy.get('[data-cy="saveSearchFacetFormHTML"]')
      .should("be.visible")
      .then((form$) => {
        // FIXME: can this .then() be moved as a function to commands.js?
        form$.on("submit", (e) => {
          e.preventDefault();
        });
      });
    cy.typeIntoTextInput(
      '[data-cy="saveSearchFacetFormHTMLName"]',
      "My search facet"
    );
    cy.get('[data-cy="saveSearchFacetFormHTMLSave"]').click();
  });
});
