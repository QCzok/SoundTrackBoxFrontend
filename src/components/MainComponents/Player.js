import React from 'react';
import './Player.css';
import { API_BASE_URL } from '../../constants/apiConstants'

//https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatFrequencyData
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        this.analyserNode = null;
        this.dataArray = null;
        this.bufferLength = null;
        this.onTimeUpdateHandler = this.onTimeUpdateHandler.bind(this);
        this.onAudioLoad = this.onAudioLoad.bind(this);
    }

    componentDidMount() {
        this.canvas = document.getElementById('visualizer');
        this.canvasCtx = this.canvas.getContext('2d');
        this.onAudioLoad();
        this.onTimeUpdateHandler();
    }

    onAudioLoad = () => {
        try {
            const audioCtx = new AudioContext();
            var audio = document.getElementById('track');
            const audioSourceNode = audioCtx.createMediaElementSource(audio);

            this.analyserNode = audioCtx.createAnalyser();
            this.analyserNode.fftSize = 1024;
            this.bufferLength = this.analyserNode.frequencyBinCount;
            this.dataArray = new Float32Array(this.bufferLength);

            audioSourceNode.connect(this.analyserNode);
            this.analyserNode.connect(audioCtx.destination);
        } catch (error) {
        }
    }

    onTimeUpdateHandler = () => {
        try {
            //Schedule next redraw
            requestAnimationFrame(this.onTimeUpdateHandler);

            //Get spectrum data
            this.analyserNode.getFloatFrequencyData(this.dataArray);

            //Draw black background
            this.canvasCtx.fillStyle = 'rgb(255, 255, 255)';
            this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            //Draw spectrum
            const barWidth = (this.canvas.width / this.bufferLength) * 2.5;
            let posX = 0;
            for (let i = 0; i < this.bufferLength; i++) {
                const barHeight = (this.dataArray[i] + 140) * 2;
                this.canvasCtx.fillStyle = 'rgb(52 , 58, 74)';
                this.canvasCtx.fillRect(posX, this.canvas.height - barHeight / 2, barWidth, barHeight / 2);
                posX += barWidth + 1;
            }
        } catch (error) {
        }
    }

    render() {
        return (
            <div class="card row flex-fill">
                <canvas id="visualizer" />
                    <h5 class="card-title">{this.props.currentSongName}</h5>
                    <audio
                        id="track"
                        controls
                        crossorigin="anonymous"
                        src={API_BASE_URL + '/media/getSongFile?songID=' + this.props.currentSongID}>
                        Your browser does not support the
                            <code>audio</code> element.
                         </audio>
            </div>
        )
    }
}

export default Player;