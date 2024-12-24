import React from "react";
import { images } from "../data/images";

const PlusButton = ({ onClick }) => {
    return(
        <div className="plus-button" onClick={onClick}>
            <img src={images.plusIcon} alt="+" />
        </div>
    );
}

export default PlusButton;