import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.scss';
import FavoritesContainer from './containers/FavoritesContainer';
import ImageContainer from './containers/ImageContainer';

function App() {
  return (

    <Router>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/zapisane">Zapisane</Link>
            </li>
          </ul>
        </nav>
        <div className="App">
    <div className="App-content">
        <Switch>

            <Route path="/zapisane">
              <FavoritesContainer />
            </Route>
            <Route path="/">
              <ImageContainer />
            </Route>

        </Switch>
        </div>
          </div>
    </Router>

  );
}

export default App;
