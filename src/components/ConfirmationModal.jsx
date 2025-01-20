import React from "react";

const ConfirmationModal = ({ confirmation, setConfirmation, confirmationModalRef, confirmationModalHolderRef, onAccept }) => {
    const buttons = ["cancel", "ok"];

    function buttonClicked(key) {
        switch(key) {
            case "ok":
                onAccept();
                disableModal();
                break;
            case "cancel":
                disableModal();
                break;
            default:
        }
    }

    function disableModal() {
        confirmationModalRef.current.id = "";
        confirmationModalHolderRef.current.id = "";

        setTimeout(() => setConfirmation(""), 300);
    }
    
    return(
        <div
            className="confirmation-modal-holder"
            ref={confirmationModalHolderRef}
            onClick={e => {
                if(!e.target.classList.contains("confirmation-modal-holder")) return;
                disableModal();
            }}
        >
            <div className="confirmation-modal" ref={confirmationModalRef}>
                <p dangerouslySetInnerHTML={{ __html: confirmation }}></p>

                <div className="confirmation-modal-button-holder">
                    {buttons.map((button, index) => {
                        return <button
                            key={index}
                            onClick={() => buttonClicked(button)}
                        >{button}</button>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;