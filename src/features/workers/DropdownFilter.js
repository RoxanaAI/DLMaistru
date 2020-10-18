import React, { useState } from 'react'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export const DropdownFilter = ({ dropdownList, dropDownTitle }) => {
  const [currentSelection, setCurrentSelection] = useState(dropdownList)
  
  const changeSelection = (newSelection) => {
    setCurrentSelection(newSelection)
  }

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