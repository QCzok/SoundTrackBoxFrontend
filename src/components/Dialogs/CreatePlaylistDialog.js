import React from 'react';
import './CreatePlaylistDialog.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class CreatePlaylistDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            playlistName: "",
        };
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDialogOpen() {
        this.setState({ open: true })
    }

    handleDialogClose() {
        this.setState({
            open: false,
            playlistName: "",
        })
    }

    handleSubmit(event) {
        this.props.parentCallback(this.state.playlistName);
        this.setState({
            playlistName: "",
            open: false,
        });
        event.preventDefault();
    }

    handleNameChange(event) {
        this.setState({ playlistName: event.target.value })
    }

    render() {
        return (
            <>
                <button type="button" class="btn btn-outline-dark flex-grow-1" onClick={this.handleDialogOpen}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-plus"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                Add a new playlist
                </button>
                
                <Modal show={this.state.open} onHide={this.handleDialogClose} animation={false}>
                <Modal.Header closeButton>
                Add a playlist
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group text-left">
                            <label >Playlist</label>
                            <input type="playlist"
                                className="form-control"
                                id="playlist"
                                aria-describedby="playlist"
                                placeholder="Enter playlist name"
                                value={this.state.playlistName}
                                onChange={this.handleNameChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.handleSubmit}
                    >Submit</Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }
}

export default CreatePlaylistDialog;