import React, { useEffect, useState } from 'react'
import WorkersList from './WorkersList';
import WorkersFilters from './WorkersFilters';
import DropdownFilter  from './DropdownFilter';
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

    let list = ["a2", "b3", "c3", "d3"];
    let pl = "Selecteaza44";
    let title = "titlu";

    return (
        <>
            <DropdownFilter dropdownList={list} dropDownTitle={title} dropDownPlaceholder={pl}></DropdownFilter>
            <WorkersFilters workers={workers}></WorkersFilters>
            <WorkersList firstItems={false}></WorkersList>
        </>
    );
}