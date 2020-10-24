import { auth } from 'firebase';
import React , { useContext } from 'react';
import  useForm  from '../../hooks/useForm';
import { AuthContext } from './AuthContext';
import { Redirect } from 'react-router-dom';


export default function Login(){
  
    const { values, bindInput } = useForm(null);
    const { isAuthenticated } = useContext(AuthContext);
  
    function handleSubmit(event){
         event.preventDefault();
        auth().signInWithEmailAndPassword(values.email,values.password)
        .then(console.log('Succesfully loged in'))
        .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
           alert(errorMessage);
          });;
    }

    if(isAuthenticated) {
        return <Redirect to='/' />
    }

    return(
        <>
        <div className="login">
        <form onSubmit={handleSubmit}>
            <p className="form-group">
            <label htmlFor="email" >Email: </label>
            <input type='email' name="email" id="email" {...bindInput('email')} className="form-control" aria-describedby="emailHelp" placeholder="Email" required/>
            <small id="emailHelp" className="form-text text-muted">Aceste email nu se va transmite mai departe.</small>
            </p>
            <p className="form-group">
            <label htmlFor="password">Parola: </label>
            <input type='password' name="password" id="password" {...bindInput('password')} className="form-control" placeholder="Parola" required/>
            </p>
            {/* checkbox tine ma minte */}
            <button type="submit" className="btn btn-primary"> Conectare</button>
        </form>
        </div>
        </>
    )

}

