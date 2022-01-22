describe("Blog app", function () {
  const home = "http://localhost:3000";
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "demo-user",
      name: "Demo de Graaf",
      password: "sostupid",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit(home);
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

  describe("When logged in", function () {
    beforeEach(function () {
      const user = {
        username: "demo-user",
        password: "sostupid",
      };
      cy.request("POST", "http://localhost:3003/api/login", user).then(
        (response) => {
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(response.body)
          );
          cy.visit(home);
        }
      );
    });

    it("a blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("New blog title");
      cy.get("#author").type("Author de Pauthor");
      cy.get("#url").type("http://example.com/authordepauthor");
      cy.get("#submit-blog").click();

      cy.get(".success");
      cy.contains("view");
      cy.contains("New blog title Author de Pauthor");
    });
  });
});
