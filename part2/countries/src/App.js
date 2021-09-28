import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountryList from "./components/CountryList";
import CountryLong from "./components/CountryLong";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(
    () =>
      axios.get("https://restcountries.com/v2/all").then((response) => {
        setCountries(response.data);
      }),
    []
  );

  useEffect(() => {
    const lowerCaseFilter = filter.toLowerCase();
    const filteredList = countries.filter((country) =>
      country.name.toLowerCase().includes(lowerCaseFilter)
    );
    setFilteredCountries(filteredList);
  }, [filter, countries]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      {filteredCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : null}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 ? (
        <CountryList
          countries={filteredCountries}
          onClick={(countryName) => setFilter(countryName)}
        />
      ) : null}
      {filteredCountries.length === 1 ? (
        <CountryLong data={filteredCountries[0]} />
      ) : null}
    </div>
  );
}

export default App;
