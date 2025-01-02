import React from "react";
import PlusButton from "../../components/PlusButton";
import { images } from "../../data/images";

const HouseholdMenu = ({ enableHouseholdModal }) => {    
    return(
        <div className="household-menu">
            <img src={images.personIcon} alt="MEMBERS" className="household-menu-image" onClick={() => enableHouseholdModal("members")} />
            <img src={images.todoIcon} alt="LIST" className="household-menu-image" onClick={() => enableHouseholdModal("list")} />

            <PlusButton onClick={() => enableHouseholdModal("create-article")} />

            <img src={images.bellIcon} alt="NOTIFICATIONS" className="household-menu-image" onClick={() => enableHouseholdModal("notifications")} />
            <img src={images.settingsIcon} alt="SETTINGS" className="household-menu-image" onClick={() => enableHouseholdModal("settings")} />
        </div>
    );
}

export default HouseholdMenu;