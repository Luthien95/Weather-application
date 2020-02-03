import React from "react";
import "./style/css/style.css";
import Titles from "./components/Titles";
import Geolocalization from "./components/Geolocalization";
import Weather from "./components/Weather";
import DayWeather from "./components/DayWeather";

const API_KEY = "ac52e640b1d56e86279bfde869f6ca7f";

let data2 = [];

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };

  async bleh(city, country) {
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );

    const api_call2 = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`
    );

    const data = await api_call.json();

    data2 = await api_call2.json();

    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
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

    console.log(data);
  }

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    this.bleh(city, country);
  };

  getWeatherFromLocalization = async (city, country) =>
    this.bleh(city, country);

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
        <DayWeather items={data2.list} />
      </div>
    );
  }
}

export default App;

/*
<Titles />
        <Form getWeather={this.getWeather} />
        */
