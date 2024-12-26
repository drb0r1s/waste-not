import React from "react";
import { images } from "../../../../data/images";

const HouseholdMembersModalMember = ({ member, enableHouseholdMemberModal }) => {
    return(
        <div className="household-members-modal-member" onClick={enableHouseholdMemberModal}>
            <img src={images.noAvatarIcon} alt="AVATAR" />
            <p>You</p>
        </div>
    );
}

export default HouseholdMembersModalMember;