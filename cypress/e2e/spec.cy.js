describe("dataspects Search", () => {
  let login = ["lex", "globi2000globi"];
  it("should load the dataspects Search page", () => {
    cy.mediawiki_login(login[0], login[1]);
    cy.visit("/wiki/Special:DataspectsSearch");
    cy.takeScreenshot("dataspects-Search-page");
    cy.typeIntoTextInput("input.ais-SearchBox-input", "clone");
    cy.takeScreenshot("instant-search-results");
    cy.clearCurrentFacet();
    cy.takeScreenshot("cleared-facet");
  });
});
