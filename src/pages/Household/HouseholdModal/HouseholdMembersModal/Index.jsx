import React from "react";
import { useNavigate } from "react-router-dom";
import HouseholdMembersModalMember from "./HoseholdMembersModalMember";
import { images } from "../../../../data/images";

const HouseholdMembersModal = ({ household, disableHouseholdModal, enableHouseholdMemberModal }) => {
    const navigate = useNavigate();
    
    return(
        <>
            <img
                src={images.returnIcon}
                alt="REUTRN"
                className="household-members-modal-return"
                onClick={disableHouseholdModal}
            />
        
            <button onClick={() => navigate("/invite", { state: household })}>invite people</button>

            <div className="member-holder">
                <HouseholdMembersModalMember enableHouseholdMemberModal={enableHouseholdMemberModal} />
            </div>
        </>
    );
}

export default HouseholdMembersModal;