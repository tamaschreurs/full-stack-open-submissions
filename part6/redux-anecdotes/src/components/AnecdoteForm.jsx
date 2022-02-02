import React from "react";
import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setMessage } from "../reducers/messageReducer";

const AnecdoteForm = (props) => {
  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    props.addAnecdote(content);
    props.setMessage(`Anecdote added: ${content}`, 5);
    event.target.content.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  addAnecdote,
  setMessage,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
