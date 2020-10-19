import React from 'react'

export default function Worker({ worker }) {

    return (
        <React.Fragment key={worker.id}>
            <div className="worker-view">
                <h1>{ worker.name }</h1>

                <div className="worker-body">
                    <label className=""> Adaugat la: </label> 
                    <label className="worker-body__content"> {worker.time}  {worker.date} </label>
                </div>

                <div className="worker-body">
                    <label className=""> Specializare: </label> 
                    <label className="worker-body__content"> {worker.specialization} </label>
                </div>

                <div className="worker-body">
                    <label className=""> Localitate: </label> 
                    <label className="worker-body__content">{ worker.location } </label>
                </div>

                <div className="worker-body">
                    <label className=""> Telefon: </label> 
                    <label className="worker-body__content"> { worker.phoneNumber } </label>
                </div>

                <div className="worker-body">
                    <label className=""> Descriere: </label> 
                    <label className="worker-body__content"> { worker.description } </label>
                </div>
            </div>
        </React.Fragment>
    );
}
