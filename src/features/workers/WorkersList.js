import React from 'react'
import Worker from './Worker';

export default function WorkersList( {workers}) {  
    if(!workers) {
        return <h1>Nu au fost adaugati maistri ...</h1>;
    }

    return (
        <>
            <dl>
                { workers.map(item => <Worker key={item.workerid} worker={item} />) }
            </dl>
        </>
    );
}