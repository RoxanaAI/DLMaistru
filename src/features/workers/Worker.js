import React from 'react'

export default function Worker({ worker }) {

    return (
        <div className="card">
        <React.Fragment key={worker.id}>
        <div className="card-header">
            <h2>{ worker.name }</h2>
        </div>
            <div className="card-body">
                <div className="">
                    <label className=""> Adaugat la: </label> {worker.time}  {worker.date}
                </div>

                <div className="">
                    <label className=""> Specializare: </label> {worker.specialization}
                </div>

                <div className="">
                    <label className=""> Localitate: </label> { worker.location }
                </div>

                <div className="">
                    <label className=""> Telefon: </label> { worker.phoneNumber }
                </div>

                <div className="">
                    <label className=""> Descriere: </label> { worker.description }
                </div>
            </div>
        </React.Fragment>
        </div>
    );
}
