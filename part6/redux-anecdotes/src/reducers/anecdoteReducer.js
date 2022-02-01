const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "INIT_ANECDOTES":
      const anecdotes = action.data;
      return anecdotes;
    case "VOTE":
      const id = action.data.id;
      const anecdote = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      const newAnecdotes = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
      return newAnecdotes.sort((a, b) => {
        return b.votes - a.votes;
      });
    case "ADD_ANECDOTE":
      const content = action.data.content;
      const newAnecdote = asObject(content);
      return [...state, newAnecdote];
    default:
      return state;
  }
};

export const addVote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const addAnecdote = (content) => {
  return {
    type: "ADD_ANECDOTE",
    data: { content },
  };
};

export const initAnecdotes = (data) => {
  return {
    type: "INIT_ANECDOTES",
    data,
  };
};

export default reducer;
