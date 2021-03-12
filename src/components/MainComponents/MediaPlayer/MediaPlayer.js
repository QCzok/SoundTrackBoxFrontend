import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Cookies from 'universal-cookie';
import PrivateRoute from '../../../utils/PrivateRoute';

import MusicCollection from '../../MusicCollection/MusicCollection';
import RegistrationForm from '../../Dialogs/RegistrationForm';
import LoginForm from '../../Dialogs/LoginForm';
import Header from '../Header/Header';
import Player from '../Player';
import { CURRENT_SONG_NAME, CURRENT_SONG_ID } from '../../../constants/apiConstants';

class MediaPlayer extends React.Component {

    constructor(props) {
        super(props);
        const cookies = new Cookies();
        this.state = {
            currentSongName: cookies.get('songName'),
            currentSongID: cookies.get('songID'),
        }
        this.updateCurrentSong = this.updateCurrentSong.bind(this);
    }

    updateCurrentSong(songName, songID) {
        this.setState({
            currentSongName: songName,
            currentSongID: songID,
        });
        const cookies = new Cookies();
        cookies.set('songName', songName, { path: '/' , secure: true});
        cookies.set('songID', songID, { path: '/' , secure: true});
    }

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/register">
                            <RegistrationForm />
                        </Route>
                        <Route path="/login">
                            <LoginForm />
                        </Route>
                        <PrivateRoute path="/">
                            <MusicCollection
                                updateCurrentSong={this.updateCurrentSong}
                            ></MusicCollection>
                            <Player
                                currentSongName={this.state.currentSongName}
                                currentSongID={this.state.currentSongID}
                                changedFrequencyCallback={this.props.setCurrentFrequency}
                            >
                            </Player>
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default MediaPlayer;