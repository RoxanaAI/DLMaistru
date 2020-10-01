import React from 'react';
import Worker from './Worker';
import useApi from '../../hooks/useApi';

export default function WorkersList() {
    const [workers] = useApi('games');
    
    if(!workers) {
        return <h1>Loading ...</h1>;
    }

    return (
        <>
            <h1>Workers</h1>
            <dl>
                { workers.map(item => <Worker key={item._id} worker={item} />) }
            </dl>
        </>
    );
}

//export {WorkersList};