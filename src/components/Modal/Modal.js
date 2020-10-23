import React, { useState, useEffect } from 'react'

 export function Modal({title, children, onSave, show, onDismiss}) {
    const [open, setOpen] = useState(false);
    const [showBackdrop, setShowBackdrop] = useState(false);

    useEffect(() => {
        if(show) {
            setShowBackdrop(true);
            setTimeout(() => setOpen(true), 200);
        }
    }, [show]);

    function hide() {
        setOpen(false);
        setTimeout(() => setShowBackdrop(false), 200);
    }

    function handleDismiss() {
        onDismiss();
        hide();
    }

    return (
        <>
        <div className={`modal fade${open ? ' show' : ''}`} style={ {display: showBackdrop ? 'block' : 'none'} } id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body"> 
                        <button type="button" className="close" onClick={handleDismiss} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {children}
                    </div>
                </div>
            </div>
        </div>
        <div className={`modal-backdrop fade${open ? ' show' : ''}`} style={ {display: showBackdrop ? 'block' : 'none' }}></div>
        </>
    );
}

export default Modal;