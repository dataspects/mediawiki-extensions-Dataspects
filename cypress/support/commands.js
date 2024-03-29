// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//LEX2206071345

// FIXME
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

const wait = 500;

Cypress.Commands.add("__take_screenshot", (imageName, coords) => {
  const surroundingsFramePadding = 200;
  imageName = imageName + "__" + surroundingsFramePadding;
  cy.wait(1000);
  if (coords) {
    cy.screenshot(imageName, {
      capture: "viewport",
      clip: {
        x: coords.x - surroundingsFramePadding / 2,
        y: coords.y - surroundingsFramePadding / 2,
        width: coords.width + surroundingsFramePadding,
        height: coords.height + surroundingsFramePadding,
      },
    });
  } else {
    cy.screenshot(imageName, {
      capture: "viewport",
    });
  }
});

Cypress.Commands.add("clip_screenshot_and_click", (target, name) => {
  var coords = target[0].getBoundingClientRect();
  cy.__take_screenshot(name, coords);
  target.click();
});

Cypress.Commands.add("mediawiki_login", (login) => {
  cy.visit("/w/index.php?title=Special:UserLogin");
  cy.get("input#wpName1").type(login[0]);
  cy.get("input#wpPassword1").type(login[1]);
  cy.get("button#wpLoginAttempt").click();
});

Cypress.Commands.add("pageForm_cancel", () => {
  cy.wait(wait);
  cy.get("span.oo-ui-labelElement-label").contains("Cancel").parent().click();
});

Cypress.Commands.add("pageForm_savePage", () => {
  cy.wait(wait);
  cy.get("span.oo-ui-labelElement-label")
    .contains("Save page")
    .parent()
    .click();
});

Cypress.Commands.add("eppoForm_addAProperty", (predicate, object) => {
  cy.wait(wait);
  cy.get("span.oo-ui-labelElement-label")
    .contains("Add a property")
    .parent()
    .click();
  cy.wait(wait);
  cy.get("input[origname='Annotation[AnnotationPredicate]']")
    .last()
    .type(predicate)
    .type("{enter}");
  cy.get("input[origname='Annotation[AnnotationObject]']").last().type(object);
});

Cypress.Commands.add("eppoForm_editTitle", (title, topicType) => {
  cy.get("input[name='" + topicType + "[eppo0:hasEntityTitle]']").type(title);
});
Cypress.Commands.add("eppoForm_editBlurb", (blurb, topicType) => {
  cy.get("textarea[name='" + topicType + "[eppo0:hasEntityBlurb]']").type(
    blurb
  );
});
Cypress.Commands.add("eppoForm_editFreeText", (freeText) => {
  cy.get("textarea[name='pf_free_text']").type(freeText);
});

Cypress.Commands.add("mediawiki_refresh", () => {
  cy.wait(2000);
  cy.get("a").contains("Refresh").click({ force: true });
  cy.get("#content").then(($content) => {
    if ($content.find("button").length > 0) {
      $content.find("button").contains("OK").click();
    }
  });
  cy.wait(2000);
});

// dataspectsSearch
Cypress.Commands.add("type_text_into_text_input", (selector, text) => {
  cy.get(selector).type(text);
  cy.wait(1000);
});

//////////////////////////

const predicateNameReformattedBySMW = (predicateName) => {
  return predicateName
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/__/, " ");
};

Cypress.Commands.add("dataspects_initializeOrViewProperty", (predicateName) => {
  let pn = predicateNameReformattedBySMW(predicateName);
  cy.get("a")
    .contains(pn)
    .invoke("attr", "class")
    .then((classList) => {
      cy.get("a").contains(pn).click(); // class="new" or
      if (classList && classList.includes("new")) {
        cy.pageForm_savePage();
      }
    });
});

Cypress.Commands.add("click_headerTab", (headerTab) => {
  cy.wait(1000); // ? Unnecessary accroding to https://docs.cypress.io/guides/references/best-practices
  cy.get("span.oo-ui-labelElement-label").contains(headerTab).click();
});

Cypress.Commands.add("showHelpingHints", () => {
  cy.get("#mwstakeHelpHintButton").click();
});

Cypress.Commands.add(
  "clip_screenshot_and_save_search_facet",
  (searchFacetName, screenshotName) => {
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
    cy.type_text_into_text_input(
      '[data-cy="saveSearchFacetFormHTMLName"]',
      searchFacetName
    );
    // Save
    cy.get('[data-cy="saveSearchFacetFormHTMLSave"]').then(($target) => {
      var coords = $target[0].getBoundingClientRect();
      cy.__take_screenshot(screenshotName, coords);
      $target.click();
    });
  }
);

Cypress.Commands.add("remove_search_facet", (name) => {
  cy.get('[data-cy="savedSearchFacetsList"]').then(($element) => {
    if (!$element.is(":visible")) {
      cy.get('[data-cy="showSavedSearchFacetsButton"]').click();
    }
  });
  cy.get('[data-cy="savedSearchFacetsUL"]')
    .contains(
      "li.savedSearchFacet div[data-cy='searchFacetControl'] a.searchFacetControlName",
      name
    )
    .siblings()
    .contains("a.searchfacetaction", "remove")
    .click();
});

Cypress.Commands.add("__number_of_search_results_should_be", (number) => {
  cy.get("li.ais-InfiniteHits-item").should("have.length", number);
});

Cypress.Commands.add("__clear_current_facet", (number) => {
  cy.get('[data-cy="ds-clear-current-facet"]').click();
});

Cypress.Commands.add("click_first_typeahead_searchfacetcontrol", () => {
  cy.get("div#searchFacetControls .searchFacetControlName.searchfacetaction")
    .first()
    .click();
});
