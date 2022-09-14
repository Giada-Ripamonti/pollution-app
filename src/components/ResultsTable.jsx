import { Component } from "react";

import Table from "react-bootstrap/Table";

class ResultsTable extends Component {
  state = {
    co: 0,
    no: 0,
    no2: 0,
    o3: 0,
    so2: 0,
    pm2: 0,
    pm10: 0,
    nh3: 0,
  };

  componentDidMount= async (prevProps) => {
      try {
        const response = await fetch(
          "http://api.openweathermap.org/data/2.5/air_pollution?" +
            "lat=" +
            this.props.lat +
            "&lon=" +
            this.props.lon +
            "&appid=" +
            this.props.apiKey
        );

        if (response.ok) {
          const results = await response.json();
          this.setState({
            co: results.list[0].components.co,
            no: results.list[0].components.no,
            no2: results.list[0].components.no2,
            o3: results.list[0].components.o3,
            so2: results.list[0].components.so2,
            pm2: results.list[0].components.pm2_5,
            pm10: results.list[0].components.pm10,
            nh3: results.list[0].components.nh3,
          });
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
      <Table className="w-80" striped borderless size="sm">
        <thead>
          <tr>
            <th>Gas</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Carbon monoxide (CO)</td>
            <td>{this.state.co}</td>
          </tr>
          <tr>
            <td>Nitrogen monoxide (NO)</td>
            <td>{this.state.no}</td>
          </tr>
          <tr>
            <td>Ozone (O3)</td>
            <td>{this.state.o3}</td>
          </tr>
          <tr>
            <td>Sulphur dioxide (SO2)</td>
            <td>{this.state.so2}</td>
          </tr>
          <tr>
            <td>Ammonia (NH3)</td>
            <td>{this.state.nh3}</td>
          </tr>
          <tr>
            <td>Particulates (PM2.5)</td>
            <td>{this.state.pm2}</td>
          </tr>
          <tr>
            <td>Particulates (PM10)</td>
            <td>{this.state.pm10}</td>
          </tr>
          <tr>
            <td>Nitrogen dioxide (NO2)</td>
            <td>{this.state.no2}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default ResultsTable;
