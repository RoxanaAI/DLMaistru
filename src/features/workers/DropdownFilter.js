import React, { Component } from 'react'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class DropdownFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectValue: ""
        };
    
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
      }

      handleDropdownChange(e) {
        this.setState({ selectValue: e.target.value });
      }

      render() {
        return (
            <>
                <div className="">
                    <label className=""> Filtru specializare </label>
                    <Dropdown id="dropdown" options={this.list} onChange={this.handleDropdownChange} placeholder={this.placeholder} />
                </div>
                <div>Selected value is : {this.state.selectValue}</div>
            </>
        );
      }

    // state = {
    //     selection: ""
    // };

    // handleChange = () => {
    //     this.setState({
    //         selection: this.state.selection
    //     });
    // }

    // list = ["a", "b", "c", "d"];
    // placeholder="Selecteaza";

    // render() {
    //     return (
    //         <>
    //             <div className="">
    //                 <label className=""> Filtru specializare </label>
    //                 <Dropdown options={this.list} onChange={this.handleChange} placeholder={this.placeholder} />
    //             </div>
    //         </>
    //     );
    // }
}

export default DropdownFilter;