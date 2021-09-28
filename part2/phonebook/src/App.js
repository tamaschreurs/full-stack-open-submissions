import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    // { name: "Arto Hellas", number: "040-123456" },
    // { name: "Ada Lovelace", number: "39-44-5323523" },
    // { name: "Dan Abramov", number: "12-43-234345" },
    // { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!persons.find((person) => person.name === newName)) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    } else {
      alert(`${newName} is already added to phonebook.`);
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <TextInput
          label="filter shown with"
          value={filter}
          handleChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <h2>Add new</h2>
      <PersonForm
        onSubmit={handleNameSubmit}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter.toLowerCase())) {
          return <Person person={person} key={person.name} />;
        } else {
          return null;
        }
      })}
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        label="name:"
        handleChange={props.onNameChange}
        value={props.newName}
      />
      <TextInput
        label="number:"
        handleChange={props.onNumberChange}
        value={props.newNumber}
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const TextInput = (props) => {
  const { handleChange, value, label } = props;
  return (
    <div>
      {label} <input type="text" onChange={handleChange} value={value} />
    </div>
  );
};

const Person = (props) => {
  const { person } = props;

  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

export default App;
