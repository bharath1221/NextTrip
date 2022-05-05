/// <reference types="cypress" />

describe("trip", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have metro transit image in header", () => {
    cy.get("header")
      .find("img")
      .should("have.attr", "src", "/MetroTransitLogo.svg");
  });

  it("should have a sub heading", () => {
    cy.get("[data-cy=sub-heading]").contains("Real-time Departures");
  });

  it("should render tabs", () => {
    cy.get("[data-cy=tabs] li").first().get("button").contains("By route");
    cy.get("[data-cy=tabs] li").last().get("button").contains("By stop #");
  });

  it("should have by route as active tab on initial load", () => {
    cy.get("[data-cy=tabs] li")
      .first()
      .get("button")
      .should("have.class", "active");
  });

  it("should render by stop as active tab on tab click", () => {
    cy.get("[data-cy=tabs] li")
      .last()
      .get("button")
      .contains("By stop #")
      .click();
    cy.get("[data-cy=tabs] li")
      .last()
      .get("button")
      .should("have.class", "active");
  });

  it("should test by route tab", () => {
    cy.intercept("GET", "**/nextripv2/routes", {
      fixture: "route.json",
    }).as("getRoutes");
    cy.wait("@getRoutes").its("response.statusCode").should("eq", 200);
    cy.get("[data-cy=select-route]").select("METRO Blue Line");

    cy.intercept("GET", "**/nextripv2/directions/**", {
      fixture: "direction.json",
    }).as("getDirections");
    cy.wait("@getDirections");
    cy.get("[data-cy=select-direction]").select("Northbound");

    cy.intercept("GET", "**/nextripv2/stops/**", {
      fixture: "stop.json",
    }).as("getStops");
    cy.wait("@getStops")
      .its("response.statusCode")
      .should("eq", 200);

    cy.get("[data-cy=select-stop]").select("Mall of America Station");
    cy.get("[data-cy=stop-description]").contains("MOA Transit Station");

    cy.intercept("GET", "**/nextripv2/**", {
      fixture: "departure.json",
    }).as("getDepartures");
    cy.wait("@getDepartures")
      .its("response.statusCode")
      .should("eq", 200);

    cy.get("[data-cy=20521605-MAR22-RAIL-Weekday-01] td")
      .first()
      .contains("Blue");
  });

  it("should test by stop tab", () => {
    cy.get("[data-cy=tabs] li")
      .last()
      .get("button")
      .contains("By stop #")
      .click();
    cy.get("[data-cy=tabs] li")
      .last()
      .get("button")
      .should("have.class", "active");
    cy.get("[data-cy=stop-number]").type("51405");

    cy.intercept("GET", "**/nextripv2/**", {
      fixture: "departure.json",
    }).as("getDepartures");
    cy.wait("@getDepartures")
      .its("response.statusCode")
      .should("eq", 200);

    cy.get("[data-cy=20521605-MAR22-RAIL-Weekday-01] td")
      .first()
      .contains("Blue");
  });
});
