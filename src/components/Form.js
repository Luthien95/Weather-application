import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: ""
    };
  }
  render() {
    const { getWeather, saveInputPosition } = this.props;
    return (
      <form onSubmit={getWeather} className="position-form">
        <input
          type="text"
          name="city"
          placeholder="City..."
          className="position-form__input"
          onChange={event => this.setState({ city: event.target.value })}
        />
        <input
          type="text"
          name="country"
          placeholder="Country..."
          className="position-form__input"
          onChange={event => this.setState({ country: event.target.value })}
        />
        <button className="position-form__button">Get Weather</button>
        <button
          className="position-form__button position-form__button--blank"
          onClick={saveInputPosition(this.state.city, this.state.country)}
        >
          Save Position
        </button>
      </form>
    );
  }
}

export default Form;
