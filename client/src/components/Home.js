import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from '../asset/images/logo.png';

const Home = ({ onHome }) => {

  return (
    <Container className="h-100">
      <Row className="justify-content-sm-center h-100">
        <Col xs={12} lg={5}>
        <Link to="/login" className="text-dark">Login</Link>
        <Link to="/register" className="text-dark">Register</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
