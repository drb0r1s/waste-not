import React from "react";
import { images } from "../../../../data/images";

const HouseholdMembersModalMember = ({ member, enableHouseholdMemberModal }) => {
    return(
        <div className="household-members-modal-member" onClick={() => enableHouseholdMemberModal(member)}>
            <img src={images.noAvatarIcon} alt="AVATAR" />
            <p>{member.name}</p>
        </div>
    );
}

export default HouseholdMembersModalMember;