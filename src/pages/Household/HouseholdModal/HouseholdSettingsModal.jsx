import React, { useState, useEffect, useRef } from "react";
import HouseholdHeader from "../../../components/HouseholdHeader";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { Storage } from "../../../functions/Storage";

const HouseholdSettingsModal = ({ household, disableHouseholdModal }) => {
    const [confirmation, setConfirmation] = useState("");

    const confirmationModalRef = useRef(null);
    const confirmationModalHolderRef = useRef(null);
    
    const buttons = ["household settings", "notification settings", "leave / delete household"]
    const navigate = useNavigate();

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
                setConfirmation(`Are you sure that you want to ${household.members.length > 1 ? "left" : "delete"} <strong>${household.name}</strong>?`);
                break;
            default:
        }
    }

    function removeHousehold() {
        Storage.remove("HOUSEHOLDS", household.id, ["ARTICLES", "LIST_ARTICLES", "NOTIFICATIONS"]);
        navigate("/", { state: { info: household.members.length > 1 ? `You left <strong>${household.name}</strong>.` : `<strong>${household.name}</strong> has been deleted.` } });
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