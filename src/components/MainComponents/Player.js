import React from 'react';
import './Player.css';

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

    onAudioLoad = () => {
        console.log('here')
        const audioCtx = new AudioContext();
        var audio = document.getElementById('track');
        const audioSourceNode = audioCtx.createMediaElementSource(audio);

        this.analyserNode = audioCtx.createAnalyser();
        this.analyserNode.fftSize = 128;
        this.bufferLength = this.analyserNode.frequencyBinCount;
        this.dataArray = new Float32Array(this.bufferLength);

        audioSourceNode.connect(this.analyserNode);
        this.analyserNode.connect(audioCtx.destination);
    }

    onTimeUpdateHandler = () => {


        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = 0;
        canvas.style.left = 0;
        canvas.width = 1200;
        canvas.height = 500;
        document.body.appendChild(canvas);
        const canvasCtx = canvas.getContext('2d');
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        //Schedule next redraw
        requestAnimationFrame(this.onTimeUpdateHandler);

        //Get spectrum data
        this.analyserNode.getFloatFrequencyData(this.dataArray);

        //Draw black background
        canvasCtx.fillStyle = 'rgb(255, 255, 255)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        //Draw spectrum
        const barWidth = (canvas.width / this.bufferLength) * 2.5;
        let posX = 0;
        for (let i = 0; i < this.bufferLength; i++) {
            const barHeight = (this.dataArray[i] + 140) * 2;
            canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ', 50, 50)';
            canvasCtx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
            posX += barWidth + 1;
        }
    }

    render() {
        // {API_BASE_URL + '/media/getSongFile/?songID=' + this.props.currentSongID}
        return (
            <div className="player">
                <figcaption id="caption">{this.props.currentSongName}</figcaption>
                <audio
                    id="track"
                    onCanPlay={this.onAudioLoad}
                    controls
                    crossorigin="anonymous"
                    src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
                    onPlay={this.onTimeUpdateHandler}
                >
                    Your browser does not support the
              <code>audio</code> element.
          </audio>
            </div>
        )
    }
}

export default Player;