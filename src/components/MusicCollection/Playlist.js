import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';

import UploadDialog from '../Dialogs/UploadDialog';
import Song from './Song';
import { addSongPost, deletePlaylistPost } from '../../utils/network.js';


const Playlist = (props) => {
    const [fetchInProgress, setFetchInProgress] = useState(false);

    const handleUpload = (songName, selectedFile) => {
        setFetchInProgress(true);
        Promise.resolve(addSongPost(props.playlistName, props.playlistID, songName, selectedFile))
            .then((result) => props.parentCallback(result))
            .then(() => {
                setFetchInProgress(false);
            });
    }

    const deletePlaylist = () => {
        const cookies = new Cookies();
        Promise.resolve(deletePlaylistPost(props.playlistID)).then((result) => {
            props.songCollection.map((song) => {
                if (song._id === cookies.get('songID')) {
                    props.updateCurrentSong(undefined, undefined);
                }
            })
            props.parentCallback(result)
        });
    }

    const songs = (songCollection) => songCollection.map((song) => {
        return (
            <Accordion.Collapse eventKey="0" key={song._id}>
                <Song
                    playlistID={props.playlistID}
                    playlistName={props.playlistName}
                    songName={song.songName}
                    songID={song._id}
                    parentCallback={props.parentCallback}
                    updateCurrentSong={
                        props.updateCurrentSong
                    }
                >
                </Song>
            </Accordion.Collapse>
        )
    });

    return (
        <>
            { fetchInProgress && (<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>)}
            { !fetchInProgress && (<Accordion>
                <div className="row">
                    <a className="dropdown-toggle"
                        data-toggle="dropdown"
                        aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play-fill" viewBox="0 0 16 16">
                            <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437z" />
                        </svg>
                    </a>
                    <div className="dropdown-menu">
                        <UploadDialog id="add-song" parentCallback={handleUpload} />
                        <a className="dropdown-item" onClick={deletePlaylist}>Delete this playlist</a>
                    </div>
                    <Accordion.Toggle className="btn btn-dark flex-grow-1" as={Button} eventKey="0">
                        {props.playlistName}
                    </Accordion.Toggle>
                </div>
                {songs(props.songCollection)}
            </Accordion>)}
        </>
    )
}

export default Playlist;