import React, { useEffect, useState } from 'react'
import Worker from './Worker';
import * as firebase from 'firebase/app';
import 'firebase/storage';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function WorkersList({ firstItems }) {
    const [workers, setItem] = useState([]);
    const db = firebase.firestore();

    console.log(firstItems);

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

    workers.sort(function(first, second){       
        return sortWorkersByDateAndTime(first, second)
    });

     let displayWorkers = workers;
     if(firstItems) {
        displayWorkers = workers.slice(0,3);
     }

    const dropDownData = getDropDownData(workers);
    let uniqueLocalization = [...new Set(dropDownData[0])];
    let uniqueSpecialization = [...new Set(dropDownData[1])];

    return (
        <>
            <div className="">
                <label className=""> Filtru localitate </label>
                <Dropdown options={uniqueLocalization} placeholder="Filtru localitate"/>
            </div>

            <div className="">
                <label className=""> Filtru specializare </label>
                <Dropdown options={uniqueSpecialization} placeholder="Filtru specializare" />
            </div>          

            <dl>
                { displayWorkers.map(item => <Worker key={item.workerid} worker={item} />) }
            </dl>
        </>
    );
}

function sortWorkersByDateAndTime(first, second) {       
    if(null == first.date || null == second.date) {
        return 1;
    }
    
    if(first.date !== second.date) {
        const dateDif = new Date(first.date) - new Date(second.date);
        return dateDif > 0 ? -1: 1;
    }

    if(null == first.time || null == second.time) {
        return 1;
    }

    var firstTime = first.time.split(":");
    var secontTime = second.time.split(":");

    const hourDif = firstTime[0] - secontTime[0];
    const timeDif = firstTime[1] - secontTime[1]

    if(hourDif !== 0){
        return hourDif > 0 ? -1 : 1;
    }else {
        return timeDif > 0 ? -1 : 1;
    }
}

function getDropDownData(workers) {
    const locations = new Set();
    const specializations = new Set();
    workers.forEach( item => {
        if(item.location){
            locations.add(item.location);
        }
        if(item.specialization){
            specializations.add(item.specialization);
        }
    });

    return [locations, specializations];
}