import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import  Home  from './features/auth/Home';
import  Login  from './features/auth/Login';
import  Logout  from './features/auth/Logout';

import  Navbar  from './components/Navbar';
import  WorkersList  from './features/workers/WorkersList';
import  Latest  from './features/workers/Latest';
import Add from './features/add/Add';
import { AuthContextProvider } from './features/auth/AuthContext';

function App() {

  return (
    <div className="container">
      <AuthContextProvider>
      <Router>
      <Navbar />
        <Switch>
            <Route exact path="/" component={Latest} />
            <Route exact path="/workers" component={WorkersList} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/" component={Home} />
            <Route component={() => <h1>404</h1>} />
        </Switch>
      </Router>
    </AuthContextProvider>
    </div>
  );
}

export default App;
