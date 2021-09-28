import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = (props) => {
  const apiKey = process.env.REACT_APP_WEATHER_KEY;
  const [weather, setWeather] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { location } = props;

  useEffect(
    () =>
      axios
        .get(
          `https://api.weatherapi.com/v1/current.json?q=${location}&key=${apiKey}`
        )
        .then((response) => {
          setWeather(response.data);
          setLoaded(true);
        }),
    [location, apiKey]
  );

  if (loaded) {
    const { temp_c, wind_kph, wind_dir, condition } = weather.current;

    return (
      <div>
        <h3>Weather in {location}</h3>
        <div>
          <b>Temperature: </b>
          {temp_c}&deg;C
        </div>
        <div>
          <img src={condition.icon} alt={condition.text}></img>
        </div>
        <div>
          <b>Wind: </b>
          {wind_kph} km/h, direction {wind_dir}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Weather;
