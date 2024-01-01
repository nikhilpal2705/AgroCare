import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import * as authService from './AuthService';
import { useAuth } from '../../contexts/AuthContext';

const SignIn = () => {
    const navigate = useNavigate()
    const { login } = useAuth();

    let [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    // Update form data as per fields . . . 
    function updateFormData(event) {
        const { name, value } = event.target;
        // Update data as per fields requirement . . .
        setFormData((data) => {
            return {
                ...data,
                [name]: value,
            };
        })

    }
    async function handleSignIn(e) {
        e.preventDefault();
        const form = e.currentTarget;
        // If the form is not valid, stop the propagation.
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            // If the form is valid, proceed with the registration.
            const data = await authService.login({ loginData: formData })
            if (data?.jwtToken) {
                navigate('/dashboard');
                login(data?.isAdmin, data?.jwtToken);
            }
        }
    }

    return (
        <Container className="h-100">
            <Row className="justify-content-sm-center h-100">
                <Col xs={12} lg={5}>
                    <div className="text-center my-2">
                        <img src={logo} alt="logo" width="50%" />
                    </div>
                    <div className="card shadow-lg mb-5">
                        <div className="card-body p-5">
                            <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                            <Form noValidate validated={validated} autoComplete="on" onSubmit={handleSignIn}>
                                <Form.Group className="mb-3" controlId="email">
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

                                <Form.Group className="mb-3" controlId="password">
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

                                <Form.Group className="mb-3 d-flex align-items-center" controlId="remember">
                                    <Form.Check
                                        type="checkbox"
                                        label="Remember Me"
                                    />
                                </Form.Group>

                                <div className="form-group m-0">
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </div>
                        <div className="card-footer py-3 border-0">
                            <div className="text-center">
                                Don't have an account? <Link to="/register" className="text-dark">Create One</Link>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignIn;
