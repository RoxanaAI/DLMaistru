import React from 'react'
import { Modal } from '../../components/Modal/Modal.js';
import { useModal } from '../../components/Modal/useModal.js';

export default function Worker({ worker, dismissModal, showDelete = false }) {
    const { modalProps, openModal } = useModal();
    
    function showDetails(){
        if(!dismissModal) {
            openModal();
        }
    }

    function handleDelete() {

    }

    return (
        <div className="card">
            <React.Fragment key={worker.id} >
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
                </div>
                { dismissModal ?
                    null : <button className="btn btn-primary" onClick={showDetails}>Details</button> 
                }
                { showDelete ?
                    <button className="btn btn-primary" onClick={handleDelete}>Delete</button> : null
                }

                <Modal {...modalProps} title={ worker.name } >
                    <div className="form-group row">
                        <label className=""> Specializare: </label> {worker.specialization}
                    </div>
                    < div className="form-group row">
                        <label className=""> Localitate: </label> {worker.location}
                    </div>
                    < div className="form-group row">
                        <label className=""> Telefon: </label>  {worker.phoneNumber}
                    </div>
                    <div className="form-group row">
                        <label className=""> Descriere: </label> { worker.description }
                    </div>
                </Modal>
            </React.Fragment>
        </div>
    );
}
