import React from "react";
import { images } from "../data/images";
import { cutText } from "../functions/cutText";

const HouseholdHeader = ({ title, returnFunction, searchFunction, className }) => {
    return(
        <header className={`household-header ${className ? className : ""}`}>
            {returnFunction ? <img src={images.returnIcon} alt="RETURN" onClick={returnFunction} /> : <></>}
            <h2>{cutText(title, 15)}</h2>
            {searchFunction ? <img src={images.searchIcon} alt="SEARCH" /> : <></>}
        </header>
    );
}

export default HouseholdHeader;