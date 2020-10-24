import React, { useContext, useEffect, useState } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { Redirect } from 'react-router-dom';
import { Modal } from '../../components/Modal/Modal.js';
import { useModal } from '../../components/Modal/useModal.js';

import { useForm } from '../../hooks';
import { AuthContext } from '../auth/AuthContext';
import Select from 'react-select';

const initialFormValues = {value: ''};

export default function Add() {
    const [ , setItem ] = useState(initialFormValues);
    const [ validationMessage, setValidationMessage ] = useState("");
    const { values, bindInput, bindOption } = useForm(initialFormValues);
    const { modalProps, openModal } = useModal();
    const { user } = useContext(AuthContext);

    const db = firebase.firestore();
    useEffect(() => {
        if(user) {
            db.collection("workersCollection")
                .where("user", "==", user.uid)
                .onSnapshot((docs) => {
                    const newWorkers = [];
                    docs.forEach((doc) => {
                        const worker = {...doc.data(), id: doc.id}
                        newWorkers.push(worker);
                    });
                    setItem(newWorkers);
                });   
        }  

    }, [db, user]);

    // function goTo() {
    //      return <Redirect to='/' />
    // }
    // TODO add hand cursor for the cards
    // TODO align better the form, the design for maistri and adaugare maistru
    // TODO Adaugare maistru to be available only if login
    // TODO need to clear the database because now we have workers with the same ID
    // TODO remember input login user input
    // TODO remember the last added data in the input
    // TODO bind location

    async function handleSubmit(e) {
        e.preventDefault();
          
        try {
            const time = new Date().getHours() + ":" +  new Date().getMinutes();
            const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            const workerId = user.uid + Math.random() + date + time;
            
            await db.collection("workersCollection").add({   
                user: user.uid,
                workerid:  workerId,
                name: values.name,
                specialization: values.specialization,
                location: values.location,
                phoneNumber: values.phoneNumber,
                description: values.description,
                date: date,
                time: time,
            })
            .then(() => alert('Your profile has been created, '+ values.name))
            .then(() => [] )
            .then(() => {return <Redirect to='/' />})
                              
        } catch(error) {
            console.warn("Error adding worker: ", error);
        };
    }
    
    function handleAdd(){
        const validationMessage = dataIsValid(values);
        if(validationMessage) {
            setValidationMessage(validationMessage);
            openModal();
        }
    }

    function locationChange(event){
        if(event == null || event === undefined || !event.value){
            values.location = "";
            return;
        }

        values.location = event.value;
    }

    let json = require('./Cities.json');
    const dropdownList = [];
    json.Romania.cities.forEach(city => { 
        dropdownList.push({ label: city, value: city }); 
    });

    return (
        <div>
            <div className="container">         

                <form onSubmit={handleSubmit} autoComplete="off"> 
                    <h1 className="display-4">Maistru</h1>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label"> Nume si prenume</label>
                            <input className="col-sm-9 form-control form--name " {...bindInput('name')} placeholder="Nume si prenume"/>  
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label"> Specializare </label> 
                            <input className="col-sm-9 form-control form-specialization" {...bindInput('specialization')} placeholder="Specializare"/>
                        </div>
                        <div className="form-group row">                            
                            <label className="col-sm-3 col-form-label"> Localitate </label>
                            <Select isClearable className="col-sm-9" options={dropdownList} onChange={locationChange} placeholder = "Localitate" noOptionsMessage={()=> "Cautare..."} />
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label"> Telefon </label>
                            <input className="col-sm-9 form-control form-location" {...bindInput('phoneNumber')} placeholder="07123456789" type="tel"/>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label"> Descriere</label> 
                            <input className="col-sm-9 form-control form-description" {...bindInput('description')} placeholder="Descriere"/>
                        </div>
                    <button className="btn btn-primary" onClick={handleAdd}>Adaugare</button>
                </form>

                <Modal {...modalProps} title="Adaugare maistru" >
                    <div className="form-group row">
                        <label className=""> {validationMessage} </label>
                    </div>
                </Modal>

            </div>
        </div>
    )
}

function dataIsValid(values) {
    if(values.name === undefined || values.name === null || values.name.length < 3) {
        return "Va rugam adaugati un nume si prenume valid."
    }
    if(values.specialization === undefined || values.specialization === null || values.specialization.length < 3) {
        return "Va rugam adaugati o specializare valida."
    }
    if(values.location === undefined || values.location === null || values.location === "") {
        return "Localitatea trebuie sa fie selectata."
    }
    if(values.phoneNumber === undefined || values.phoneNumber === null || !checkPhoneNumber(values.phoneNumber)) {
        return "Va rugam adaugati un numar de telefon valid."
    }
    if(values.description === undefined || values.description === null || values.description.length < 10) {
        return "Va rugam adaugati o descriere mai complexa."
    }

    return null;
}

function checkPhoneNumber(val) {
    var mob=/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    if (mob.test(val) === false) {
        return false;
    }
     if (val.length > 15) {
        return false;
    }

    return true;
}