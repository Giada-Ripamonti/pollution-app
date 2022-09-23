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
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/air_pollution?" +
          "lat=" +
          this.props.lat +
          "&lon=" +
          this.props.lon +
          "&appid=" +
          this.props.apiKey
      );
      if (response.ok) {
        const results = await response.json();
        this.setState(
          {
            no2: results.list[0].components.no2,
            o3: results.list[0].components.o3,
            so2: results.list[0].components.so2,
            pm2: results.list[0].components.pm2_5,
            pm10: results.list[0].components.pm10,
            nh3: results.list[0].components.nh3,
          },
          () => {
            this.ozoneBadge(this.state.o3);
            this.particulate2Badge(this.state.pm2);
            this.particulate10Badge(this.state.pm10);
            this.sulphurBadge(this.state.so2);
            this.ammoniaBadge(this.state.nh3)
          }
        );
        console.log(results);
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  ozoneBadge = (x) => {
    if (x < 100) {
      this.setState({ ozone: ["light", "good"] });
    } else if (x > 100 && x < 200) {
      this.setState({ ozone: ["secondary", "moderate"] });
    } else if (x > 200) {
      this.setState({ ozone: ["dark", "bad"] });
    }
  };

  particulate2Badge = (x) => {
    if (x < 30) {
      this.setState({ particulate2: ["light", "good"] });
    } else if (x > 30 && x < 100) {
      this.setState({ particulate2: ["secondary", "moderate"] });
    } else if (x > 100) {
      this.setState({ particulate2: ["dark", "bad"] });
    }
  };

  particulate10Badge = (x) => {
    if (x < 50) {
      this.setState({ particulate10: ["light", "good"] });
    } else if (x > 50 && x < 90) {
      this.setState({ particulate10: ["secondary", "moderate"] });
    } else if (x > 90) {
      this.setState({ particulate10: ["dark", "bad"] });
    }
  };

  sulphurBadge = (x) => {
    if (x < 80) {
      this.setState({ sulphur: ["light", "good"] });
    } else if (x > 80 && x < 800) {
      this.setState({ sulphur: ["secondary", "moderate"] });
    } else if (x > 800) {
      this.setState({ sulphur: ["dark", "bad"] });
    }
  };

  ammoniaBadge = (x) => {
    if (x < 400) {
      this.setState({ ammonia: ["light", "good"] });
    } else if (x > 400 && x < 800) {
      this.setState({ ammonia: ["secondary", "moderate"] });
    } else if (x > 1200) {
      this.setState({ ammonia: ["dark", "bad"] });
    }
  };

  nitrogenBadge = (x) => {
    if (x < 80) {
      this.setState({ nitrogen: ["light", "good"] });
    } else if (x > 80 && x < 280) {
      this.setState({ nitrogen: ["secondary", "moderate"] });
    } else if (x > 280) {
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
