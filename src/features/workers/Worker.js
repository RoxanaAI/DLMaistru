import React from 'react'
import { Link } from 'react-router-dom';

export default function Worker({ worker }) {
    return (
        <React.Fragment key={worker._id}>
            <dt>
                <h2>
                    <Link to={`games/${worker._id}`}>{ worker.title }</Link>
                </h2>
            </dt>
            <dd>
                <img src={ worker.imageUrl } alt="cover" width="100"/>
                { worker.description }
            </dd>
        </React.Fragment>
    );
}
