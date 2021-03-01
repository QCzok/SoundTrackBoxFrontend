import React, { useState } from 'react';

import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function LoginForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null,
        errorMessage: null,
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
        const payload = {
            "email": state.email,
            "password": state.password,
        }
        axios.post(API_BASE_URL + '/user/login', payload)
            .then(function (response) {
                if (response.status === 200) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem(ACCESS_TOKEN_NAME, response.data);
                    props.parentCallback();
                    redirectToHome();
                }
                else if (response.code === 204) {
                    props.registrationFormCallback("Username and password do not match");
                }
                else {
                    props.registrationFormCallback("Username does not exists");
                }
            })
            .catch(function (error) {
                setState(prevState => ({
                    ...prevState,
                    'errorMessage': error.response.data
                }))
            });
    }

    const redirectToHome = () => {
        props.history.push('/');
    }
    const redirectToRegister = () => {
        props.history.push('/register');
    }
    return (
            <Modal show={true} onHide={() => redirectToHome()} animation={false}>
                <Modal.Header closeButton>
                    Login
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group text-left">
                            <label >Email address</label>
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
                        <div className="form-check">
                        </div>
                    </form>
                    <Button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmitClick}
                    >Submit</Button>
                </Modal.Body>
                <Modal.Footer>
                    <div className="registerMessage">
                        <span>Dont have an account? </span>
                        <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
                    </div>
                    <div className="alertMessage" style={{ display: state.errorMessage ? 'block' : 'none' }} role="alert">
                        {state.errorMessage}
                    </div>
                </Modal.Footer>
            </Modal>
    )
}

export default withRouter(LoginForm);