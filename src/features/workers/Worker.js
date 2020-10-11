import React from 'react'

export default function Worker({ worker }) {

    return (
        <React.Fragment key={worker.id}>
            <dd>
                { worker.name }
                { worker.specialization }
                { worker.location }
                { worker.phoneNumber }
                { worker.description }
            </dd>
        </React.Fragment>
    );
}
