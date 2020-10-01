import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../src/assets/images/mester.jpg'


export default function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-light ">
          <img src={logo} alt="logo-mistru" className="logo"></img>
          <a className="navbar-brand" href="#home">
            <Link to={""} className="nav-brand">Maistru</Link>
          </a>        
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#home"><span className="sr-only">(current)</span>
                <Link to={"/games"} className="nav-link">Workers</Link></a>
              </li>
              </ul>
              <ul className="navbar-nav navbar-right">
              <li className="nav-item ">
                <Link to={"/login"} className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">Register</Link>
              </li>
              <li className="nav-item">
                <Link to={"/logout"} className="nav-link">Logout</Link>
              </li>
            </ul>
          </div>
      </nav>
    )
}

