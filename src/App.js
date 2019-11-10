import React from "react";
import "./style/css/style.css";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Geolocalization from "./components/Geolocalization";
import Weather from "./components/Weather";
import Date from "./components/Date";
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

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

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
  };

  getWeatherFromLocalization = async (city, country) => {
    city = city;
    country = country;

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
  };

  render() {
    return (
      <div className="weather-application">
        <Titles />
        <Form getWeather={this.getWeather} />
        <Geolocalization
          getWeatherFromLocalization={this.getWeatherFromLocalization}
        />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
        <Date />
        <DayWeather items={data2.list} />
      </div>
    );
  }
}

export default App;
