import React from "react";
import Geocode from "react-geocode";
import cookie from "react-cookies";
import Geolocation from "react-geolocation";
import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

class Geolocalization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: " ",
      country: " ",
      formActive: false
    };

    this.reverseGeocode = this.reverseGeocode.bind(this);
  }

  componentWillMount() {
    this.state = { city: cookie.load("city"), country: cookie.load("country") };

    this.props.getWeatherFromLocalization(this.state.city, this.state.country);
  }

  reverseGeocode(latitude, longitude) {
    cookie.remove("city", { path: "/" });
    cookie.remove("country", { path: "/" });

    fetch(
      "http://nominatim.openstreetmap.org/reverse?format=json&lon=" +
        longitude +
        "&lat=" +
        latitude
    )
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        this.setState({
          city: json.address.city,
          country: json.address.country
        });

        cookie.save("city", json.address.city, { path: "/" });
        cookie.save("country", json.address.country, { path: "/" });

        this.props.getWeatherFromLocalization(
          this.state.city,
          this.state.country
        );
      });
  }

  saveInputPosition(city, country) {
    cookie.remove("city", { path: "/" });
    cookie.remove("country", { path: "/" });

    cookie.save("city", city, { path: "/" });
    cookie.save("country", country, { path: "/" });
  }

  render() {
    return (
      <div className="change-locate">
        <Geolocation
          onSuccess={console.log}
          render={({
            fetchingPosition,
            position: { coords: { latitude, longitude } = {} } = {},
            error,
            getCurrentPosition
          }) => (
            <div>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="change-locate__icon"
              />
              <button
                onClick={() => {
                  getCurrentPosition();
                  this.reverseGeocode(latitude, longitude);
                }}
                className="change-locate__button"
              >
                Get Position
              </button>{" "}
              |{" "}
              <button
                className="change-locate__button"
                onClick={e =>
                  this.setState({ formActive: !this.state.formActive })
                }
              >
                Pick Position
              </button>
              {error && <div>{error.message}</div>}
            </div>
          )}
        />
        <p>{this.state.address}</p>
        {this.state.formActive ? (
          <Form saveInputPosition={this.saveInputPosition} />
        ) : null}
      </div>
    );
  }
}

export default Geolocalization;
