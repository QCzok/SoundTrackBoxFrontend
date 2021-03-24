import React from 'react';
import './Song.css';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import Cookies from 'universal-cookie';

class Song extends React.Component {
    constructor(props) {
        super(props);
        this.deleteSong = this.deleteSong.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    deleteSong() {
        const cookies = new Cookies();
        Promise.resolve(this.deleteSongPost(this.props.playlistID, this.props.songID)).then((result) => this.props.parentCallback(result));
        if (cookies.get('songID') === this.props.songID) {
            this.props.updateCurrentSong(undefined, undefined);
        }
    }

    async deleteSongPost(playlistID, songID) {
        return axios.post(API_BASE_URL + '/media/deleteSong', { playlistID: playlistID, songID: songID }, { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
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

    handleOnClick() {
        this.props.updateCurrentSong(this.props.songName, this.props.songID)
    }

    render() {
        return (
            <div className="row bg-light">
                <div id="delete-song" className="nav-item dropdown">
                    <a className="dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-music-fill" viewBox="0 0 16 16">
                            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-.5 4.11v1.8l-2.5.5v5.09c0 .495-.301.883-.662 1.123C7.974 12.866 7.499 13 7 13c-.5 0-.974-.134-1.338-.377-.36-.24-.662-.628-.662-1.123s.301-.883.662-1.123C6.026 10.134 6.501 10 7 10c.356 0 .7.068 1 .196V4.41a1 1 0 0 1 .804-.98l1.5-.3a1 1 0 0 1 1.196.98z" />
                        </svg>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" onClick={this.deleteSong}>Delete this song</a>
                    </div>
                </div>
                <button className="btn flex-fill" onClick={this.handleOnClick}>{this.props.songName}</button>
            </div>
        );
    }
}

export default Song;