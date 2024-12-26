import React from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../../data/images";
import { Storage } from "../../../functions/Storage";

const HouseholdSettingsModal = ({ household, disableHouseholdModal }) => {
    const buttons = ["household settings", "notification settings", "leave / delete household"]
    const navigate = useNavigate();

    function buttonClicked(key) {
        switch(key) {
            case "household": break;
            case "notification": break;
            case "leave":
                Storage.remove("HOUSEHOLDS", household.id, "ARTICLES");
                navigate("/");
            default:
        }
    }

    return(
        <>
            <header>
                <img
                    src={images.returnIcon}
                    alt="RETURN"
                    onClick={disableHouseholdModal}
                />

                <h2>settings</h2>
            </header>

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