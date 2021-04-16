import React from 'react';
import '../App.css';
import { API_BASE_URL } from '../constants/apiConstants'
import draw from './visualizer/draw';

//https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatFrequencyData
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            visualization: 1,
            isPlaying: false,
        }
        this.analyserNode = undefined;
        this.dataArray = undefined;
        this.bufferLength = undefined;
        this.audioCtx = undefined;
        this.onTimeUpdateHandler = this.onTimeUpdateHandler.bind(this);
        this.onAudioLoad = this.onAudioLoad.bind(this);
    }

    componentDidMount() {
        this.canvas = document.getElementById('visualizer');
        this.canvasCtx = this.canvas.getContext('2d');
    }

    onAudioLoad = () => {
        try {
            this.setState({ isPlaying: true }, () => {
                if (!this.audioCtx || !this.analyserNode) {
                    this.audioCtx = new AudioContext();
                    var audio = document.getElementById('track');
                    const audioSourceNode = this.audioCtx.createMediaElementSource(audio);

                    this.analyserNode = this.audioCtx.createAnalyser();
                    this.analyserNode.fftSize = 32;
                    this.bufferLength = this.analyserNode.frequencyBinCount;
                    this.dataArray = new Float32Array(this.bufferLength);

                    audioSourceNode.connect(this.analyserNode);
                    this.analyserNode.connect(this.audioCtx.destination);
                    this.onTimeUpdateHandler();
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    onTimeUpdateHandler = () => {
        try {
            //Schedule next redraw
                requestAnimationFrame(this.onTimeUpdateHandler);
                if (this.state.isPlaying) {

                //Get spectrum data
                this.analyserNode.getFloatFrequencyData(this.dataArray);

                this.canvasCtx.fillStyle = 'Gainsboro';
                this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                draw(this.state.visualization, this.canvas, this.bufferLength, this.dataArray, this.canvasCtx);
            }
        } catch (error) {
            this.setState({ isPlaying: false });
            console.log(error);
        }
    }

    render() {
        {
            this.props.currentSongID ?
                this.src = API_BASE_URL + '/media/getSongFile?songID=' + this.props.currentSongID :
                this.src = "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
        }
        return (
            <div id="player" className="card flex-fill">
                <canvas id={this.state.visualization === 1 ? "visualizer" : "novisualizer"} />
                {this.state.visualization >1 && (<div id="container"></div>)}
                <h5 className="card-title">{this.props.currentSongName}</h5>
                <audio
                    onPlay={this.onAudioLoad}
                    onPause={() => { this.setState({ isPlaying: false }) }}
                    id="track"
                    controls
                    crossOrigin="anonymous"
                    src={this.src}>
                    Your browser does not support the
                            <code>audio</code> element.
                         </audio>
                <button onClick={() => this.setState({ visualization: 1 })}>Visualization 1</button>
                <button onClick={() => this.setState({ visualization: 2 })}>Visualization 2</button>
                <button onClick={() => this.setState({ visualization: 3 })}>Visualization 3</button>
            </div>
        )
    }
}

export default Player;