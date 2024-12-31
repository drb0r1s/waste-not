import React, { useState, useEffect } from "react";
import { images } from "../../data/images";
import { Storage } from "../../functions/Storage";

const HouseholdMemberModal = ({ activeMemberId, household, householdMemberModalHolderRef, householdMemberModalRef, disableHouseholdMemberModal }) => {
    const [activeMember, setActiveMember] = useState({});
    const [isNicknameInputActive, setIsNicknameInputActive] = useState(false);
    const [nicknameInput, setNicknameInput] = useState("");
    
    const buttons = ["add nickname", "transfer household", "remove"];

    useEffect(() => setActiveMember(...Storage.get("USERS", { key: "id", value: activeMemberId })), []);

    function buttonClicked(key) {
        switch(key) {
            case "add":
                setIsNicknameInputActive(true);
                break;
            case "save":
                Storage.update("USERS", activeMember.id, { nickname: nicknameInput });
                setActiveMember(prevActiveMember => { return {...prevActiveMember, nickname: nicknameInput} });
                
                setIsNicknameInputActive(false);
                setNicknameInput("");

                break;
            case "transfer":
                Storage.update("HOUSEHOLDS", household.id, { owner: activeMember.id });
                disableHouseholdMemberModal(null, true);
                
                break;
            case "remove":
                const newMembers = [];

                for(let i = 0; i < household.members.length; i++) {
                    if(household.members[i] !== activeMember.id) newMembers.push(household.members[i]);
                }

                Storage.update("HOUSEHOLDS", household.id, { members: newMembers });
                disableHouseholdMemberModal(null, true);

                break;
            default:
        }
    }

    return(
        <div
            className="household-member-modal-holder"
            ref={householdMemberModalHolderRef}
            onClick={e => disableHouseholdMemberModal(e.target)}
        >
            <div className="household-member-modal" ref={householdMemberModalRef}>
                <div className="household-member-modal-background">
                    <img src={images.noAvatarIcon} alt="AVATAR" />
                </div>

                {isNicknameInputActive ? <input
                    type="text"
                    placeholder={activeMember.name}
                    value={nicknameInput}
                    onChange={e => setNicknameInput(e.target.value)}
                /> : <strong>{activeMember.nickname ? activeMember.nickname : activeMember.name}</strong>}
                
                <div className="household-member-modal-button-holder">
                    {buttons.map((button, index) => {
                        if(household.owner !== 1 && button === "transfer household") return <React.Fragment key={index} />;
                        if((activeMember.id === 1 || household.owner !== 1) && button === "remove") return <React.Fragment key={index} />;
                        
                        if(button === "add nickname") return <button
                            key={index}
                            onClick={() => buttonClicked(isNicknameInputActive ? "save" : "add")}
                        >{isNicknameInputActive ? "save nickname" : "add nickname"}</button>
                        
                        return <button
                            key={index}
                            onClick={() => buttonClicked(button.split(" ")[0])}
                        >{button}</button>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default HouseholdMemberModal;