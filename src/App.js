import React from 'react';
import './App.css';
import MediaPlayer from './components/MainComponents/MediaPlayer/MediaPlayer';
import Visualizer from './components/MainComponents/Visualizer';
import CookieConsent from "react-cookie-consent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFrequence: 1,

    }
    this.setCurrentFrequency = this.setCurrentFrequency.bind(this);
  }

  setCurrentFrequency(currentFrequence) {
    this.setState({ currentFrequence: currentFrequence })
  }
  render() {
    return (
      <main className="main">
        <section className="visualizer">
        <CookieConsent>This site uses cookies.</CookieConsent>
          <Visualizer></Visualizer>
        </section>
        <section className="media-player">
          <MediaPlayer
            changedFrequencyCallback={this.setCurrentFrequency}>
          </MediaPlayer>
        </section>
      </main>
    )
  }
}

export default App;