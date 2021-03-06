import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Playlist from './Playlist';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

import CreatePlaylistDialog from '../Dialogs/CreatePlaylistDialog'

class MusicCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistCollection: [],
            isLoaded: false,
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
        var data = Promise.resolve()
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
        var musicCollection = Promise.resolve(this.loadMusicCollectionGet());
        musicCollection.then((collection) => {
            this.setState({
                isLoaded: true,
                playlistCollection: collection
            })
        });
    }

    render() {

        var isLoaded = this.state.isLoaded;
        if (isLoaded) {

            return (
                <div><CreatePlaylistDialog parentCallback={this.onChangePlaylists}>
                </CreatePlaylistDialog>
                    <ListGroup>
                        {
                            this.state.playlistCollection['musicCollection'].map((playlist, index) => {
                                return (
                                    <ListGroup.Item key={index}>
                                        <Playlist
                                            playlistName={playlist.name}
                                            songCollection={playlist.songList ? playlist.songList : []}
                                            parentCallback={this.onSongChange}
                                        >
                                        </Playlist>
                                    </ListGroup.Item>
                                )
                            })}

                    </ListGroup>
                </div>
            )
        } else {
            return (
                <h1> is loading </h1>
            )
        }
    }
}

export default MusicCollection;