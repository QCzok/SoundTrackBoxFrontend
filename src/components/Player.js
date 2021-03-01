import React from 'react';
import drawAudio from './AudioAnalyzer.js';

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        this.onTimeUpdateHandler = this.onTimeUpdateHandler.bind(this);
    }

    componentDidMount() {
        this.audioData = Promise.resolve(drawAudio(this.props.currentUrl));
    }

    onTimeUpdateHandler = () => {
        // get current timestamp from audio
        var audio = document.getElementById('track');
        var timestamp = audio.currentTime * 10;

        // resolve the current frequence and update parent
        this.audioData.then((value) => this.props.soundTrackPlayerCallback(value[Math.round(timestamp)]));
    }

    render() {
        return (
            <div className="Player">
                <figcaption>{this.props.currentSong}</figcaption>
                <audio
                    id="track"
                    controls
                    src={this.props.currentUrl}
                    onTimeUpdate={(e) => this.onTimeUpdateHandler(e)}
                >
                    Your browser does not support the
              <code>audio</code> element.
          </audio>
            </div>
        )
    }
}

export default Player;