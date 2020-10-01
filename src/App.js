import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import  Home  from './features/auth/Home';
import  Login  from './features/auth/Login';
import  Logout  from './features/auth/Logout';

import  Navbar  from './components/Navbar';
import  WorkerDetails  from './features/workers/WorkerDetails';
import  WorkersList  from './features/workers/WorkersList';

function App() {

  return (
    <div>
      <Router>
      <Navbar />
      <main>
        <Switch>
            <Route exact path="/games" component={WorkersList} />
            <Route exact path="/games/:id" component={WorkerDetails} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/" component={Home} />
            <Route component={() => <h1>404</h1>} />
        </Switch>
      </main>
      </Router>
  
    </div>
  );
}

export default App;
