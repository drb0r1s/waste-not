import React from "react";
import HouseholdMembersModalMember from "./HoseholdMembersModalMember";
import { images } from "../../../../data/images";

const HouseholdMembersModal = ({ household, disableHouseholdModal }) => {
    return(
        <>
            <img
                src={images.returnIcon}
                alt="REUTRN"
                className="household-members-modal-return"
                onClick={disableHouseholdModal}
            />
        
            <button>invite people</button>

            <div className="member-holder">
                <HouseholdMembersModalMember />
            </div>
        </>
    );
}

export default HouseholdMembersModal;