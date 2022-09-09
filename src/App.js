import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Location from './components/Location';
import Pollution from './components/Pollution';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function App() {

  return (
    <div>
      <h1>air quality monitor</h1>
      <Location />
      <Container>
        <Row>
          <Pollution />
        </Row>
      </Container>
    </div>
  );
}

export default App;
