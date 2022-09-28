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

const wait = 500;

Cypress.Commands.add("takeScreenshot", (imageName) => {
  cy.wait(1000);
  cy.screenshot(imageName);
});

Cypress.Commands.add("mediawiki_login", (username, password) => {
  cy.visit("/w/index.php?title=Special:UserLogin");
  cy.get("input#wpName1").type(username);
  cy.get("input#wpPassword1").type(password);
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
