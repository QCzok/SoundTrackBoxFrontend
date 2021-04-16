import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { registrationToServerPost } from '../../utils/network.js';

const RegistrationForm = (props) => {
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        errorMessage: null,
        successMessage: null,
        onSend: false,
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            setState(prevState => ({
                ...prevState,
                'onSend': true,
            }));
            Promise.resolve()
                .then(sendDetailsToServer)
                .catch(error => console.log(error));
        } else {
            setState(prevState => ({
                ...prevState,
                'errorMessage': 'Passwords do not match'
            }))
        }
    }

    const redirectToHome = () => {
        props.history.push('/home');
    }

    const redirectToLogin = () => {
        props.history.push('/login');
    }

    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            const payload = {
                "email": state.email,
                "password": state.password,
            }
            Promise.resolve(registrationToServerPost(payload)).then((response) => {
                if (response.isOk) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': "You have successfully registered. We just sent you a confirmation email. Check your email account to finish the registration process and access your free trial period. If you don't receive it in a few minutes, check your spam folder.",
                        'errorMessage': null,
                    }))
                } else {
                    setState(prevState => ({
                        ...prevState,
                        'errorMessage': response.message,
                        'successMessage': null,
                        'onSend': false,
                    }))
                }
            })
        } else {
            setState(prevState => ({
                ...prevState,
                'errorMessage': 'Please enter valid username and password',
                'successMessage': null,
            }))
        }
    }

    return (
        <div>
            <Modal show={true} onHide={redirectToHome} animation={false}>
                <Modal.Header closeButton>
                    Register
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group text-left">
                            <label>Email address</label>
                            <input type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={state.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label>Password</label>
                            <input type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={state.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label>Confirm Password</label>
                            <input type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={state.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmitClick}
                            disabled={state.onSend ? "true" : ""}
                        >
                            Register
                </button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="mt-2">
                        <span>Already have an account? </span>
                        <button className="btn btn-primary" onClick={redirectToLogin}>Login here</button>
                    </div>
                    <section className={state.errorMessage ? "alert alert-danger" : ""} role="alert">
                        {state.errorMessage}
                    </section>
                    <section className={state.successMessage ? "alert alert-success" : ""} role="alert">
                        {state.successMessage}
                    </section>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default withRouter(RegistrationForm);