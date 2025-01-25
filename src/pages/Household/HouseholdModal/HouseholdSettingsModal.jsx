import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HouseholdHeader from "../../../components/HouseholdHeader";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { Storage } from "../../../functions/Storage";
import { ExtendedDate } from "../../../functions/ExtendedDate";
import { gun } from "../../../data/gunInitialization";

const HouseholdSettingsModal = ({ household, disableHouseholdModal }) => {
    const [confirmation, setConfirmation] = useState("");

    const confirmationModalRef = useRef(null);
    const confirmationModalHolderRef = useRef(null);
    
    const buttons = ["household settings", "notification settings", "leave / delete household"]
    const navigate = useNavigate();

    const profile = Storage.get("PROFILE");

    useEffect(() => {
        if(!confirmation) return;

        setTimeout(() => {
            confirmationModalRef.current.id = "confirmation-modal-active";
            confirmationModalHolderRef.current.id = "confirmation-modal-holder-active";
        }, 1);
    }, [confirmation]);

    function buttonClicked(key) {
        switch(key) {
            case "household": break;
            case "notification": break;
            case "leave":
                setConfirmation(`Are you sure that you want to ${household.owner === profile.id ? "delete" : "left"} <strong>${household.name}</strong>?`);
                break;
            default:
        }
    }

    function removeHousehold() {
        if(household.name[0].toLowerCase() === "b" && gun) {
            if(household.owner === profile.id) Storage.gunRemove("HOUSEHOLDS", household.id);
            
            else {
                const newMembers = [];

                for(let i = 0; i < household.members.length; i++) {
                    if(household.members[i] !== profile.id) newMembers.push(household.members[i]);
                }

                Storage.gunUpdate("HOUSEHOLDS", household.id, { members: newMembers });
                
                Storage.gunAdd("NOTIFICATIONS", {
                    householdId: household.id,
                    type: "userLeft",
                    userId: profile.id,
                    date: ExtendedDate.defaultFormat()
                });
            }
        }
        
        Storage.remove("HOUSEHOLDS", household.id, ["ARTICLES", "LIST_ARTICLES", "NOTIFICATIONS"]);
        navigate("/", { state: { info: household.owner === profile.id ? `<strong>${household.name}</strong> has been deleted.` : `You left <strong>${household.name}</strong>.` } });
    }

    return(
        <>
            {confirmation ? <ConfirmationModal
                confirmation={confirmation}
                setConfirmation={setConfirmation}
                confirmationModalRef={confirmationModalRef}
                confirmationModalHolderRef={confirmationModalHolderRef}
                onAccept={removeHousehold}
            /> : <></>}
            
            <HouseholdHeader title="settings" returnFunction={disableHouseholdModal} />

            <div className="household-settings-modal-button-holder">
                {buttons.map((button, index) => {
                    return <button
                        key={index}
                        onClick={() => buttonClicked(button.split(" ")[0])}
                    >{button}</button>;
                })}
            </div>
        </>
    );
}

export default HouseholdSettingsModal;