import { auth } from 'firebase';
import React from 'react';
import  useForm  from '../hooks/CustomForm';



export default function Login(){
  
        const { values, bindInput } = useForm(null);
  
    function handleSubmit(event){
        console.log(values);
        event.preventDefault();
        auth().signInWithEmailAndPassword(values.email,values.password);
    }

return(
    <>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
        <p>
        <label htmlFor="email">Email: </label>
        <input type='email' name="email" id="email" {...bindInput('email')} required/>
        </p>
        <p>
        <label htmlFor="password">Password: </label>
        <input type='password' name="password" {...bindInput('password')} required/>
        </p>
        <button type="submit"> Login </button>
    </form>
    </>
)

        }