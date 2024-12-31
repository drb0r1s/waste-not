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
        
            <button onClick={() => navigate("/invite", { state: { household: household, returnHome: false } })}>invite people</button>

            <div className="member-holder">
                {household.members.map((member, index) => {
                    return <HouseholdMembersModalMember
                        key={index}
                        memberId={member}
                        household={household}
                        enableHouseholdMemberModal={enableHouseholdMemberModal}
                    />;
                })}
            </div>
        </>
    );
}

export default HouseholdMembersModal;