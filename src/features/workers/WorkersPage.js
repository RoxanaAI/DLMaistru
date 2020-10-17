import React from 'react'
import WorkersList from './WorkersList';
import WorkersFilters from './WorkersFilters';
import 'firebase/storage';

export default function WorkersPage() {

    return (
        <>
            <WorkersFilters workers={[]}></WorkersFilters>
            <WorkersList firstItems={false}></WorkersList>
        </>
    );
}