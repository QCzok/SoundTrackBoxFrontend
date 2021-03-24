import MediaPlayer from './components/MainComponents/MediaPlayer';
import CookieConsent from "react-cookie-consent";

const App = () => {
  return (
    <main className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <MediaPlayer className="MediaPlayer" />
        </div>
      </div>
      <CookieConsent>This site uses cookies.</CookieConsent>
    </main >
  )
}

export default App;