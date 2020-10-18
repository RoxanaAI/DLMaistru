import React from 'react'
import Worker from './Worker';

export default function WorkersList({ firstItems, workers }) {  
    if(!workers) {
        return <h1>Nu au fost adaugati maistri ...</h1>;
    }

     let displayWorkers = workers;
     if(firstItems) {
        displayWorkers = workers.slice(0,3);
     }

    return (
        <>
            <dl>
                { displayWorkers.map(item => <Worker key={item.workerid} worker={item} />) }
            </dl>
        </>
    );
}