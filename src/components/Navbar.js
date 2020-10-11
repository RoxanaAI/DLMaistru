import React , {useContext} from 'react';
import { NavLink, Link, useLocation  } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth"; 

import { AuthContext } from '../features/auth/AuthContext';


export default function Navbar() {
  const { isAuthenticated, user } = useContext(AuthContext);

  async function handleLogout(e) {
    e.preventDefault();

    try {
        await firebase.auth().signOut();
    } catch(e) {
        console.warn(e);
    } 
}

    return (
      <nav className="navbar navbar-dark navbar-expand bg-dark">
            <Link className="navbar-brand" to="/">DLMaistru</Link>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <SrNavLink className="nav-link" to="/workers">Anunturi</SrNavLink>
                    </li>
                    <li className="nav-item">
                        <SrNavLink className="nav-link" to="/add">Add</SrNavLink>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    {!isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <SrNavLink className="nav-link" to="/login">Login</SrNavLink>
                            </li>
                            <li className="nav-item">
                                <SrNavLink className="nav-link" to="/register">Register</SrNavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                Welcome, {user.email}!
                            </li>
                            <li className="nav-item">
                                <a href="/" onClick={handleLogout}>Logout</a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}

function SrNavLink({ children, ...rest}) {
  const location = useLocation();

  return (
      <NavLink {...rest}>
          { children }
          { location.pathname === rest.to && <span className="sr-only">(current)</span> }
      </NavLink>
  );
}
