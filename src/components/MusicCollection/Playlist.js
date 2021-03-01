import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import UploadDialog from '../Dialogs/UploadDialog';
import Song from './Song';


class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(songName, songUrl){
        this.props.parentCallback(songName, songUrl);
    }

    render() {
        return (
            <div>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                {this.props.playlistName}
                            </Accordion.Toggle>
                            <UploadDialog songlist={this.props.songCollection} parentCallback={this.handleUpload}>
                            </UploadDialog>
                        </Card.Header>
                        {this.props.songCollection.map((song, index) => {
                            return (
                                <Accordion.Collapse eventKey="0" key={index}>
                                    <Card key={index}><Song songName={song.songName} songUrl={song.songUrl}></Song></Card>
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