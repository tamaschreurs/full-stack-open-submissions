import anecdoteService from "../services/anecdoteService";

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "INIT_ANECDOTES":
      const anecdotes = action.data;
      return sortAnecdotes(anecdotes);
    case "VOTE":
      const id = action.data;
      const anecdote = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      const newAnecdotes = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
      return sortAnecdotes(newAnecdotes);
    case "ADD_ANECDOTE":
      const newAnecdote = action.data;
      return [...state, newAnecdote];
    default:
      return state;
  }
};

const sortAnecdotes = (anecdotes) => {
  return anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });
};

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = await anecdoteService.upVote(anecdote);
    dispatch({
      type: "VOTE",
      data: changedAnecdote.id,
    });
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
