import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './features/auth/Home';
import { Login } from './features/auth/Login';
import { Logout } from './features/auth/Logout';

import { Navbar } from './components/Navbar';
import { WorkerDetails } from './features/workers/WorkerDetails';
import { WorkersList } from './features/workers/WorkersList';

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
            <Route exact path="/worker" component={WorkersList} />
            <Route exact path="/worker/:workerId" component={WorkerDetails} />
            <Route component={() => <h1>404</h1>} />
        </Switch>
        <WorkerDetails />
      </main>
      </Router>
  
    </div>
  );
}

export default App;
