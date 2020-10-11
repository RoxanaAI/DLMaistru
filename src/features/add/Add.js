import React, { useContext, useEffect, useState } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import { useForm } from '../../hooks';
import { AuthContext } from '../auth/AuthContext';

const initialFormValues = {item: ''};

export default function Add() {
    const [items, setItem] = useState([]);
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
                title: values.title,

                user: user.uid,
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
                            <input className="form-control" {...bindInput('title')} />
                        </div>
                        <button className="btn btn-primary">Adaugare</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
