import React from "react";
import "./style/css/style.css";
import Titles from "./components/Titles";
import Geolocalization from "./components/Geolocalization";
import Weather from "./components/Weather";
import DayWeather from "./components/DayWeather";

const API_KEY = "ac52e640b1d56e86279bfde869f6ca7f";

let detailsData = [];

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };

  async callForWeatherData(city, country) {
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );

    const api_call2 = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`
    );

    const mainData = await api_call.json();

    detailsData = await api_call2.json();

    if (city && country) {
      this.setState({
        temperature: mainData.main.temp,
        city: mainData.name,
        country: mainData.sys.country,
        humidity: mainData.main.humidity,
        description: mainData.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value."
      });
    }
  }

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    this.callForWeatherData(city, country);
  };

  getWeatherFromLocalization = async (city, country) =>
    this.callForWeatherData(city, country);

  render() {
    return (
      <div className="weather-application">
        <div className="weather-application__text-container">
          <Weather
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
          />
          <Geolocalization
            getWeatherFromLocalization={this.getWeatherFromLocalization}
            getWeather={this.getWeather}
          />
        </div>
        <DayWeather items={detailsData.list} />
      </div>
    );
  }
}

export default App;
