import React, { useState } from 'react'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function WorkersFilters({ workers }) {
    // const [location, setLocation] = useState("");
    // const [specialization, setSpecialization] = useState("");


    const dropDownData = getDropDownData(workers);
    let uniqueLocalization = [...new Set(dropDownData[0])];
    let uniqueSpecialization = [...new Set(dropDownData[1])];

    // async function handleSpecialization(e) {
    //     console.log(e.target.value);
    //     // const specialization = "test"
    //     setSpecialization([specialization]);
    // }

    // console.log("spec: " + specialization);
    
    return (
        <>
            <div className="">
                <label className=""> Filtru localitate </label>
                <Dropdown options={uniqueLocalization} placeholder="Filtru localitate"/>
            </div>

            <div className="">
                <label className=""> Filtru specializare </label>
                {/* <Dropdown options={uniqueSpecialization} onChange={handleSpecialization} placeholder="Filtru specializare" /> */}
                <Dropdown options={uniqueSpecialization} placeholder="Filtru specializare" />
            </div>
        </>
    );
}

function getDropDownData(workers) {
    const locations = new Set();
    const specializations = new Set();
    workers.forEach( item => {
        if(item.location){
            locations.add(item.location);
        }
        if(item.specialization){
            specializations.add(item.specialization);
        }
    });

    return [locations, specializations];
}