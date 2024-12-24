import React from "react";
import { useLocation } from "react-router-dom";
import HouseholdHeader from "./HouseholdHeader";
import HouseholdMenu from "./HouseholdMenu";

const Household = () => {
    const location = useLocation();
    const household = location.state;

    const tags = ["fridge", "freezer", "pantry"];
    
    return(
        <div className="household">
            <HouseholdHeader household={household} />

            <div className="household-tag-holder">
                {tags.map((tag, index) => {
                    return <p key={index} className="household-tag">{tag}</p>
                })}
            </div>

            <div className="article-holder">
                <span>There are no articles.</span>
            </div>

            <HouseholdMenu />
        </div>
    );
}

export default Household;