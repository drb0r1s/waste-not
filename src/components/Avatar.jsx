import React from "react";
import { getUserIcon } from "../functions/getUserIcon";

const Avatar = ({ member, onClick }) => {
    return(
        <img
            src={getUserIcon(member)}
            alt="AVATAR"
            className="avatar"
            onClick={onClick}
        />
    );
}

export default Avatar;