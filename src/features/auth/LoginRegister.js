import { auth } from 'firebase';
import React , { useContext } from 'react';
import  useForm  from '../../hooks/useForm';
import { AuthContext } from './AuthContext';
import { Redirect, useLocation } from 'react-router-dom';


export default function LoginRegister(){
    const { values, bindInput } = useForm(null);
    const { isAuthenticated } = useContext(AuthContext);
    const { pathname } = useLocation();
    const isRegister = (pathname === '/register');
  
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if(!isRegister) {
                await auth().signInWithEmailAndPassword(values.email, values.password);
            } else {
                if(values && values.password === values.retype_password) {
                    await auth().createUserWithEmailAndPassword(values.email, values.password);  
                } else {
                    alert('The two passwords must match!');
                }
            }
        } catch(e) {
            var errorMessage = e.message;
            alert(errorMessage);
        }
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
                    { isRegister && (
                        <p className="form-group">
                            <label htmlFor="retype_password">Rescriere parola: </label>
                            <input type='password' name="password" id="retype_password" {...bindInput('retype_password')} className="form-control" placeholder="Rescriere parola" required/>
                        </p>
                    )}
                    <button type="submit" className="btn btn-primary"> { !isRegister ? 'Connectare' : 'Inregistrare' }</button>
                </form>
            </div>
        </>
    )

}

