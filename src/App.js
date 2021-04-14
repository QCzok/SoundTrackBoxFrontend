import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CookieConsent from "react-cookie-consent";

import Header from './components/Header';
import LoginForm from './components/Dialogs/LoginForm';
import RegistrationForm from './components/Dialogs/RegistrationForm';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {

  return (
    <main id = "box" className="container">
      <Router>
        <div className="row justify-content-md-center">
          <Header />
        </div>
        <Switch>
          <Route path="/register">
            <RegistrationForm />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <PrivateRoute path="/">
          </PrivateRoute>
        </Switch>
      </Router>
      <CookieConsent>This site uses cookies.</CookieConsent>
    </main >
  )
}

export default App;