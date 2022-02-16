import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR, AUTHOR_NAMES } from "../utils/queries";

const AuthorEdit = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [ChangeAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const authorResults = useQuery(AUTHOR_NAMES);

  const handleAuthorUpdate = (event) => {
    event.preventDefault();

    ChangeAuthor({ variables: { name, born: parseInt(born) } });

    setName("");
    setBorn("");
  };

  if (!props.show) {
    return null;
  } else if (authorResults.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={handleAuthorUpdate}>
        name{" "}
        <select value={name} onChange={({ target }) => setName(target.value)}>
          <option></option>
          {authorResults.data.allAuthors.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <br />
        born{" "}
        <input
          type="text"
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
        <br />
        <button>update author</button>
      </form>
    </div>
  );
};

export default AuthorEdit;
