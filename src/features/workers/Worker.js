import React from 'react'

export default function Worker({ worker }) {

    return (
        <React.Fragment key={worker.id}>
            <dd>
                { worker.name }
                { worker.specialization }
                { worker.location }
                { worker.description }
            </dd>
        </React.Fragment>
    );
}
