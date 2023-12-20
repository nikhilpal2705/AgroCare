import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from '../asset/images/logo.png';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    onRegister({ name, email, password });
  };

  return (
    <Container className="h-100">
      <Row className="justify-content-sm-center h-100">
        <Col xs={12} lg={5}>
          <div className="text-center my-2">
            <img src={logo} alt="logo" width="50%" />
          </div>
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
              <Form noValidate autoComplete="off">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Email is invalid</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
                </Form.Group>

                <p className="form-text text-muted mb-3">
                  By registering you agree with our terms and condition.
                </p>

                <div className="form-group m-0">
                  <Button variant="primary" onClick={handleRegister}>
                    Register
                  </Button>
                </div>
              </Form>
            </div>
            <div className="card-footer py-3 border-0">
              <div className="text-center">
                Already have an account? <Link to="/login" className="text-dark">Login</Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-5 text-muted">
            Copyright &copy; 2023-24 &mdash; AgroCare
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
