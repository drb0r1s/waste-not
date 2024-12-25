import React from "react";
import { images } from "../../data/images";

const HouseholdButton = ({ index, household, onClick }) => {
    return(
        <div className="household-button" onClick={onClick}>
            <p>{household.name ? household.name : `household ${index + 1}`}</p>
            
            <div className="household-person-holder">
                <img src={images.personIcon} alt="PERSON" />
                <p>{household.members}</p>
            </div>
        </div>
    );
}

export default HouseholdButton;