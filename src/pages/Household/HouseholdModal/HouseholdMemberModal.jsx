import React, { useState, useEffect, useRef } from "react";
import Avatar from "../../../components/Avatar";
import ImageInput from "../../../components/ImageInput";
import { Storage } from "../../../functions/Storage";
import { cutText } from "../../../functions/cutText";
import { ExtendedDate } from "../../../functions/ExtendedDate";

const HouseholdMemberModal = ({ activeMemberId, household, householdMemberModalHolderRef, householdMemberModalRef, disableHouseholdMemberModal }) => {
    const [activeMember, setActiveMember] = useState({});
    const [isNicknameInputActive, setIsNicknameInputActive] = useState(false);
    const [nicknameInput, setNicknameInput] = useState("");
    const [isImageInputActive, setIsImageInputActive] = useState(false);

    const imageInputRef = useRef(null);
    
    const profile = Storage.get("PROFILE");
    const buttons = ["add nickname", "transfer household", "remove"];

    useEffect(updateActiveMember, [localStorage.getItem("WASTENOT_USERS")]);

    function updateActiveMember() {
        setActiveMember(...Storage.get("USERS", { key: "id", value: activeMemberId }));
    }
    
    function buttonClicked(key) {
        switch(key) {
            case "add":
                setIsNicknameInputActive(true);
                break;
            case "save":
                Storage.updateProfile({ nickname: nicknameInput });

                if(typeof household.id === "string" && activeMember.id === profile.id) Storage.gunUpdate("USERS", profile.id, {...profile, nickname: nicknameInput, update: "nickname"});
                else Storage.update("USERS", activeMember.id, { nickname: nicknameInput });
            
                setActiveMember(prevActiveMember => { return {...prevActiveMember, nickname: nicknameInput} });
                
                setIsNicknameInputActive(false);
                setNicknameInput("");

                break;
            case "transfer":
                if(typeof household.id === "string") Storage.gunUpdate("HOUSEHOLDS", household.id, { owner: activeMember.id });
                else Storage.update("HOUSEHOLDS", household.id, { owner: activeMember.id });
                
                disableHouseholdMemberModal(null, true);
                
                break;
            case "remove":
                const newMembers = [];

                for(let i = 0; i < household.members.length; i++) {
                    if(household.members[i] !== activeMember.id) newMembers.push(household.members[i]);
                }

                const removeNotification = {
                    householdId: household.id,
                    type: "userRemoved",
                    userId: activeMember.id,
                    date: ExtendedDate.defaultFormat()
                };

                if(typeof household.id === "string") {
                    Storage.gunUpdate("HOUSEHOLDS", household.id, { members: newMembers });
                    Storage.gunAdd("NOTIFICATIONS", removeNotification);
                }


                else {
                    Storage.update("HOUSEHOLDS", household.id, { members: newMembers });
                    Storage.add("NOTIFICATIONS", removeNotification);
                }
                
                disableHouseholdMemberModal(null, true);

                break;
            default:
        }
    }

    function enableImageInput(e, key) {
        e.stopPropagation();

        setIsImageInputActive(key);
        setTimeout(() => { imageInputRef.current.id = "image-input-active" }, 1);
    }

    function disableImageInput() {
        imageInputRef.current.id = "";
        setTimeout(() => setIsImageInputActive(false), 300);
    }

    return(
        <div
            className="household-member-modal-holder"
            ref={householdMemberModalHolderRef}
            onClick={e => disableHouseholdMemberModal(e.target)}
        >
            {isImageInputActive ? <ImageInput
                household={household}
                type={isImageInputActive}
                imageInputRef={imageInputRef}
                disableImageInput={disableImageInput}
                isProfile={true}
            /> : <></>}
            
            <div className="household-member-modal" ref={householdMemberModalRef}>
                <div
                    className="household-member-modal-background"
                    style={activeMember.banner ? { backgroundImage: `url(${activeMember.banner})` } : {}}
                    onClick={profile.id === activeMember.id ? e => enableImageInput(e, "banner") : () => {}}
                >
                    <Avatar
                        member={activeMember}
                        onClick={profile.id === activeMember.id ? e => enableImageInput(e, "icon") : () => {}}
                    />
                </div>

                {isNicknameInputActive ? <input
                    type="text"
                    maxLength="32"
                    placeholder={activeMember.name}
                    value={nicknameInput}
                    onChange={e => setNicknameInput(e.target.value)}
                /> : <strong>{activeMember.nickname ? cutText(activeMember.nickname, 20) : activeMember.name}</strong>}
                
                <div className="household-member-modal-button-holder">
                    {buttons.map((button, index) => {
                        if((profile.id === activeMember.id || profile.id !== household.owner) && button === "transfer household") return <React.Fragment key={index} />;
                        if((profile.id === activeMember.id || profile.id !== household.owner) && button === "remove") return <React.Fragment key={index} />;
                        
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