import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Song extends React.Component{
    constructor(props){
        super(props);
    }

    onSelect = () => {
        console.log("ckicled me")
    }

    render(){
        return (
        <ListGroup.Item onClick={this.onSelect}>{this.props.songName}</ListGroup.Item>
        );
    }
}

export default Song;