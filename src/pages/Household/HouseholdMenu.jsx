import React from "react";
import PlusButton from "../../components/PlusButton";
import { images } from "../../data/images";

const HouseholdMenu = () => {
    return(
        <div className="household-menu">
            <img src={images.personIcon} alt="INVITE" />
            <img src={images.todoIcon} alt="LIST" />

            <PlusButton onClick={() => {}} />

            <img src={images.bellIcon} alt="NOTIFICATIONS" />
            <img src={images.settingsIcon} alt="SETTINGS" />
        </div>
    );
}

export default HouseholdMenu;