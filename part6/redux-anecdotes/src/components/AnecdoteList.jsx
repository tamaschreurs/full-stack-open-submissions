import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import Anecdote from "./Anecdote";
import { createMessage, removeMessage } from "../reducers/messageReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter)
    );
  });
  const previousMessage = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    if (previousMessage) {
      clearTimeout(previousMessage.timeoutId);
    }
    dispatch(addVote(anecdote));
    const timeoutId = setTimeout(() => dispatch(removeMessage()), 5000);
    dispatch(createMessage(`You voted '${anecdote.content}'`, timeoutId));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          handleVote={() => vote(anecdote)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
