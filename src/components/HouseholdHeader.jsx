import React from "react";
import { images } from "../data/images";

const HouseholdHeader = ({ title, returnFunction, searchFunction, className }) => {
    return(
        <header className={`household-header ${className ? className : ""}`}>
            {returnFunction ? <img src={images.returnIcon} alt="RETURN" onClick={returnFunction} /> : <></>}
            <h2>{title}</h2>
            {searchFunction ? <img src={images.searchIcon} alt="SEARCH" /> : <></>}
        </header>
    );
}

export default HouseholdHeader;