import { Component } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

class CurrentWeather extends Component {
  state = {
    weather: "",
    icon: "",
    description: "",
  };

  componentDidMount = async (prevProps) => {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?" +
          "lat=" +
          this.props.lat +
          "&lon=" +
          this.props.lon +
          "&appid=" +
          this.props.apiKey +
          "&units=metric"
      );

      if (response.ok) {
        const results = await response.json();
        this.setState({ icon: results.weather[0].icon, description: results.weather[0].description });
        console.log(results);
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <Container className="text-center my-3">
        <Row>
          <h4>
            {this.props.city} {this.props.country}
          </h4>
        </Row>
        <Row>
        <img className="img-fluid" id="icon" src={"http://openweathermap.org/img/wn/" + this.state.icon + "@2x.png"} alt="weather-icon"></img>
        <h6>{this.state.description}</h6>
        </Row>
      </Container>
    );
  }
}

export default CurrentWeather;
