import React, { useState } from 'react'
import { Modal } from '../../components/Modal/Modal.js';
import { useModal } from '../../components/Modal/useModal.js';
import * as firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';

export default function Worker({ worker, dismissModal, showDelete = false, showEdit = false }) {
    const { modalProps, openModal } = useModal();
    const history = useHistory();

    function showDetails(){
        if(!dismissModal) {
            openModal();
        }
    }

   async function handleDelete() {
      await firebase.firestore().collection('workersCollection').onSnapshot(documents => {
          documents.forEach(document =>{ 
                if(document.data().workerid === worker.workerid){
                  firebase.firestore().collection('workersCollection').doc(document.id).delete();
                alert('Anuntul a fost sters cu success!')
           }
        })
        });
      }
      
    //   async function handleEdit() {
    //     await firebase.firestore().collection('workersCollection').onSnapshot(documents => {
    //         documents.forEach(document =>{ 
    //               if(document.data().workerid === worker.workerid){
    //                 firebase.firestore().collection('workersCollection').doc(document.id).update();
    //               alert('Anuntul a fost modificat cu success!')
    //          }
    //       })
    //       });
    //     }

    function handleEdit(){
          history.push({
            pathname: `/edit/${id}`,
         })}


         const id = (worker.workerid).slice(0,29);

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
                    null : <button className="btn btn-primary worker-btn" onClick={showDetails}>Detalii</button> 
                }
                { showEdit ?
                    <button className="btn btn-primary worker-btn" onClick={handleEdit}>Editare</button> : null
                } 
                { showDelete ?
                    <button className="btn btn-primary worker-btn" onClick={handleDelete}>Stergere</button> : null
                }

                <Modal {...modalProps} title={ worker.name } >
                    <div className="worker-details">
                        <label className=""> Specializare: </label> {worker.specialization}
                    </div>
                    < div className="worker-details">
                        <label className=""> Localitate: </label> {worker.location}
                    </div>
                    < div className="worker-details">
                        <label className=""> Telefon: </label>  {worker.phoneNumber}
                    </div>
                    <div className="worker-details">
                        <label className=""> Descriere: </label> { worker.description } 
                    </div>
                </Modal>
            </React.Fragment>
        </div>
    );
}
