import React from 'react';
import WorkersPage from '../workers/WorkersPage';

export default function Home(){
    return(
        <>
            <h2>DL. Maistru va ajuta sa gasiti mesterul potrivit nevoilor dumneavoastre.</h2>  
            <h2>Anunturi recente</h2>  
            <WorkersPage firstItems={true}></WorkersPage>
        </>
    )
}

