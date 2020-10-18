import React, { useState } from 'react'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export const DropdownFilter = ({ dropdownList, dropDownTitle }) => {
  const [currentSelection, setCurrentSelection] = useState("");
  
  const changeSelection = (newSelection) => {
    setCurrentSelection(newSelection)
  }

  dropdownList.sort(function(first, second){       
    if(null == first || null == second) {
        return -1;
    }
    
    return first.localeCompare(second)
  });

  return (
                <>
                    <div className="">
                        <label className=""> {dropDownTitle} </label>
                        <Dropdown options = {dropdownList}
                                  onChange = {(event) => changeSelection(event.value)}
                                  value = {currentSelection}
                                  placeholder = "Selectare" />
                    </div>
                </>
            );
}

export default DropdownFilter;