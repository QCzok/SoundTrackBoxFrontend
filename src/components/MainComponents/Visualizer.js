import React from 'react';
import './Visualizer.css';

class Visualizer extends React.Component {
    constructor(props) {
      super(props)
    }
    //       <img src={process.env.PUBLIC_URL + '/sky.jpg'}></img>
    render() {
      return (
        <canvas id = "visualizer">
        </canvas>
      )
    }
  }

  export default Visualizer;