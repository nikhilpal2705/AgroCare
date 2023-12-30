import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import api from "../../api/Api";
import { toast } from 'react-toastify';

const SignIn = () => {
    const navigate = useNavigate()
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [validated, setValidated] = useState(false);

    async function handleSignIn(e) {
        e.preventDefault();
        const form = e.currentTarget;
        // If the form is not valid, stop the propagation.
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            // If the form is valid, proceed with the registration.
            try {
                const request = await api.post("/auth/login", {
                    email: email,
                    password: password
                });
                console.log(`😱 😓 😒 ~ file: SignIn.js:38 ~ handleSignIn ~ request:`, request)
                navigate("/dashboard");
            } catch (error) {
                toast.error(error.response.data);
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
                            <Form noValidate validated={validated} autoComplete="off">
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

                                <Form.Group className="mb-3 d-flex align-items-center" controlId="remember">
                                    <Form.Check
                                        type="checkbox"
                                        label="Remember Me"
                                    />
                                </Form.Group>

                                <div className="form-group m-0">
                                    <Button variant="primary" type="submit" onClick={handleSignIn}>
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
                    {/* <div className="text-center mt-5 text-muted">
                        Copyright &copy; 2023-24 &mdash; AgroCare
                    </div> */}
                </Col>
            </Row>
        </Container>
    );
};

export default SignIn;
