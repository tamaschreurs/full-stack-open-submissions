import React, { useEffect, useState } from "react";
import Person from "./components/Person";
import Message from "./components/Message";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({});

  useEffect(() => {
    personService.getPersons().then((data) => setPersons(data));
  }, []);

  const handleDeletePerson = (name, id) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService
        .removePerson(id)
        .then(() => {
          const newPersons = persons.filter((person) => person.id !== id);
          setPersons(newPersons);
          createMessage(`Succesfully removed ${name} from server`, "danger");
        })
        .catch((error) => {
          createMessage(
            `Cannot remove ${name}. Was already removed from server.`,
            "danger"
          );
        });
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const submittedPerson = persons.find((person) => person.name === newName);
    if (!submittedPerson) {
      const newPerson = { name: newName, number: newNumber };
      personService
        .addPerson(newPerson)
        .then((addedPerson) => {
          setPersons(persons.concat(addedPerson));
          resetInput();
          createMessage(`Added ${newName}`, "success");
        })
        .catch((error) => {
          alert(`${newName} could not be added to the database.`);
        });
    } else {
      personService
        .changeNumber(submittedPerson, newNumber)
        .then((updatedPerson) => {
          const newPersons = persons.map((person) =>
            person.id !== submittedPerson.id ? person : updatedPerson
          );
          setPersons(newPersons);
          resetInput();
          createMessage(`Updated ${newName}`, "success");
        });
    }
  };

  const resetInput = () => {
    setNewName("");
    setNewNumber("");
  };

  const createMessage = (content, type) => {
    setMessage({ content, type });
    setTimeout(() => setMessage({}), 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message.content} type={message.type} />
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
          return (
            <Person
              person={person}
              key={person.name}
              deletePerson={() => handleDeletePerson(person.name, person.id)}
            />
          );
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

export default App;
