import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

class UploadDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      songName: '',
      songUrl: '',
      selectedFile: null,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogSubmit = this.handleDialogSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ songName: event.target.value });
  };

  handleUrlChange(event) {
    this.setState({ songUrl: event.target.value });
  };

  handleDialogOpen = () => {
    this.setState({ open: true });
  };

  handleDialogClose = () => {
    this.setState({
      open: false,
      songName: '',
      songUrl: ''
    });
  };

  handleDialogSubmit = () => {
    this.props.parentCallback(this.state.songName, this.state.songUrl, this.state.selectedFile);

    this.setState({
      open: false,
      songName: '',
      songUrl: ''
    });
  };

  onFileUpload = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }


  render() {
    return (
      <React.Fragment>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-plus"
          viewBox="0 0 16 16"
          onClick={this.handleDialogOpen}
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>


        <Modal show={this.state.open} onHide={this.handleDialogClose} animation={false}>
          <Modal.Header closeButton>
            Upload a Song
                </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group text-left">
                <label >Song name</label>
                <input type="song-name"
                  className="form-control"
                  id="playlist"
                  aria-describedby="song name"
                  placeholder="Enter a song name"
                  value={this.state.songName}
                  onChange={this.handleNameChange}
                />
              </div>
              <Form.Group>
                <Form.File id="exampleFormControlFile1" label="Example file input" onChange={this.onFileUpload} />
              </Form.Group>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleDialogSubmit}
            >Submit</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default UploadDialog