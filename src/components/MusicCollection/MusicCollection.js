import React from 'react';
import './MusicCollection.scss';
import axios from 'axios';
import Playlist from './Playlist';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

import CreatePlaylistDialog from '../Dialogs/CreatePlaylistDialog'

class MusicCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { musicCollection: [] },
        }
        this.onChangePlaylists = this.onChangePlaylists.bind(this);
        this.addPlaylistPost = this.addPlaylistPost.bind(this);
        this.onSongChange = this.onSongChange.bind(this);
    }

    componentDidMount() {
        Promise.resolve(this.loadMusicCollectionGet()).then((user) => {
            this.setState({
                user: user
            });
        })
    }

    onChangePlaylists(playlistName) {
        Promise.resolve()
            .then(this.addPlaylistPost(playlistName).then(result => {
                this.setState({
                    user: result
                });
            }));
    }

    onSongChange(result) {
        this.setState({
            user: result
        });
    }

    listOfPlaylists = (user) => {
        return user['musicCollection'].map((playlist) => {
            return (
                <div key={playlist._id} className="col-md-12">
                    <Playlist
                        playlistName={playlist.name}
                        playlistID={playlist._id}
                        songCollection={playlist.songList ? playlist.songList : []}
                        parentCallback={this.onSongChange}
                        updateCurrentSong={this.props.updateCurrentSong}
                    >
                    </Playlist>
                </div>
            )
        })
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

    render() {

        return (
            <div className="row">
                <CreatePlaylistDialog parentCallback={this.onChangePlaylists} />
                {
                    this.listOfPlaylists(this.state.user)
                }
            </div>
        )
    }
}

export default MusicCollection;