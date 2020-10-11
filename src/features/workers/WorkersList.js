import React, { useEffect, useState } from 'react'
import Worker from './Worker';
import * as firebase from 'firebase/app';
import 'firebase/storage';


// TODO need to clear the database because now we have workers with the same ID
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

    return (
        <>
            <h1>Workers</h1>
            <dl>
                { workers.map(item => <Worker key={item.workerid} worker={item} />) }
            </dl>
        </>
    );
}

//export {WorkersList};