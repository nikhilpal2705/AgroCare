import React, { useId, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../api/Api";
import { Link } from "react-router-dom";
import logo from "../asset/images/logo.png";

const Register = ({ onRegister }) => {

  const id = useId();

  // Handling register data . . . 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  // Update form data as per fields . . . 
  function updateFormData(event) {
    const { name, value, type, checked } = event.target;

    // Update data as per fields requirment . . .
    setFormData((data) => {
      return {
        ...data,
        [name]: type === "checkbox" ? checked : value,
      };
    })

  }

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("🙈 🙉 🙊 Line 35 ~ Submit :  ", formData);

    const response = axios.post("/register", formData)

    console.log(`🙈 🙉 🙊 ~ file: Register.js:39 ~ handleRegister ~ response : `, response)

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
              <Form noValidate autoComplete="off" onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId={ id + "name" }>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={updateFormData}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId={ id + "email" }>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={updateFormData}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Email is invalid</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId={ id + "password" }>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={updateFormData}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId={ id + "agree" }>
                  <Form.Check
                    type="checkbox"
                    label="By registering you agree with our terms and condition."
                    name="agree"
                    checked={formData.agree}
                    onChange={updateFormData}
                    // isInvalid={!formData.agree}
                    feedback="You must agree to the terms and conditions"
                    required
                  />
                </Form.Group>

                <div className="form-group m-0">
                  <Button variant="primary" type="submit">
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
