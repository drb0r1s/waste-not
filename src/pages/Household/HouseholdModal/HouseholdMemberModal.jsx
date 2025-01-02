import React, { useState, useEffect, useRef } from "react";
import ImageInput from "../../../components/ImageInput";
import { images } from "../../../data/images";
import { Storage } from "../../../functions/Storage";
import { cutText } from "../../../functions/cutText";

const HouseholdMemberModal = ({ activeMemberId, household, householdMemberModalHolderRef, householdMemberModalRef, disableHouseholdMemberModal }) => {
    const [activeMember, setActiveMember] = useState({});
    const [isNicknameInputActive, setIsNicknameInputActive] = useState(false);
    const [nicknameInput, setNicknameInput] = useState("");
    const [isImageInputActive, setIsImageInputActive] = useState(false);

    const imageInputRef = useRef(null);
    
    const buttons = ["add nickname", "transfer household", "remove"];

    useEffect(() => setActiveMember(...Storage.get("USERS", { key: "id", value: activeMemberId })), [localStorage.getItem("WASTENOT_USERS")]);

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
                type={isImageInputActive}
                imageInputRef={imageInputRef}
                disableImageInput={disableImageInput}
                isProfile={true}
            /> : <></>}
            
            <div className="household-member-modal" ref={householdMemberModalRef}>
                <div
                    className="household-member-modal-background"
                    style={activeMember.banner ? { backgroundImage: `url(${activeMember.banner})` } : {}}
                    onClick={activeMember.id === 1 ? e => enableImageInput(e, "banner") : () => {}}
                >
                    <img
                        src={activeMember.icon ? activeMember.icon : images.noAvatarIcon}
                        alt="AVATAR"
                        onClick={activeMember.id === 1 ? e => enableImageInput(e, "icon") : () => {}}
                    />
                </div>

                {isNicknameInputActive ? <input
                    type="text"
                    placeholder={activeMember.name}
                    value={nicknameInput}
                    onChange={e => setNicknameInput(e.target.value)}
                /> : <strong>{activeMember.nickname ? cutText(activeMember.nickname, 20) : activeMember.name}</strong>}
                
                <div className="household-member-modal-button-holder">
                    {buttons.map((button, index) => {
                        if((activeMember.id === 1 || household.owner !== 1) && button === "transfer household") return <React.Fragment key={index} />;
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