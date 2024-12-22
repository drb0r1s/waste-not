import React from "react";
import { images } from "../../data/images";

const Household = ({ index }) => {
    return(
        <div className="household">
            <p>household {index + 1}</p>
            
            <div className="household-person-holder">
                <img src={images.personIcon} alt="PERSON" />
                <p>3</p>
            </div>
        </div>
    );
}

export default Household;