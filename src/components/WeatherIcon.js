import React from "react";

class WeatherIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      failed: false
    };
  }
  _onError = () => {
    this.setState({ failed: true });
  };
  render() {
    const iconName = this.props.iconName;

    const iconNames = ["brokenClouds"];
    let image;

    const sth = iconNames.map(icon => {
      if (iconName == icon) {
        const changedIconName = iconName.replace(/[-_\s.]+(.)?/g, (_, c) =>
          c ? c.toUpperCase() : ""
        );
        const iconNameCammelCase =
          changedIconName.substr(0, 1).toLowerCase() +
          changedIconName.substr(1);

        const imageUrl = require(`../images/weather-icons/${iconNameCammelCase}.png`);
        image = <img src={imageUrl} alt={iconName} onError={this._onError} />;
      } else {
        image = null;
      }
    });

    return image;
  }
}

export default WeatherIcon;
