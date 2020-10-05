import React from 'react';
import '../stylesheets/Header.css';
import { useAuth0 } from "../react-auth0-spa";


const Header = () => {

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <header>
    <h1 className="logo">
      <a href="/">
      <img id="logoimg" src={process.env.PUBLIC_URL + "/brainlogo.png"} alt="Logo" position="relative"></img>
      </a>
    </h1>
    <input type="checkbox" id="nav-toggle" className="nav-toggle"></input>
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
    <label htmlFor="nav-toggle" className="nav-toggle-label">
      <span></span>
    </label>
  </header>
  )
}

export default Header;


