import React, { useState, useEffect } from "react";

const HouseholdTagHolder = ({ tags, setFilter }) => {
    const [activeTag, setActiveTag] = useState("");

    useEffect(() => setFilter(activeTag), [activeTag]);
    
    function updateActiveTag(tag) {
        if(activeTag === tag) setActiveTag("");
        else setActiveTag(tag);
    }
    
    return(
        <div className="household-tag-holder">
            {tags.map((tag, index) => {
                return <p
                    key={index}
                    className="household-tag"
                    id={activeTag === tag ? "household-tag-active" : ""}
                    onClick={() => updateActiveTag(tag)}
                >{tag}</p>
            })}
        </div>
    );
}

export default HouseholdTagHolder;