describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "demo-user",
      name: "Demo de Graaf",
      password: "sostupid",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.get("#username");
    cy.get("#password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("demo-user");
      cy.get("#password").type("sostupid");
      cy.contains("login").click();
      cy.contains("Demo de Graaf logged in succesfully");
      cy.contains("log out");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("demo-user");
      cy.get("#password").type("sostupiiod");
      cy.contains("login").click();
      cy.contains("Wrong credentials").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
      cy.contains("Log in to application");
    });
  });
});
