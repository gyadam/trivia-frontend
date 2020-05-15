import React from 'react';
import '../stylesheets/Header.css';
import { useAuth0 } from "../react-auth0-spa";


const Header = () => {

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <header>
    <h1 class="logo">
      <a href="/">
      <img id="logoimg" src="brainlogo.png" position="relative"></img>
      </a>
    </h1>
    <input type="checkbox" id="nav-toggle" class="nav-toggle"></input>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/list">List</a></li>
        <li><a href="/add">Add</a></li>
        <li>{isAuthenticated ?
          <a href="/" onClick={() => logout()}>Logout</a> :
          <a href="/" onClick={() => loginWithRedirect({})}>Login</a>
        }</li>
      </ul>
    </nav>
    <label for="nav-toggle" class="nav-toggle-label">
      <span></span>
    </label>
  </header>
  )
}

export default Header;


