import React from 'react';
import { auth } from 'firebase';


export default function Logout(){

    function onLogout() {
       auth().signOut().then(function() {
            // Sign-out successful.
            alert('Log out succesfully')
          }).catch(function(error) {
            // An error happened.
            alert(error.message)
          });
    }

   
    return(
        <>
        <h3>Are you sure that you want to logout?</h3>
        <button onClick={onLogout}>Yes</button>
        <button>No</button>
        </>
    )
}