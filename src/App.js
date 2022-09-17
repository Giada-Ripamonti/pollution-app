import "./App.css";

import Container from "react-bootstrap/Container";

import Footer from "./components/Footer";
import PollutionApp from "./components/PollutionApp";

function App() {
  return (
    <>
      <Container id="main">
        <PollutionApp />
      </Container>
      <Footer />
    </>
  );
}

export default App;
