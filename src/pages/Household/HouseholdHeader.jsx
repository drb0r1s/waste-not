import React from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../data/images";

const HouseholdHeader = ({ household }) => {
    const navigate = useNavigate();
    
    return(
        <header>
            <img src={images.returnIcon} alt="RETURN" onClick={() => navigate("/")} />
            <h2>{household.name}</h2>
            <img src={images.searchIcon} alt="SEARCH" />
        </header>
    );
}

export default HouseholdHeader;