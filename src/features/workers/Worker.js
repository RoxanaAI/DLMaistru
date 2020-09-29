import React from 'react'
import { Link } from 'react-router-dom';


export default function Worker({ worker }) {
    return (
        <React.Fragment key={worker._id}>
            <dt>
                <h2>
                    <Link to={`worker/${worker._id}`}>{ worker.title }</Link>
                </h2>
            </dt>
            <dd>
                { worker.description }
            </dd>
        </React.Fragment>
    );
}
