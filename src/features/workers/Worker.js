import React from 'react'

export default function Worker({ worker }) {

    return (
        <React.Fragment key={worker.id}>
            <h1>{ worker.name }</h1>

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
        </React.Fragment>
    );
}
