import React from "react";
import CountryShort from "./CountryShort";

const CountryList = (props) => {
  return (
    <div>
      {props.countries.map((country) => (
        <CountryShort
          name={country.name}
          key={country.alpha3Code}
          onClick={props.onClick}
        />
      ))}
    </div>
  );
};

export default CountryList;
