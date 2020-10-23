import React, { useEffect, useState } from 'react'
import WorkersList from './WorkersList';
import DropdownFilter  from '../filters/DropdownFilter';
import * as firebase from 'firebase/app';
import 'firebase/storage';

export default function WorkersPage( {firstItems} ) {
   const [workers, setItem] = useState([]);
   const [primaryExists, setPrimaryExists] = useState(true);
   const [locatization, setLocalization] = useState('');
   const [specialization, setSpecialization] = useState('');

   const db = firebase.firestore();
   useEffect( () => {
        async function fetchData(){
            await db.collection("workersCollection")
                .onSnapshot((docs) => {
                    const workers = [];
                    docs.forEach((doc) => {
                        const worker = {...doc.data(), id: doc.workerid}
                        workers.push(worker);
                    });
                const sortedWorkers = workers.sort((first, second) => sortWorkersByDateAndTime(first, second));
                setItem(sortedWorkers);
            }); 
        }   
        fetchData();
    }, [db, primaryExists]);
   
    if(!workers) {
        return <h1>Nu au fost adaugati maistri ...</h1>;
    }
  
    if (firstItems) {
        const firstItemsCount = 6;
        const displayWorkers = workers.length < firstItemsCount ? workers : workers.slice(0,firstItemsCount);
        return (
            <>
                <WorkersList workers={displayWorkers}></WorkersList>
            </>
        );
    } else {
        function resetFilter(){
            setPrimaryExists(x=> x=!x); 
        }

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

        const dropDownData = getDropDownData(workers);
        return (
            <>
               <DropdownFilter dropdownList={[...new Set(dropDownData[0])]} dropDownTitle={"Filtru localitate"} parentCallback={selection => getFilterLocalization(selection)} clearSelection={primaryExists}></DropdownFilter>
               <DropdownFilter dropdownList={[...new Set(dropDownData[1])]} dropDownTitle={"Filtru specializare"} parentCallback={selection => getFilterSpecialization(selection)} clearSelection={primaryExists}></DropdownFilter>
               <button className="btn btn-primary" onClick={resetFilter}>Resetare filtre</button>
               <WorkersList workers={workers}></WorkersList>
            </>
        );
    }
}

// function sortingWorkers(workers){
//     const sortedWorkers= workers.slice().sort((a,b) => new Date(a.date) - new Date(b.date));
//     sortedWorkers.reverse();
//     return sortedWorkers;
// }

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