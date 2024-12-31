import React, { useState, useEffect } from "react";
import { images } from "../../../../data/images";
import { Storage } from "../../../../functions/Storage";

const HouseholdMembersModalMember = ({ memberId, household, enableHouseholdMemberModal }) => {
    const [member, setMember] = useState({});

    useEffect(() => setMember(...Storage.get("USERS", { key: "id", value: memberId })), [localStorage.getItem("USERS"), household]);
    
    return(
        <div className="household-members-modal-member" onClick={() => enableHouseholdMemberModal(memberId)}>
            <img src={images.noAvatarIcon} alt="AVATAR" />
            <p>{member.nickname ? member.nickname : member.name}</p>

            {member.id === household.owner ? <img
                src={images.starIcon}
                alt="STAR"
                className="household-members-modal-member-star"
            /> : <></>}
        </div>
    );
}

export default HouseholdMembersModalMember;