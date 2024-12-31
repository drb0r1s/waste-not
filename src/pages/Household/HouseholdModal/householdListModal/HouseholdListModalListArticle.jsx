import React, { useState, useEffect } from "react";
import { images } from "../../../../data/images";
import { ExtendedDate } from "../../../../functions/ExtendedDate";
import { cutText } from "../../../../functions/cutText";
import { Storage } from "../../../../functions/Storage";

const HouseholdListModalListArticle = ({ listArticle, onClick }) => {
    const [member, setMember] = useState({});

    useEffect(() => setMember(...Storage.get("USERS", { key: "id", value: listArticle.addedBy })), [localStorage.getItem("USERS")]);
    
    return(
        <div
            className={`household-list-modal-list-article ${listArticle.isMarked ? "household-list-modal-list-article-marked" : ""}`}
            onClick={() => onClick(listArticle)}
        >
            <img src={images.imageIcon} alt="IMAGE" className="household-list-modal-list-article-image" />

            <div className="household-list-modal-list-article-content-holder">
                <strong>{cutText(listArticle.name, 8)}</strong>
                <p>added: <span>{ExtendedDate.format(listArticle.date)}</span></p>
            </div>

            <div className="household-list-modal-list-article-user-holder">
                <img src={images.noAvatarIcon} alt="AVATAR" />
                <p>{member.nickname ? member.nickname : member.name}</p>
            </div>
        </div>
    );
}

export default HouseholdListModalListArticle;