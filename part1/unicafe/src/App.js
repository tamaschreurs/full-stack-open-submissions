import React, { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button label="good" onClick={() => setGood(good + 1)} />
        <Button label="neutral" onClick={() => setNeutral(neutral + 1)} />
        <Button label="bad" onClick={() => setBad(bad + 1)} />
      </div>
      <h1>Statistics</h1>
      {good === 0 && neutral === 0 && bad === 0 ? (
        <span>No feedback given</span>
      ) : (
        <Statistics goodCount={good} neutralCount={neutral} badCount={bad} />
      )}
    </div>
  );
};

const Button = (props) => {
  return <input type="button" value={props.label} onClick={props.onClick} />;
};

const Statistics = (props) => {
  const { goodCount, neutralCount, badCount } = props;
  const totalReviews = goodCount + neutralCount + badCount;

  const calculateAverage = () => {
    const totalPoints = goodCount - badCount;
    return totalPoints / totalReviews;
  };

  return (
    <table>
      <tbody>
        <StatisticLine label="good" value={goodCount} />
        <StatisticLine label="neutral" value={neutralCount} />
        <StatisticLine label="bad" value={badCount} />
        <StatisticLine label="all" value={totalReviews} />
        <StatisticLine label="average" value={calculateAverage()} />
        <StatisticLine
          label="positive"
          value={(goodCount / totalReviews) * 100 + "%"}
        />
      </tbody>
    </table>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.label}</td>
      <td>{props.value}</td>
    </tr>
  );
};

export default App;
