import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import UploadDialog from '../Dialogs/UploadDialog';
import Song from './Song';

import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { FormatIndentDecreaseSharp } from '@material-ui/icons';


class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpload = this.handleUpload.bind(this);
        this.deletePlaylist = this.deletePlaylist.bind(this);
    }

    async addSongPost(playlistName, songName, selectedFile) {

        const data = new FormData()
        data.append('songName', songName);
        data.append('playlistName', playlistName);
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
        return axios.post(API_BASE_URL + '/media/deletePlaylist', { playlistName: playlistName, songList: this.props.songCollection}, { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
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

    handleUpload(songName, songUrl, selectedFile) {
        Promise.resolve(this.addSongPost(this.props.playlistName, songName, selectedFile)).then((result) => this.props.parentCallback(result));
    }


    onSelect = (songID) => {
        console.log('the song url is: ' + songID);
    }

    deletePlaylist(){
        Promise.resolve(this.deletePlaylistPost(this.props.playlistName)).then((result) => 
        {
            console.log(result);
        
        this.props.parentCallback(result)
        }
        );
    }

    render() {
        return (
            <div>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                {this.props.playlistName}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="26"
                                    height="26"
                                    fill="currentColor"
                                    className="bi bi-plus b-plain"
                                    viewBox="0 0 16 16"
                                    onClick={this.deletePlaylist}
                                >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </Accordion.Toggle>
                            <UploadDialog parentCallback={this.handleUpload}>
                            </UploadDialog>
                        </Card.Header>
                        {this.props.songCollection.map((song, index) => {
                            return (
                                <Accordion.Collapse eventKey="0" key={index}>
                                    <Card key={index}>
                                        <Song playlistName={this.props.playlistName} songName={song.songName} songID={song.songID} parentCallback={this.props.parentCallback}></Song>
                                    </Card>
                                </Accordion.Collapse>
                            )
                        })}
                    </Card>
                </Accordion>
            </div>
        )
    }
}

export default Playlist;