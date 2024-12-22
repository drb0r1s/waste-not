import React from "react";

const HouseholdModal = ({ type, householdModalRef }) => {
    return(
        <div className="household-modal" ref={householdModalRef}>
            {type === "create" ? <div className="household-modal-create">

            </div> : type === "join" ? <div className="household-modal-join">

            </div> : <div className="household-modal-join">
            
            </div>}
        </div>
    );
}

export default HouseholdModal;