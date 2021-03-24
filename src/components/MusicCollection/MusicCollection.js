import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Playlist from './Playlist';
import CreatePlaylistDialog from '../Dialogs/CreatePlaylistDialog'
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';


const MusicCollection = (props) => {
    const [user, setUser] = useState({ musicCollection: [] });

    useEffect(() => {
        Promise.resolve(loadMusicCollectionGet()).then((user) => {
            setUser(user);
        })
    }, []);

    const onChangePlaylists = (playlistName) => {
        Promise.resolve()
            .then(addPlaylistPost(playlistName).then(user => {
                setUser(user);
            }));
    }

    const onSongChange = (user) => {
        setUser(user);
    }

    const listOfPlaylists = (user) => {
        return user['musicCollection'].map((playlist) => {
            return (
                <div key={playlist._id} className="col-md-12">
                    <Playlist
                        playlistName={playlist.name}
                        playlistID={playlist._id}
                        songCollection={playlist.songList ? playlist.songList : []}
                        parentCallback={onSongChange}
                        updateCurrentSong={props.updateCurrentSong}
                    >
                    </Playlist>
                </div>
            )
        })
    }

    const addPlaylistPost = async (playlistName) => {
        return axios.post(API_BASE_URL + '/media/addPlaylist', { name: playlistName }, { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then(function (response) {
                if (response.status === 200) {
                    return response.data.affected;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const loadMusicCollectionGet = async () => {
        var data = axios.get(API_BASE_URL + '/media/loadMusicCollection', { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then(res => { return res.data }).catch(function (error) {
                console.log(error);
            })
        return data;
    }

    return (
        <section className="flex-fill">
            <CreatePlaylistDialog parentCallback={onChangePlaylists} />
            { listOfPlaylists(user) }
        </section>
    )
}

export default MusicCollection;