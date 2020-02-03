import React from "react";

const CurrentDate = props => {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  var currentDate = new Date();

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

  var daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  var currentDayOfTheWeek = daysOfTheWeek[currentDate.getDay()];

  return (
    <p className="day-weather__date">
      {currentDayOfTheWeek}, {currentDay} {monthNames[currentMonth]}
    </p>
  );
};

export default CurrentDate;
