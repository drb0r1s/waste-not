import React from "react";
import { images } from "../../../../data/images";

const HouseholdMembersModalMember = ({ member }) => {
    return(
        <div className="household-members-modal-member">
            <img src={images.noAvatarIcon} alt="AVATAR" />
            <p>You</p>
        </div>
    );
}

export default HouseholdMembersModalMember;