import React from "react";
import Weather from "./Weather";

const CountryLong = (props) => {
  const { name, capital, population, languages, flags } = props.data;
  return (
    <div>
      <h2>{name}</h2>
      <div>Capital: {capital}</div>
      <div>Population: {population}</div>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => (
          <li>{language.name}</li>
        ))}
      </ul>
      <div>
        <img
          style={{ maxHeight: "200px", maxWidth: "250px" }}
          src={flags.svg}
          alt={`Flag of ${name}`}
        />
      </div>
      <Weather location={capital} />
    </div>
  );
};

export default CountryLong;
