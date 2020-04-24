import React, { Component } from 'react';
import logo from '../logo.svg';
import '../stylesheets/Header.css';
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";


const Header = () => {

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    // TODO: reset authentication

    <div className="App-header">

      <h1>
        <Link id="home" to="/">Udacitrivia</Link>
      </h1>

      {isAuthenticated && (
        <h2>
          <Link id="add" to="/add">Add</Link>
        </h2>
      )}
      {isAuthenticated && (
        <h2>
          <Link id="list" to="/list">List</Link>
        </h2>
      )}

      {!isAuthenticated && (<button className="login" onClick={() => loginWithRedirect({})}>Log in</button>)}
      {isAuthenticated && <button className="login" onClick={() => logout()}>Log out</button>}

    </div>
  );

}

console.log("rendering header")
export default Header;
console.log("done rendering header")

