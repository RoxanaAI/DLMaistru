import React, { useEffect, useState } from 'react'
import WorkersList from './WorkersList';
import DropdownFilter  from '../filters/DropdownFilter';
import * as firebase from 'firebase/app';
import 'firebase/storage';

export default function WorkersPage() {
    const [workers, setItem] = useState([]);
    const [filterdWorkers, setFilteredItem] = useState(null);
    const db = firebase.firestore();
   const [locatization, setLocalization] = useState('');
   const [specialization, setSpecialization] = useState('');
   const [primaryExists, setPrimaryExists] = useState(true);

   let clearSelection= false;

    useEffect( () => {
        async function fetchData(){
         await db.collection("workersCollection")
            .onSnapshot((docs) => {
                const workers = [];
                docs.forEach((doc) => {
                    const worker = {...doc.data(), id: doc.workerid}
                    workers.push(worker);
                });
             const sortedWorkers=sortingWorkers(workers);
             setItem(sortedWorkers);
              console.log("in useEffect ")
              console.log(workers);
        }); 
    }   
    fetchData();
    }, [db, primaryExists]);
    
    if(!workers) {
        return <h1>Nu au fost adaugati maistri ...</h1>;
    }


    const dropDownData = getDropDownData(workers);

    const getFilterLocalization = (selection) =>{
        setLocalization(selection);
        const fiteredWorkers =  workers.filter(x => x.location === selection);
        setItem(fiteredWorkers);
    }

    const getFilterSpecialization= (selection) =>{
        setSpecialization(selection);
        const fiteredWorkers =  workers.filter(x => x.specialization === selection);
        setItem(fiteredWorkers);
    }

    function resetFilter(){
        setPrimaryExists(x=> x=!x);
 
    }
   
        return (
            <>
                <DropdownFilter dropdownList={[...new Set(dropDownData[0])]} dropDownTitle={"Filtru localitate"} parentCallback={selection => getFilterLocalization(selection)} clearSelection={primaryExists}></DropdownFilter>
                <DropdownFilter dropdownList={[...new Set(dropDownData[1])]} dropDownTitle={"Filtru specializare"} parentCallback={selection => getFilterSpecialization(selection)} clearSelection={primaryExists}></DropdownFilter>
                <button className="btn btn-primary" onClick={resetFilter}>Resetare filtre</button>
                <WorkersList firstItems={false} workers={workers}></WorkersList>
               
            </>
        );
    }

function sortingWorkers(workers){
    const sortedWorkers= workers.slice().sort((a,b) => new Date(a.date) - new Date(b.date));
    sortedWorkers.reverse();
    return sortedWorkers;
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