import React from "react";
import { images } from "../../data/images";
import { cutText } from "../../functions/cutText";

const HouseholdButton = ({ household, onClick }) => {
    return(
        <div className="household-button" onClick={onClick}>
            <p>{cutText(household.name, 23)}</p>
            
            <div className="household-person-holder">
                <img src={images.personIcon} alt="PERSON" />
                <p>{household.members.length}</p>
            </div>
        </div>
    );
}

export default HouseholdButton;