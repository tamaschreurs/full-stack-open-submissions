import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const handleNextClick = () => {
    const randomInt = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomInt);
  };

  const handleVote = () => {
    const copy = { ...votes };
    if (copy[selected] != null) {
      copy[selected] += 1;
    } else {
      copy[selected] = 1;
    }

    setVotes(copy);
  };

  const mostVoted = () => {
    let highestIndex = 0;
    let highestValue = 0;
    for (const index in votes) {
      if (votes[index] > highestValue) {
        highestValue = votes[index];
        highestIndex = index;
      }
    }
    return highestIndex;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <br />
      <Button label="vote" onClick={handleVote} />
      <Button label="next anecdote" onClick={handleNextClick} />
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[mostVoted()]} votes={votes[mostVoted()]} />
    </div>
  );
};

const Button = (props) => {
  return <input type="button" value={props.label} onClick={props.onClick} />;
};

const Anecdote = (props) => {
  const { text, votes } = props;
  return (
    <span>
      {text}
      <br />
      Has {votes != null ? votes : 0} votes.
    </span>
  );
};

export default App;
