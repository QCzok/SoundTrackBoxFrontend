import React from 'react';
import './Playlist.css'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
            }
            )
            .catch(function (error) {
                console.log(error);
            })
    }

    async deletePlaylistPost(playlistName) {
        return axios.post(API_BASE_URL + '/media/deletePlaylist', { playlistName: playlistName, songList: this.props.songCollection }, { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then(function (response) {
                if (response.status === 200) {
                    return response.data.affected;
                }
            }
            )
            .catch(function (error) {
                console.log(error);
            })
    }

    handleUpload(songName, selectedFile) {
        this.setState({
            fetchInProgress: true
        });
        Promise.resolve(this.addSongPost(this.props.playlistName, this.props.playlistID, songName, selectedFile)).then((result) => this.props.parentCallback(result)).then(() => {
            this.setState({
                fetchInProgress: false
            })
        });
    }


    onSelect = (songID) => {
        console.log('the song url is: ' + songID);
    }

    deletePlaylist() {
        Promise.resolve(this.deletePlaylistPost(this.props.playlistName)).then((result) => {
            console.log(result);

            this.props.parentCallback(result)
        }
        );
    }

    render() {
        if (this.state.fetchInProgress) {
            return (<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>)
        } else {
            return (
                <div>
                    <Accordion>
                        <div id="playlistBox" className="card-header">
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-music-fill" viewBox="0 0 16 16">
                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-.5 4.11v1.8l-2.5.5v5.09c0 .495-.301.883-.662 1.123C7.974 12.866 7.499 13 7 13c-.5 0-.974-.134-1.338-.377-.36-.24-.662-.628-.662-1.123s.301-.883.662-1.123C6.026 10.134 6.501 10 7 10c.356 0 .7.068 1 .196V4.41a1 1 0 0 1 .804-.98l1.5-.3a1 1 0 0 1 1.196.98z" />
                                    </svg>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <UploadDialog id="add-song" parentCallback={this.handleUpload} />
                                    <a className="dropdown-item" onClick={this.deletePlaylist}>Delete this playlist</a>
                                </div>
                            </div>
                            <Accordion.Toggle id="playlistItem" as={Button} variant="link" eventKey="0">
                                {this.props.playlistName}
                            </Accordion.Toggle>
                        </div>
                        {this.props.songCollection.map((song, index) => {
                            return (
                                <Accordion.Collapse eventKey="0" key={index}>
                                    <Card key={index}>
                                        <Song
                                            playlistName={this.props.playlistName}
                                            songName={song.songName}
                                            songID={song._id}
                                            parentCallback={this.props.parentCallback}
                                            updateCurrentSong={
                                                this.props.updateCurrentSong
                                            }
                                        >
                                        </Song>
                                    </Card>
                                </Accordion.Collapse>
                            )
                        })}
                    </Accordion>
                </div>
            )
        }
    }
}

export default Playlist;