import { Component } from 'react'

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";

class Location extends Component {

  state = {
    searchQuery: '',
    city: '',
  }

  componentDidMount = async () => {
    try {
      const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q='
        + this.state.searchQuery
        + '&limit=1'
        + '&appid=3ddd1d58f975dadc250ecff74638af9a')

      if(response.ok) {
        const city = await response.json()
        this.setState({city: city})
      } else {
          console.log('error')
      }
    } catch(e) {
      console.log(e)
    }
  }

  render() {

    return (
      <>
      <InputGroup className="mb-3">
        <h3>City:</h3>
        <Form.Control
          className="d-block w-50"
          type="text"
          placeholder="type here"
          aria-describedby="basic-addon"
          value={this.state.searchQuery}
          onChange={(e) => this.setState({ searchQuery: e.target.value })}
        />
        <Button variant="outline-secondary" id="button-addon">
          Results
        </Button>
      </InputGroup>

      <ListGroup>
        <ListGroup.Item>City</ListGroup.Item>
      </ListGroup>
    </>
    );
  }
}

export default Location;
