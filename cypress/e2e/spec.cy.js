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
  it("should save a new search facet and remove it again", () => {
    // Visit
    cy.mediawiki_login(login);
    const unixTimestamp = Math.floor(Date.now());
    cy.saveSearchFacet(unixTimestamp);
    // Check
    cy.get('[data-cy="showSavedSearchFacetsButton"]').click();
    cy.get('[data-cy="savedSearchFacetsUL"]').contains(
      "li.savedSearchFacet a.itemName",
      unixTimestamp
    );
    // Remove
    cy.removeSearchFacet(unixTimestamp);
    // Check
    cy.get('[data-cy="savedSearchFacetsUL"]')
      .contains("li.savedSearchFacet a.itemName", unixTimestamp)
      .should("not.exist");
  });

  it.only("should save two new search facets and use them again", () => {
    cy.mediawiki_login(login);
    const sfName0 = Math.floor(Date.now()).toString();
    cy.saveSearchFacet(sfName0);
    cy.typeIntoTextInput("input.ais-SearchBox-input", sfName0.substring(0, 3));
    cy.get('span[data-cy="searchFacetControl"]').contains(
      'span[data-cy="searchFacetControlName"]',
      sfName0
    );
    // const sfName1 = Math.floor(Date.now());
    // cy.saveSearchFacet(sfName1);
    //
    // cy.removeSearchFacet(sfName0);
    // cy.removeSearchFacet(sfName1);
  });
});
