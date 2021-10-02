import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const addPerson = (person) => {
  const post = axios.post(baseUrl, person);
  return post.then((response) => response.data);
};

const removePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const getPersons = () => {
  const get = axios.get(baseUrl);
  return get.then((response) => response.data);
};

const changeNumber = (person, newNumber) => {
  const updatedPerson = { ...person, number: newNumber };
  const put = axios.put(`${baseUrl}/${person.id}`, updatedPerson);
  return put.then((response) => response.data);
};

const personsService = {
  addPerson,
  removePerson,
  getPersons,
  changeNumber,
};

export default personsService;
