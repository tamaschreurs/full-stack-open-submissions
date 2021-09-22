import React from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part info={props.parts[0]} />
      <Part info={props.parts[1]} />
      <Part info={props.parts[2]} />
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.info.name} {props.info.exercises}
    </p>
  );
};

const Total = (props) => {
  let total = 0;
  let i = 0;
  while (i < props.parts.length) {
    total += props.parts[i].exercises;
    i++;
  }
  return <p>Number of exercises {total}</p>;
};

export default App;
