import React from "react";
import { images } from "../../data/images";

const HouseholdMemberModal = ({ householdMemberModalHolderRef, householdMemberModalRef, disableHouseholdMemberModal }) => {
    const buttons = ["add nickname", "transfer household", "remove"];

    return(
        <div className="household-member-modal-holder" ref={householdMemberModalHolderRef} onClick={e => disableHouseholdMemberModal(e.target)}>
            <div className="household-member-modal" ref={householdMemberModalRef}>
                <div className="household-member-modal-background">
                    <img src={images.noAvatarIcon} alt="AVATAR" />
                </div>

                <strong>Name...</strong>
                
                <div className="household-member-modal-button-holder">
                    {buttons.map((button, index) => {
                        return <button key={index}>{button}</button>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default HouseholdMemberModal;