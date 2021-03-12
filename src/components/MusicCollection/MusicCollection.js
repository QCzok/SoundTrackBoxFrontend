import React from 'react';
import './MusicCollection.css';
import axios from 'axios';
import Playlist from './Playlist';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

import CreatePlaylistDialog from '../Dialogs/CreatePlaylistDialog'

class MusicCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistCollection: null,
        }
        this.onChangePlaylists = this.onChangePlaylists.bind(this);
        this.reloadCollection = this.reloadCollection.bind(this);
        this.addPlaylistPost = this.addPlaylistPost.bind(this);
        this.onSongChange = this.onSongChange.bind(this);
    }

    componentDidMount() {
        this.reloadCollection();
    }

    onChangePlaylists(playlistName) {
        Promise.resolve()
            .then(this.addPlaylistPost(playlistName).then(result => {
                this.setState({
                    playlistCollection: result
                });
            }));
    }

    onSongChange(result) {
        this.setState({
            playlistCollection: result
        });
    }

    async addPlaylistPost(playlistName) {
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

    async loadMusicCollectionGet() {
        var data = axios.get(API_BASE_URL + '/media/loadMusicCollection', { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then(res => { return res.data }).catch(function (error) {
                console.log(error);
            })
        return data;
    }

    reloadCollection() {
        Promise.resolve(this.loadMusicCollectionGet()).then((collection) => {
            this.setState({
                playlistCollection: collection
            });
        })
    }

    render() {
        if (this.state.playlistCollection) {
            return (
                <section className='library'>
                        <CreatePlaylistDialog parentCallback={this.onChangePlaylists} />
                        <ul className="list-group collection">
                            {
                                this.state.playlistCollection['musicCollection'].map((playlist, index) => {
                                    return (
                                        <li id="frame" className="list-group-item" key={index}>
                                            <Playlist
                                                playlistName={playlist.name}
                                                songCollection={playlist.songList ? playlist.songList : []}
                                                parentCallback={this.onSongChange}
                                                updateCurrentSong={this.props.updateCurrentSong}
                                            >
                                            </Playlist>
                                        </li>
                                    )
                                })}

                        </ul>
                </section>
            )
        } else {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }
    }
}

export default MusicCollection;