import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.png';

const Home = ({ onHome }) => {

  return (
    <Container className="h-100">
      <Row className="justify-content-sm-center h-100">
        <Col xs={12} lg={5}>
          <div className="text-center my-2">
            <img src={logo} alt="logo" width="50%" />
          </div>


          <div className="text-center my-2">
            <Link to="/register" className="text-dark">Register</Link>
          </div>

          <div className="text-center my-2">
            <Link to="/login" className="text-dark">Login</Link>
          </div>

        </Col>
      </Row>
    </Container>
  );
};

export default Home;
