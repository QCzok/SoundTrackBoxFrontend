import React, { useState, useEffect } from 'react';
import '../App.css';
import Playlist from './Playlist';
import CreatePlaylistDialog from './Dialogs/CreatePlaylistDialog'
import { addPlaylistPost, loadMusicCollectionGet } from '../utils/network.js';


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

    return (
        <section id = "library" className="flex-fill">
            <CreatePlaylistDialog parentCallback={onChangePlaylists} />
            { listOfPlaylists(user) }
        </section>
    )
}

export default MusicCollection;