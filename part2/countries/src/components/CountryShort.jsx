import React from "react";

const CountryShort = (props) => {
  return (
    <div>
      {props.name}
      <button type="button" onClick={() => props.onClick(props.name)}>
        Show
      </button>
    </div>
  );
};

export default CountryShort;
