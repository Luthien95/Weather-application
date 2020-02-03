import React from "react";
import CurrentDate from "./CurrentDate";

class DayWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items) {
      this.setState({ array: nextProps.items });
    }
  }

  render() {
    let array = [];

    if (this.state.array.length > 1) {
      {
        var date2 = new Date();
        date2.setDate(date2.getDate() + 1);

        array = this.state.array
          .filter(a => Date.parse(a.dt_txt) <= date2)
          .map((item, index) => {
            var date = new Date(Date.parse(item.dt_txt));
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? "0" + minutes : minutes;
            var strTime = hours + ampm;

            var className =
              index === 0
                ? "day-weather__item day-weather__item--active"
                : "day-weather__item";

            return (
              <li key={index} className={className}>
                {strTime}
                <span className="day-weather__temp">
                  {Math.round(item.main.temp)}&deg;C
                </span>
              </li>
            );
          });
      }
    }

    return (
      <div className="weather">
        <CurrentDate />
        <ul className="day-weather">{array}</ul>
      </div>
    );
  }
}

export default DayWeather;
