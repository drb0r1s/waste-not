import React from "react";
import { images } from "../../../../data/images";
import { ExtendedDate } from "../../../../functions/ExtendedDate";
import { cutText } from "../../../../functions/cutText";

const HouseholdListModalListArticle = ({ listArticle, onClick }) => {
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
                <p>{listArticle.addedBy.name}</p>
            </div>
        </div>
    );
}

export default HouseholdListModalListArticle;