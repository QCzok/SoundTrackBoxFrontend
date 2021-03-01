import React from 'react';

import './App.css';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import injectSheet, { ThemeProvider } from 'react-jss';

import UserRouter from './components/UserPanel/UserRouter';
import Player from './components/Player';

const styles = () => ({
  wrapper: {
    opacity: props => props.opacity,
    backgroundImage: "url('https://nypost.com/wp-content/uploads/sites/2/2019/11/universe-in-giant-loop.jpg?quality=90&strip=all&w=1286')",
    height: 700,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }
})

const Comp = ({ classes }) => (
  <div className={classes.wrapper}>
  </div>
)

const StyledComp = injectSheet(styles)(Comp)
const theme = {
  background: "yellow",
  color: '#24292e'
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFrequence: 1,
    }
    this.handleCallbackFromSoundTrackPlayer = this.handleCallbackFromSoundTrackPlayer.bind(this);
  }

  handleCallbackFromSoundTrackPlayer(currentFrequence) {
    this.setState({ currentFrequence: currentFrequence })
  }
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <StyledComp opacity={this.state.currentFrequence} />
        </ThemeProvider>
        <MusicPlayerView soundTrackPlayerCallback={this.handleCallbackFromSoundTrackPlayer}>
        </MusicPlayerView>
      </div>
    )
  }
}

class MusicPlayerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: '',
      currentUrl: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
      open: true,
    }
    this.handleCallbackFromSoundTrackPlayer = this.handleCallbackFromSoundTrackPlayer.bind(this);
  }

  handleCallbackFromSoundTrackPlayer(currentFrequence) {
    this.props.soundTrackPlayerCallback(currentFrequence);
  }

  render() {
    return (
      <div>
        <div className="root">
          <div className={this.state.open ? "slider-show" : "slider-hide"}>
          <div className="button">
              {this.state.open
                ? <ChevronRightIcon onClick={() => { this.setState({ open: !this.state.open }); }} />
                : <ChevronLeftIcon onClick={() => { this.setState({ open: !this.state.open }); }} />
              }
            </div>
            <UserRouter></UserRouter>
            <Player
              currentSong={this.state.currentSong}
              currentUrl={this.state.currentUrl}
              soundTrackPlayerCallback={this.handleCallbackFromSoundTrackPlayer}
            >
            </Player>
          </div>
        </div>
      </div>)
  }
}

export default App;