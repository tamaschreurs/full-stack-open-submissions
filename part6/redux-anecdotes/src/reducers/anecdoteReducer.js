import anecdoteService from "../services/anecdoteService";

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
      const newAnecdote = action.data;
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
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "ADD_ANECDOTE",
      data: anecdote,
    });
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default reducer;
