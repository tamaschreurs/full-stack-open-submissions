import React from "react";

const Person = (props) => {
  const { person, deletePerson } = props;

  return (
    <div>
      {person.name} {person.number}{" "}
      <button type="button" onClick={deletePerson}>
        delete
      </button>
    </div>
  );
};

export default Person;
