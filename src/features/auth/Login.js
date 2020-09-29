import { auth } from 'firebase';
import React from 'react';
import  useForm  from '../../hooks/CustomForm';

export default function Login(){
  
    const { values, bindInput } = useForm(null);
  
    function handleSubmit(event){
         event.preventDefault();
        auth().signInWithEmailAndPassword(values.email,values.password)
        .then(alert('Succesfully loged in'))
        .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
           alert(errorMessage);
          });;
    }

    return(
        <>
        <div className="login">
        <form onSubmit={handleSubmit}>
            <p className="form-group">
            <label htmlFor="email" >Email: </label>
            <input type='email' name="email" id="email" {...bindInput('email')} className="form-control" aria-describedby="emailHelp" placeholder="Enter email" required/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </p>
            <p className="form-group">
            <label htmlFor="password">Password: </label>
            <input type='password' name="password" id="password" {...bindInput('password')} className="form-control" placeholder="Password" required/>
            </p>
            <button type="submit" className="btn btn-primary"> Submit</button>
        </form>
        </div>
        </>
    )

}

export {Login}