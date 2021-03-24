import { useState } from 'react';
import Cookies from 'universal-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CookieConsent from "react-cookie-consent";

import Header from './components/MainComponents/Header';
import LoginForm from './components/Dialogs/LoginForm';
import RegistrationForm from './components/Dialogs/RegistrationForm';
import MusicCollection from './components/MusicCollection/MusicCollection';
import Player from './components/MainComponents/Player';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  const cookies = new Cookies();
  const [currentSongID, setCurrentSongID] = useState(cookies.get('songID'));
  const [currentSongName, setCurrentSongName] = useState(cookies.get('songName'));

  var updateCurrentSong = (songName, songID) => {
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
    <main className="container">
      <Router>
        <div className="row justify-content-md-center">
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
            <div className="row justify-content-md-center bg-light">
              <MusicCollection updateCurrentSong={updateCurrentSong} />
            </div>
            <div className="row justify-content-md-center bg-light">
              {currentSongID && (<Player
                currentSongName={currentSongName}
                currentSongID={currentSongID}
              />)}
            </div>
          </PrivateRoute>
        </Switch>
      </Router>
      <CookieConsent>This site uses cookies.</CookieConsent>
    </main >
  )
}

export default App;