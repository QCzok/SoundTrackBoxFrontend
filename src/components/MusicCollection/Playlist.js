import React from 'react';
import './Playlist.css'
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';

import UploadDialog from '../Dialogs/UploadDialog';
import Song from './Song';

import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';


class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchInProgress: false,
        }
        this.handleUpload = this.handleUpload.bind(this);
        this.deletePlaylist = this.deletePlaylist.bind(this);
    }

    handleUpload(songName, selectedFile) {
        this.setState({
            fetchInProgress: true
        });
        Promise.resolve(this.addSongPost(this.props.playlistName, this.props.playlistID, songName, selectedFile))
            .then((result) => this.props.parentCallback(result))
            .then(() => {
                this.setState({
                    fetchInProgress: false
                })
            });
    }

    deletePlaylist() {
        const cookies = new Cookies();
        Promise.resolve(this.deletePlaylistPost(this.props.playlistID)).then((result) => {
            this.props.songCollection.map((song) => {
                if (song._id === cookies.get('songID')) {
                    this.props.updateCurrentSong(undefined, undefined);
                }
            })
            this.props.parentCallback(result)
        });
    }

    songs = (songCollection) => songCollection.map((song) => {
        return (
            <Accordion.Collapse eventKey="0" key={song._id}>
                <Song
                    playlistID={this.props.playlistID}
                    playlistName={this.props.playlistName}
                    songName={song.songName}
                    songID={song._id}
                    parentCallback={this.props.parentCallback}
                    updateCurrentSong={
                        this.props.updateCurrentSong
                    }
                >
                </Song>
            </Accordion.Collapse>
        )
    });

    async addSongPost(playlistName, playlistID, songName, selectedFile) {

        const data = new FormData()
        data.append('playlistName', playlistName);
        data.append('playlistID', playlistID);
        data.append('songName', songName);
        data.append('track', selectedFile);

        return axios.post(API_BASE_URL + '/media/addSong', data, { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then(function (response) {
                if (response.status === 200) {
                    return response.data.affected;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    async deletePlaylistPost(playlistID) {
        return axios.post(API_BASE_URL + '/media/deletePlaylist', { playlistID: playlistID }, { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then(function (response) {
                if (response.status === 200) {
                    return response.data.affected;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <>
                { this.state.fetchInProgress && (<div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>)}
                {!this.state.fetchInProgress && (<Accordion>
                    <div className="row">
                        <a className="dropdown-toggle"
                            data-toggle="dropdown"
                            aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection-play-fill" viewBox="0 0 16 16">
                                <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437z" />
                            </svg>
                        </a>
                        <div className="dropdown-menu">
                            <UploadDialog id="add-song" parentCallback={this.handleUpload} />
                            <a className="dropdown-item" onClick={this.deletePlaylist}>Delete this playlist</a>
                        </div>
                        <Accordion.Toggle className="btn btn-dark flex-grow-1" as={Button} eventKey="0">
                            {this.props.playlistName}
                        </Accordion.Toggle>
                    </div>
                    {this.songs(this.props.songCollection)}
                </Accordion>)}
            </>
        )
    }
}

export default Playlist;