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

    describe("When a blog is added", function () {
      beforeEach(function () {
        const blog = {
          title: "An unremarkable blog",
          author: "JK Rowling",
          url: "example.com/ablog",
        };
        const { token } = JSON.parse(window.localStorage.getItem("userInfo"));
        cy.request({
          url: "http://localhost:3003/api/blogs",
          method: "POST",
          body: blog,
          auth: { bearer: token },
        });
        cy.visit(home);
      });

      it("it can be liked", function () {
        cy.contains("view").click();
        cy.get(".like").click();
        cy.get("#like-info").contains("1");
      });

      it("it can be removed by the user that created it", function () {
        cy.contains("view").click();
        cy.contains("An unremarkable blog").contains("remove").click();
        cy.contains("Blog succesfully removed");
        cy.get("p").should("have.length", 1);
      });
    });
  });
});
