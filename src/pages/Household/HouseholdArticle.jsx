import React from "react";
import { images } from "../../data/images";

const HouseholdArticle = ({ article }) => {
    return(
        <div className="household-article">
            <img src={images.imageIcon} alt="ARTICLE" />

            <div className="household-article-content">
                <strong>{article.name}</strong>
                <p>Expire on: {article.expirationDate}</p>
            </div>
        </div>
    );
}

export default HouseholdArticle;