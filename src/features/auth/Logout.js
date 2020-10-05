import React,{ useContext }  from 'react';
import { auth } from 'firebase';
import { Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function Logout(){

  const { isAuthenticated } = useContext(AuthContext);

    function onLogout() {
       auth().signOut().then(function() {
          
          }).catch(function(error) {
            // An error happened.
            alert(error.message)
          });
    }

    if(!isAuthenticated) {
      return <Redirect to='/' />
  }
   
    return(
        <>
        <h3>Are you sure that you want to logout?</h3>
        <button onClick={onLogout}>Yes</button>
        <button>No</button>
        </>
    )
}

