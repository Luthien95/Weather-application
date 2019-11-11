import React from "react";
import Geocode from "react-geocode";
import cookie from "react-cookies";
import Geolocation from "react-geolocation";

class Geolocalization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: " ",
      country: " "
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

  render() {
    return (
      <div>
        <Geolocation
          onSuccess={console.log}
          render={({
            fetchingPosition,
            position: { coords: { latitude, longitude } = {} } = {},
            error,
            getCurrentPosition
          }) => (
            <div>
              <button
                onClick={() => {
                  getCurrentPosition();
                  this.reverseGeocode(latitude, longitude);
                }}
              >
                Get Position
              </button>
              {error && <div>{error.message}</div>}
              <p>
                {this.state.city}, {this.state.country}
              </p>
            </div>
          )}
        />
        <p>{this.state.address}</p>
      </div>
    );
  }
}

export default Geolocalization;
