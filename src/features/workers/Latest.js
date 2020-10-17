import React from 'react'
import WorkersList from './WorkersList';

import 'react-dropdown/style.css';

export default function Latest() {

    return (
        <>
            <h2>Anunturi recente</h2>  
            <WorkersList firstItems={true}></WorkersList>
        </>
    );
}
