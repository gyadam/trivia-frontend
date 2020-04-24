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
import EditView from './components/EditView';

import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  const { loading } = useAuth0();
  if (loading) {
    console.log("waiting for auth...")
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router history={history}>
        <header>
          <Header />
        </header>
        <Switch>
          {/* TODO: reset back to privateroute */}
          <Route path="/" exact component={QuizView} />
          <Route path="/list" exact component={QuestionView} />
          <Route path="/add" component={FormView} />
          <Route path="/edit/:id" component={EditView} />
          <Route component={QuestionView} />
        </Switch>
      </Router>
    </div>
  );

}

export default App;
