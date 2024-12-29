import React, { useEffect } from "react";
import { images } from "../data/images";

const HouseholdRating = ({ rating, setRating }) => {
    const stars = ["*", "*", "*", "*", "*"];
    
    useEffect(() => { if(setRating) setRating(Math.random() * (5 - 1 + 1) + 1) }, []);
    
    return(
        <div className="household-rating">
            {stars.map((star, index) => {                 
                return <img
                    key={index}
                    src={index + 1 <= rating ? images.fullStarIcon : images.starIcon}
                    alt="STAR"
                />;
            })}
        </div>
    );
}

export default HouseholdRating;