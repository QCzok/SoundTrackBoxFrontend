import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Playlist from './Playlist';

import CreatePlaylistDialog from '../Dialogs/CreatePlaylistDialog'

class MusicCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songCollection: [],
        }
        this.onChangePlaylists = this.onChangePlaylists.bind(this);
        this.handleSongUpload = this.handleSongUpload.bind(this);
    }

    onChangePlaylists(playlistName){
            this.props.parentCallback(playlistName);
    }

    handleSongUpload(songName, songUrl){
        this.setState({
            songCollection: [...this.state.songCollection, {songName: songName, songUrl: songUrl}],
        })
    }

    render() {
        console.log(this.props.playlistCollection);
        return (
            <div><CreatePlaylistDialog parentCallback={this.onChangePlaylists}>
            </CreatePlaylistDialog>
                <ListGroup>
                    {this.props.playlistCollection.map((playlist, index) => {
                        return (
                            <ListGroup.Item key={index}>
                                <Playlist playlistName={playlist} songCollection={this.state.songCollection} parentCallback={this.handleSongUpload}></Playlist>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
        )
    }
}

export default MusicCollection;