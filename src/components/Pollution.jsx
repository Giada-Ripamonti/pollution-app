import { Component } from "react";

import Table from "react-bootstrap/Table";

class Pollution extends Component {
  componentDidMount = async () => {
    try {
      const response = await fetch(
        'http://api.openweathermap.org/data/2.5/air_pollution?'
        + 'lat=' + this.props.lat
        + '&lon='+ this.props.lon
        + '&appid=3ddd1d58f975dadc250ecff74638af9a'
      );

      if (response.ok) {
        const data = await response.json();
        
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        <h4>Pollution in {this.props.location}</h4>
        <Table className="d-block w-50" striped borderless size="sm">
          <thead>
            <tr>
              <th>Gas</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Carbon monoxide (CO)</td>
              <td>value</td>
            </tr>
            <tr>
              <td>Nitrogen monoxide (NO)</td>
              <td>value</td>
            </tr>
            <tr>
              <td>Ozone (O3)</td>
              <td>value</td>
            </tr>
            <tr>
              <td>Sulphur dioxide (SO2)</td>
              <td>value</td>
            </tr>
            <tr>
              <td>Ammonia (NH3)</td>
              <td>value</td>
            </tr>
            <tr>
              <td>Particulates (PM2.5 and PM10)</td>
              <td>value</td>
            </tr>
            <tr>
              <td>Nitrogen dioxide (NO2)</td>
              <td>value</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}

export default Pollution;
