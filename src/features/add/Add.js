import React, { useContext, useEffect, useState } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { Redirect } from 'react-router-dom';

import { useForm } from '../../hooks';
import { AuthContext } from '../auth/AuthContext';

const initialFormValues = [];

export default function Add() {
    const [, setItem] = useState(initialFormValues);
    const { values, bindInput } = useForm(initialFormValues);
    const { user } = useContext(AuthContext);
    const db = firebase.firestore();

    useEffect(() => {
        if(user) {
            db.collection("workersCollection")
                .where("user", "==", user.uid)
                .onSnapshot((docs) => {
                    const newWorkers = [];
                    docs.forEach((doc) => {
                        const worker = {...doc.data(), id: doc.id}
                        newWorkers.push(worker);
                    });
                    setItem(newWorkers);
                });   
        }  

    }, [db, user]);

    // function goTo() {
    //      return <Redirect to='/' />
    // }
    
    // TODO align better the form, the design for maistri and adaugare maistru
    // TODO Add validation for all the input data. All the items should be filed in
    // TODO Adaugare maistru to be available only if login
    // TODO need to clear the database because now we have workers with the same ID
    // TODO remember input login user input
    // TODO apply the filters values
    // TODO remember the last added data in the input

    async function handleSubmit(e) {
        e.preventDefault();
       
        try {
            const time = new Date().getHours() + ":" +  new Date().getMinutes();
            const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            const workerId = user.uid + Math.random() + date + time;
            
            await db.collection("workersCollection").add({   
                user: user.uid,
                workerid:  workerId,
                name: values.name,
                specialization: values.specialization,
                location: values.location,
                phoneNumber: values.phoneNumber,
                description: values.description,
                date: date,
                time: time,
            })
            .then(() => alert('Your profile has been created, '+ values.name))
            .then(() => [] )
            .then(() => {return <Redirect to='/' />})
                              
        } catch(error) {
            console.warn("Error adding worker: ", error);
        };
    }

    return (
        <div>
            {/* <div className="jumbotron jumbotron-fluid"> */}
                <div className="container">
                    
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <h1 className="display-4">Maistru</h1>
                        {/* <div className="form-group"> */}
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label"> Nume si prenume</label>
                                <input className="col-sm-9 form-control form--name " {...bindInput('name')} placeholder="Nume si prenume"  type="text" required minLength="3" />  
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label"> Specializare </label> 
                                <input className="col-sm-9 form-control form-specialization" {...bindInput('specialization')} placeholder="Specializare"  type="text" required  minLength="3" />
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label"> Localitate </label>
                                <input className="col-sm-9 form-control form-location" {...bindInput('location')} placeholder="Localitate"  type="text" required minLength="3" />
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label"> Telefon </label>
                                <input className="col-sm-9 form-control form-location" {...bindInput('phoneNumber')} placeholder="Telefon" type="tel" pattern="[0-9]{4} [0-9]{3} [0-9]{3}" required />
                                <small>Format: 1234 567 890</small>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label"> Descriere</label> 
                                <input className="col-sm-9 form-control form-description" {...bindInput('description')} placeholder="Descriere" type="text" required  minLength="3" />
                            </div>
                        {/* </div> */}
                        <button className="btn btn-primary">Adaugare</button>
                    </form>
                </div>
            {/* </div> */}
        </div>
    )
}
