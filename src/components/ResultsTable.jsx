import { Component } from "react";

import Table from "react-bootstrap/Table";
import QualityBadge from "./QualityBadge";

class ResultsTable extends Component {
  state = {
    no2: 0,
    nitrogen: [],
    o3: 0,
    ozone: [],
    so2: 0,
    sulphur: [],
    pm2: 0,
    particulate2: [],
    pm10: 0,
    particulate10: [],
    nh3: 0,
    ammonia: [],
  };

  componentDidMount = async (prevProps) => {
    this.ozoneBadge();
    this.sulphurBadge();
    this.ammoniaBadge();
    this.particulate2Badge();
    this.particulate10Badge();
    this.nitrogenBadge();
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

  ozoneBadge = () => {
    if (this.state.o3 < 100) {
      this.setState({ ozone: ["light", "good"] });
    } else if (100 < (this.this.state.o3) < 200) {
      this.setState({ ozone: ["secondary", "moderate"] });
    } else if (this.state.o3 > 200) {
      this.setState({ ozone: ["dark", "bad"] });
    }
  };

  sulphurBadge = () => {
    if (this.state.so2 < 80) {
      this.setState({ sulphur: ["light", "good"] });
    } else if (80 < (this.state.so2) < 800) {
      this.setState({ sulphur: ["secondary", "moderate"] });
    } else if (this.state.so2 > 800) {
      this.setState({ sulphur: ["dark", "bad"] });
    }
  };

  ammoniaBadge = () => {
    if (this.state.nh3 < 400) {
      this.setState({ ammonia: ["light", "good"] });
    } else if (400 < (this.state.nh3) < 1200) {
      this.setState({ ammonia: ["secondary", "moderate"] });
    } else if (this.state.nh3 > 1200) {
      this.setState({ ammonia: ["dark", "bad"] });
    }
  };

  particulate2Badge = () => {
    if (this.state.pm2 < 30) {
      this.setState({ particulate2: ["light", "good"] });
    } if ( 30 < (this.state.pm2) < 100) {
      this.setState({ particulate2: ["secondary", "moderate"] });
    } if (this.state.pm2 > 100) {
      this.setState({ particulate2: ["dark", "bad"] });
    }
  };

  particulate10Badge = () => {
    if (this.state.pm10 < 50) {
      this.setState({ particulate10: ["light", "good"] });
    } else if (50 < (this.state.pm10) < 90) {
      this.setState({ particulate10: ["secondary", "moderate"] });
    } else if (this.state.pm10 > 90) {
      this.setState({ particulate10: ["dark", "bad"] });
    }
  };

  nitrogenBadge = () => {
    if (this.state.no2 < 80) {
      this.setState({ nitrogen: ["light", "good"] });
    } else if (80 < (this.state.no2) < 280) {
      this.setState({ nitrogen: ["secondary", "moderate"] });
    } else if (this.state.no2 > 280) {
      this.setState({ nitrogen: ["dark", "bad"] });
    }
  };

  render() {
    return (
      <Table className="w-80" striped borderless size="sm" responsive="sm">
        <thead>
          <tr>
            <th>Pollutant</th>
            <th>μg/m3</th>
            <th>Quality</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ozone (O3)</td>
            <td>{this.state.o3}</td>
            <td>
              <QualityBadge
                color={this.state.ozone[0]}
                quality={this.state.ozone[1]}
              />
            </td>
          </tr>
          <tr>
            <td>Sulphur dioxide (SO2)</td>
            <td>{this.state.so2}</td>
            <td>
              <QualityBadge
                color={this.state.sulphur[0]}
                quality={this.state.sulphur[1]}
              />
            </td>
          </tr>
          <tr>
            <td>Ammonia (NH3)</td>
            <td>{this.state.nh3}</td>
            <td>
              <QualityBadge
                color={this.state.ammonia[0]}
                quality={this.state.ammonia[1]}
              />
            </td>
          </tr>
          <tr>
            <td>Particulates (PM2.5)</td>
            <td>{this.state.pm2}</td>
            <td>
              <QualityBadge
                color={this.state.particulate2[0]}
                quality={this.state.particulate2[1]}
              />
            </td>
          </tr>
          <tr>
            <td>Particulates (PM10)</td>
            <td>{this.state.pm10}</td>
            <td>
              <QualityBadge
                color={this.state.particulate10[0]}
                quality={this.state.particulate10[1]}
              />
            </td>
          </tr>
          <tr>
            <td>Nitrogen dioxide (NO2)</td>
            <td>{this.state.no2}</td>
            <td>
              <QualityBadge
                color={this.state.nitrogen[0]}
                quality={this.state.nitrogen[1]}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default ResultsTable;
