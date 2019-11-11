import React from "react";

const Form = props => {
  const day2 = new Date().getDate();
  const month = new Date().getMonth();
  var now = new Date();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  var day = days[now.getDay()];

  return (
    <p className="day-weather__date">
      {day}, {day2} {monthNames[month]}
    </p>
  );
};

export default Form;
