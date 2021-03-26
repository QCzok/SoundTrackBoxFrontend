import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const UploadDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [songName, setSongName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleNameChange = (event) => {
    setSongName(event.target.value)
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setSongName("");
  };

  const handleDialogSubmit = (event) => {
    event.preventDefault();
    if (songName !== "") {
      props.parentCallback(songName, selectedFile);
      setOpen(false);
      setSongName("");
    } else {
      alert("You didn't give your song any name");
    }
  };

  const onFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  return (
    <React.Fragment>
      <a className="dropdown-item" onClick={handleDialogOpen}>Add a song</a>

      <Modal show={open} onHide={handleDialogClose} animation={false}>
        <Modal.Header closeButton>
          Upload a Song
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleDialogSubmit}>
            <Form.Group>
              <Form.File onChange={onFileUpload} accept=".mp3,audio/*" />
            </Form.Group>
            <div className="form-group text-left">
              <label >Song name</label>
              <input type="song-name"
                className="form-control"
                id="playlist"
                aria-describedby="song name"
                placeholder="Enter a song name"
                value={songName}
                onChange={handleNameChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="btn btn-primary"
            onClick={handleDialogSubmit}
          >Submit</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default UploadDialog