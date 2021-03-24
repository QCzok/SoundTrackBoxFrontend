import {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Cookies from 'universal-cookie';
import PrivateRoute from '../../utils/PrivateRoute';

import MusicCollection from '../MusicCollection/MusicCollection';
import RegistrationForm from '../Dialogs/RegistrationForm';
import LoginForm from '../Dialogs/LoginForm';
import Header from './Header';
import Player from './Player';

function MediaPlayer(props) {
    const cookies = new Cookies();
    const [currentSongID, setCurrentSongID] = useState(cookies.get('songID'));
    const [currentSongName, setCurrentSongName] = useState(cookies.get('songName'));

    var updateCurrentSong = (songName, songID) => {
        const cookies = new Cookies();
        setCurrentSongID(songID);
        setCurrentSongName(songName);
        if (songID) {
            cookies.set('songName', songName, { path: '/', secure: true });
            cookies.set('songID', songID, { path: '/', secure: true });
        } else {
            cookies.remove('songName', songName, { path: '/', secure: true });
            cookies.remove('songID', songID, { path: '/', secure: true });
        }
    }

        return (
            <Router>
                <>
                    <div className="row">
                        <Header />
                    </div>
                    <Switch>
                        <Route path="/register">
                            <RegistrationForm />
                        </Route>
                        <Route path="/login">
                            <LoginForm />
                        </Route>
                        <PrivateRoute path="/">
                            <div className="row bg-light">
                                <div className="col-md-12">
                                    <MusicCollection updateCurrentSong={updateCurrentSong} />
                                </div>
                                <div className="col-md-12">
                                    {currentSongID && (<Player
                                        currentSongName={currentSongName}
                                        currentSongID={currentSongID}
                                    />)}
                                </div>
                            </div>
                        </PrivateRoute>
                    </Switch>
                </>
            </Router>
        );
    
}

export default MediaPlayer;