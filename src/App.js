import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { Home } from './features/auth/Home';
import { Login } from './features/auth/Login';
import { Logout } from './features/auth/Logout';

import Navbar from './components/Navbar';

function App() {

  return (
    <div>
      <Router>
      <Navbar />
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
