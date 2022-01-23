import React from "react";

const Anecdote = ({ content, votes, handleVote }) => (
  <div>
    <div>{content}</div>
    <div>
      has {votes}
      <button onClick={handleVote}>vote</button>
    </div>
  </div>
);

export default Anecdote;
