import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import AuthorEdit from "./components/AuthorEdit";
import Login from "./components/Login";
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("user-token"));
  }, []);

  const loggedIn = !!token;

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {loggedIn ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("edit")}>edit author</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button
              onClick={() => {
                setToken(null);
                localStorage.clear();
              }}
            >
              logout
            </button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <AuthorEdit show={page === "edit"} />

      <Recommend show={page === "recommend"} />

      <Login show={page === "login"} setPage={setPage} setToken={setToken} />
    </div>
  );
};

export default App;
