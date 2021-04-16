import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CreatePlaylistDialog = (props) => {
    const [open, setOpen] = useState(false);
    const [playlistName, setPlaylistName] = useState("");

    const handleDialogOpen = () => {
        setOpen(true);
    }

    const handleDialogClose = () => {
        setOpen(false);
        setPlaylistName("");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (playlistName !== "") {
            props.parentCallback(playlistName);
            setOpen(false);
            setPlaylistName("");
        } else {
            alert("Your didn't give your playlist any name");
        }
    }

    const handleNameChange = (event) => {
        setPlaylistName(event.target.value);
    }

    return (
        <>
            <button type="button" className="btn btn-outline-dark" onClick={handleDialogOpen}>
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

            <Modal show={open} onHide={handleDialogClose} animation={false}>
                <Modal.Header closeButton>
                    Add a playlist
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group text-left">
                            <label >Playlist</label>
                            <input type="playlist"
                                className="form-control"
                                id="playlist"
                                aria-describedby="playlist"
                                placeholder="Enter playlist name"
                                value={playlistName}
                                onChange={handleNameChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                    >Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreatePlaylistDialog;