import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';


function App() {

  return (
    <div>
      <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Maistru</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
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
      <main>
        <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
        </Switch>   
      </main>
      </Router>
  
    </div>
  );
}

export default App;
