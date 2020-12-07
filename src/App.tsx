import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Container } from '@material-ui/core';

import { Characters, CharacterDetails, NotFound } from './views';
import { Header } from './components';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Container className="app--container">
          <Switch>
            <Route exact path="/characters">
              <Characters />
            </Route>
            <Route exact path="/characters/:id">
              <CharacterDetails />
            </Route>
            <Route exact path="/">
              <Redirect to="/characters" />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
