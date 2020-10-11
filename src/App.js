import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import  Home  from './features/auth/Home';
import  Login  from './features/auth/Login';
import  Logout  from './features/auth/Logout';

import  Navbar  from './components/Navbar';
import  WorkerDetails  from './features/workers/WorkerDetails';
import  WorkersList  from './features/workers/WorkersList';
import { AuthContextProvider } from './features/auth/AuthContext';

function App() {

  return (
    <div>
      <AuthContextProvider>
      <Router>
      <Navbar />
      <main>
        <Switch>
            <Route exact path="/workers" component={WorkersList} />
            <Route exact path="/workers/:id" component={WorkerDetails} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/" component={Home} />
            <Route component={() => <h1>404</h1>} />
        </Switch>
      </main>
      </Router>
    </AuthContextProvider>
    </div>
  );
}

export default App;
