let login = ["lex", "globi2000globi"];

import queryHitsCombinations from "../../fixtures/query-hits-combinations.json";

describe("MediaWiki Extension:Dataspects", () => {
  it("should be able to search for 'clone'", () => {
    cy.visit("/wiki/Special:Dataspects");
    cy.fixture("query-hits-combinations").then((scenario) => {
      cy.type_text_into_text_input(
        "input.ais-SearchBox-input",
        scenario[0].query
      );
      cy.get('div.hit[data-cy="' + scenario[0].hitIdInTop5 + '"]').should(
        "be.visible"
      );
      cy.take_screenshot("search-results");
    });
  });

  it("should be triggered by MediaWiki's top right corner search input's 'containing option'", () => {
    cy.visit("/wiki");
    cy.fixture("query-hits-combinations").then((scenario) => {
      cy.type_text_into_text_input("#searchInput", scenario[0].query);
      cy.get("div.special-query").click();
      cy.get('div.hit[data-cy="' + scenario[0].hitIdInTop5 + '"]').should(
        "be.visible"
      );
    });
  });
});

// cy.remove_search_facet(unixTimestamp);

// cy.type_text_into_text_input("input.ais-SearchBox-input", sfName0.substring(0, 3));

// cy.fixture("query-hits-combinations").then((scenario) => {
//   cy.type_text_into_text_input("input.ais-SearchBox-input", scenario[1].query);
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
