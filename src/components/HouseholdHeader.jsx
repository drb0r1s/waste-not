import React, { useState } from "react";
import { useBrowserReturn } from "../hooks/useBrowserReturn";
import { images } from "../data/images";
import { cutText } from "../functions/cutText";

const HouseholdHeader = ({
    title, returnFunction, searchData,
    searchInput, setSearchInput, className
}) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    
    return(
        <header className={`household-header ${className ? className : ""}`}>
            {returnFunction ? <img src={images.returnIcon} alt="RETURN" onClick={returnFunction} /> : <></>}
            
            {isSearchActive ? <input
                type="text"
                placeholder="Search..."
                maxLength="32"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
            /> : <h2>{cutText(title, 20)}</h2>}
            
            {searchData ? <img
                src={isSearchActive ? images.xIcon : images.searchIcon}
                alt="SEARCH"
                onClick={() => setIsSearchActive(prevIsSearchActive => !prevIsSearchActive)}
            /> : <></>}
        </header>
    );
}

export default HouseholdHeader;