import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME, CURRENT_SONG } from '../../constants/apiConstants';

class Song extends React.Component {
    constructor(props) {
        super(props);
        this.deleteSong = this.deleteSong.bind(this);
    }

    onSelect = () => {
        localStorage.setItem(CURRENT_SONG, this.props.songID);
    }

    deleteSong() {
        Promise.resolve(this.deleteSongPost(this.props.playlistName, this.props.songName, this.props.songID)).then((result) => this.props.parentCallback(result));
    }

    async deleteSongPost(playlistName, songName, songID) {
        return axios.post(API_BASE_URL + '/media/deleteSong', { playlistName: playlistName, songName: songName, songID: songID}, { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
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

    render() {
        return (
            <ListGroup.Item>
                {this.props.songName}

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-plus b-plain"
                    viewBox="0 0 16 16"
                    onClick={this.deleteSong}
                >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-plus b-plain"
                    viewBox="0 0 16 16"
                    onClick={this.onSelect}
                >
                     <path d="M6 10.117V5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43z"/>
                     <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                </svg>
            </ListGroup.Item>
        );
    }
}

export default Song;