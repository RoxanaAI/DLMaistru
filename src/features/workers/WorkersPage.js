
import React, { useEffect, useState } from 'react'
import WorkersList from './WorkersList';
import WorkersFilters from './WorkersFilters';
import * as firebase from 'firebase/app';
import 'firebase/storage';

export default function WorkersPage() {
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
        return <h1>Nu au fost adaugati maistri ...</h1>;
    }

    return (
        <>
            <WorkersFilters workers={workers}></WorkersFilters>
            <WorkersList firstItems={false}></WorkersList>
        </>
    );
}