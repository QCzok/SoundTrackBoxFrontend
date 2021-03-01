import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import PrivateRoute from '../../utils/PrivateRoute';

import MusicCollection from '../MusicCollection/MusicCollection';
import RegistrationForm from '../Dialogs/RegistrationForm';
import LoginForm from '../Dialogs/LoginForm';
import UserNavBar from './UserNavBar';

import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistCollection: [],
            isLoggedIn: localStorage.getItem(ACCESS_TOKEN_NAME) ? true : false 
        }
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleAuthentication() {
        this.setState({
            isLoggedIn: localStorage.getItem(ACCESS_TOKEN_NAME) ? true : false 
        })
    }

    handleUpload(playlistName) {
        this.setState({
            playlistCollection: [... this.state.playlistCollection, playlistName],
        })
    }

    render() {
        return (
            <Router>
                <div>
                <UserNavBar isLoggedIn = {this.state.isLoggedIn} parentCallback={this.handleAuthentication} />
                    <Switch>
                        <Route path="/register">
                            <RegistrationForm />
                        </Route>
                        <Route path="/login">
                            <LoginForm parentCallback={this.handleAuthentication}/>
                        </Route>
                        <PrivateRoute path="/">
                            <MusicCollection playlistCollection={this.state.playlistCollection} parentCallback={this.handleUpload}></MusicCollection>
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default UserMenu;