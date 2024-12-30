import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import How from './components/How';
import WordsAll from './components/WordsAll';
import WordsImg from './components/WordsImg';
import Sentences from './components/Sentences';
import Stories from './components/Stories';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/imgwords">
          <WordsImg />
        </Route>
        <Route path="/allwords">
          <WordsAll />
        </Route>
        <Route path="/sentences">
          <Sentences />
        </Route>
        <Route path="/stories">
          <Stories />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/how">
          <How />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
