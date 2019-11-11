import React from "react";

const Weather = props => {
  return (
    <div className="today-weather">
      {props.city && props.country && (
        <p>
          {props.city}, {props.country}
        </p>
      )}
      {props.description && (
        <p className="today-weather__conditions">{props.description}</p>
      )}
      {props.temperature && (
        <p className="today-weather__temp">
          {Math.round(props.temperature)}&deg;C
        </p>
      )}
      {props.error && <p>{props.error}</p>}
    </div>
  );
};

export default Weather;

/*
 {props.humidity && <p>Humidity: {props.humidity}</p>}
 */
