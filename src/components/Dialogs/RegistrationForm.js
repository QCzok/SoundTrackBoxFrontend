import React, { useState } from 'react';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function RegistrationForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        errorMessage: null
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
            sendDetailsToServer()
        } else {
            setState(prevState => ({
                ...prevState,
                'errorMessage' : 'Passwords do not match'
            }))
        }
    }
    const redirectToLogin = () => {
        props.history.push('/login'); 
    }

    const redirectToHome = () => {
        props.history.push('/home');
    }

    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
            const payload={
                "email":state.email,
                "password":state.password,
            }
            axios.post(API_BASE_URL+'/user/register', payload)
                .then(function (response) {
                    if(response.status === 200){
                        console.log(response.data);
                        redirectToHome();
                    } else{
                        setState(prevState => ({
                            ...prevState,
                            'errorMessage' : response.data
                        }))
                    }
                })
                .catch(function (error) {
                    setState(prevState => ({
                        ...prevState,
                        'errorMessage' : error.response.data
                    }))
                });    
        } else {
            setState(prevState => ({
                ...prevState,
                'errorMessage' : 'Please enter valid username and password'
            }))
        }
    }

    const handleClose = () => {
        redirectToHome();
    }

    return (
        <div>
        <Modal show={true} onHide={() => handleClose()} animation={false}>
                <Modal.Header closeButton>
                    Register
                </Modal.Header>
                <Modal.Body>
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
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
                >
                    Register
                </button>
            </form>
            </Modal.Body>
                <Modal.Footer>
                <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
                    <div className="alertMessage" style={{ display: state.errorMessage ? 'block' : 'none' }} role="alert">
                        {state.errorMessage}
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default withRouter(RegistrationForm);