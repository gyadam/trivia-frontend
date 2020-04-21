import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

// import logo from './logo.svg';
import './stylesheets/App.css';
import FormView from './components/FormView';
import QuestionView from './components/QuestionView';
import Header from './components/Header';
import QuizView from './components/QuizView';


class App extends Component {
  render() {
    return (
    <div className="App">
      <Header path />
      <Router>
        <Switch>
          <Route path="https://udacitytrivia.herokuapp.com/" exact component={QuestionView} />
          <Route path="https://udacitytrivia.herokuapp.com/add" component={FormView} />
          <Route path="https://udacitytrivia.herokuapp.com/play" component={QuizView} />
          <Route component={QuestionView} />
        </Switch>
      </Router>
    </div>
  );

  }
}

export default App;
