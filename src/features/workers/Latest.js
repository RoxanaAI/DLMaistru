import React, { useEffect, useState } from 'react'
import Worker from './Worker';
import * as firebase from 'firebase/app';
import 'firebase/storage';

import 'react-dropdown/style.css';

export default function Latest() {
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

    workers.sort( function(first, second) {
        if(first.date === second.date) {
            return !(new Date(first.time) - new Date(second.time));
        }
        return !(new Date(first.date) - new Date(second.date));
      });
    // TODO - order by date and time
    const latestWorkersList = workers.slice(0, 3);

    return (
        <>
            <h2>Anunturi recente</h2>  
            <dl>
                { latestWorkersList.map(item => <Worker key={item.workerid} worker={item} />) }
            </dl>
        </>
    );
}
