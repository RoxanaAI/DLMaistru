import React from 'react'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function WorkersFilters({ workers }) {

    const dropDownData = getDropDownData(workers);
    let uniqueLocalization = [...new Set(dropDownData[0])];
    let uniqueSpecialization = [...new Set(dropDownData[1])];

    return (
        <>
            <div className="">
                <label className=""> Filtru localitate </label>
                <Dropdown options={uniqueLocalization} placeholder="Filtru localitate"/>
            </div>

            <div className="">
                <label className=""> Filtru specializare </label>
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