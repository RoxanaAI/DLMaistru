import React, { useContext, useEffect, useState } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import { useForm } from '../../hooks';
import { AuthContext } from '../auth/AuthContext';

const initialFormValues = {item: ''};

export default function Add() {
    const [, setItem] = useState([]);
    const { bindInput, values } = useForm(initialFormValues);
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
                    console.log(newWorkers)
                });   
        }     
    }, [db, user]);
    
    // TODO on the home page to add something there
    // TODO align better the form, the design for maistri and adaugare maistru
    // TODO Add validation for all the input data. All the items should be filed in
    // TODO Adaugare maistru to be available only if login
    // TODO need to clear the database because now we have workers with the same ID
    // TODO remember input login user input
    // TODO apply the filters values
    // TODO add on the first page home the latest submissions

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const time = new Date().getHours() + ":" +  new Date().getMinutes();
            const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            const workerId = user.uid + Math.random() + date + time;

            debugger;
            
            const workerRef = await db.collection("workersCollection").add({   
                user: user.uid,
                workerid:  workerId,
                name: values.name,
                specialization: values.specialization,
                location: values.location,
                phoneNumber: values.phoneNumber,
                description: values.description,
                date: date,
                time: time,
            });
            
            console.log("Worker added with Id: ", workerRef.id);
        } catch(error) {
            console.warn("Error adding worker: ", error);
        };
    }

    return (
        <div>
            {/* <div className="jumbotron jumbotron-fluid"> */}
                <div className="container">
                    
                    <form onSubmit={handleSubmit}>
                        <h1 className="display-4">Maistru</h1>
                        {/* <div className="form-group"> */}
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label"> Nume si prenume</label>
                                <input className="col-sm-9 form-control form--name " {...bindInput('name')} placeholder="Nume si prenume"/>  
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label"> Specializare </label> 
                                <input className="col-sm-9 form-control form-specialization" {...bindInput('specialization')} placeholder="Specializare" />
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label"> Localitate </label>
                                <input className="col-sm-9 form-control form-location" {...bindInput('location')} placeholder="Localitate" />
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label"> Telefon </label>
                                <input className="col-sm-9 form-control form-location" {...bindInput('phoneNumber')} placeholder="Telefon" />
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label"> Descriere</label> 
                                <input className="col-sm-9 form-control form-description" {...bindInput('description')} placeholder="Descriere" />
                            </div>
                        {/* </div> */}
                        <button className="btn btn-primary">Adaugare</button>
                    </form>
                </div>
            {/* </div> */}
        </div>
    )
}
