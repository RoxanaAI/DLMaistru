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
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const workerRef = await db.collection("workersCollection").add({
                user: user.uid,
                name: values.name,
                specialization: values.specialization,
                location: values.location,
                description: values.description,
            });
            
            console.log("Worker added with Id: ", workerRef.id);
        } catch(error) {
            console.warn("Error adding worker: ", error);
        };
    }

    return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Maistru</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div><label> Nume si prenume <input className="form--name" {...bindInput('name')} /> </label>  </div>
                            <div><label> Specializare <input className="form-specialization" {...bindInput('specialization')} /> </label> </div>
                            <div><label> Localitate <input className="form-location" {...bindInput('location')} /> </label> </div>
                            <div><label> Descriere <input className="form-description" {...bindInput('description')} /> </label> </div>
                        </div>
                        <button className="btn btn-primary">Adaugare</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
