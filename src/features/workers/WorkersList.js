import React, { useEffect, useState } from 'react'
import Worker from './Worker';
import * as firebase from 'firebase/app';
import 'firebase/storage';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function WorkersList() {
    const [workers, setItem] = useState([]);
    const db = firebase.firestore();

    useEffect(() => {
        db.collection("workersCollection")
            .onSnapshot((docs) => {
                const workers = [];
                docs.forEach((doc) => {
                    const worker = {...doc.data(), id: doc.workerid}
                    workers.push(worker);
                });
                setItem(workers);
        });    
    }, [db]);
   
    if(!workers) {
        return <h1>Nu au fost adaugati mesteri ...</h1>;
    }

    const locations = [];
    const specializations = [];

    workers.forEach( item => {
        if(item.location){
            locations.push(item.location);
        }
        if(item.specialization){
            specializations.push(item.specialization);
        }
    });

    return (
        <>
            <div className="">
                <label className="col-sm-3 col-form-label"> Filtru localitate </label>
                <Dropdown options={locations} value={locations[0]} placeholder="Filtru localitate" />
            </div>

            <div className="">
                <label className="col-sm-3 col-form-label"> Filtru specializare </label>
                <Dropdown options={specializations} value={specializations[0]} placeholder="Filtru specializare" />
            </div>          

            <dl>
                { workers.map(item => <Worker key={item.workerid} worker={item} />) }
            </dl>
        </>
    );
}