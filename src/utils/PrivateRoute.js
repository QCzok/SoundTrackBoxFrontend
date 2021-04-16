import { useState } from 'react';
import Cookies from 'universal-cookie';
import React from 'react';
import { Route } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../constants/apiConstants';
import { withRouter } from "react-router-dom";
import MusicCollection from '../components/MusicCollection';
import Player from '../components/Player';

function PrivateRoute(props) {
  const cookies = new Cookies();
  const [currentSongID, setCurrentSongID] = useState(cookies.get('songID'));
  const [currentSongName, setCurrentSongName] = useState(cookies.get('songName'));

  const login = () => {
    props.history.push('/login');
  }

  const register = () => {
    props.history.push('/register');
  }

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
      <Route
        render={() =>
          localStorage.getItem(ACCESS_TOKEN_NAME) ? 
          <section>
          <div className="row justify-content-md-center bg-light">
              <MusicCollection updateCurrentSong={updateCurrentSong} />
            </div>
            <div className="row justify-content-md-center bg-light">
              {currentSongID && (<Player
                currentSongName={currentSongName}
                currentSongID={currentSongID}
              />)}
            </div>
            </section>
             : 
             <section>
             <h1>Welcome to Sound Track Box </h1>
             <p>If you already have an account, log in now</p>
             <div className="d-flex justify-content-center">
             <button className="btn btn-primary align-center" onClick = {login}>Log in</button>
             </div>
             <p> if you don't have an account yet, register first</p>
             <div className="d-flex justify-content-center">
             <button className="btn btn-primary" onClick = {register}>Register</button>
             </div>
             <br/>
             <p> ..or play around with the sample track </p>
             <Player
                currentSongName={"Sample Track"}
                currentSongID={undefined}
              />
             </section>
        }
      />
    );
  }
export default withRouter(PrivateRoute);