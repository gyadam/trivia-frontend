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
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router history={history}>
        <header>
          <Header />
        </header>
        <Switch>
          <Route path="/" exact component={QuizView} />
          <PrivateRoute path="/list" exact component={QuestionView} />
          <PrivateRoute path="/add" component={FormView} />
          <PrivateRoute path="/edit/:id" component={EditView} />
          <PrivateRoute component={QuestionView} />
        </Switch>
      </Router>
    </div>
  );

}

export default App;
