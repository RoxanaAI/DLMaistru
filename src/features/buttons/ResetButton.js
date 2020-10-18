import React from 'react'

export default function ResetButton() {

    // TODO resetare filter
    // TODO make the button active only when a filter was selected
    function resetFilters() {
        console.log("reset filters");
    }

    return (
        <>
            <button className="btn btn-primary" onClick={resetFilters}>Resetare filtre</button>
        </>
    );
}
