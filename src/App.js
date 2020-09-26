import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';


function App() {

  return (
    <div>
      <h1>React & Firebase</h1>
      <Router>
      <Link to={"/login"}>Login</Link>
      <main>
        <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/login" component={Login} />
        </Switch>   
      </main>
      </Router>
  
    </div>
  );
}

export default App;
