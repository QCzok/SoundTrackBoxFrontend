import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { loginPost } from '../../utils/network.js';

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

        Promise.resolve(loginPost(payload))
        .then((response) => {
            if (response.status < 400) {
                setState(prevState => ({
                    ...prevState,
                    'successMessage': 'Login successful. Redirecting to home page..'
                }))
                localStorage.setItem(ACCESS_TOKEN_NAME, response.data);
                redirectToHome();
            }
            else {
                setState(prevState => ({
                    ...prevState,
                    'errorMessage': response.data,
                }))
            }
        })
        .catch((error) => {
            if (!error.response) {
                alert('NETWORK ERROR');
            } else {
                setState(prevState => ({
                    ...prevState,
                    'errorMessage': error.response.data
                }))
            }
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
                <form onSubmit={handleSubmitClick}>
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
                <section className="registerMessage">
                    <span>Dont have an account? </span>
                    <button className="btn btn-primary" onClick={() => redirectToRegister()}>Register</button>
                </section>
                <section class={state.errorMessage ? "alert alert-danger": ""} role="alert">
                {state.errorMessage}
                </section>
            </Modal.Footer>
        </Modal>
    )
}

export default withRouter(LoginForm);