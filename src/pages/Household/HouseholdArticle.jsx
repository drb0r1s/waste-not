import React from "react";
import { images } from "../../data/images";

const HouseholdArticle = ({ article }) => {
    function formatDate(date) {
        const [year, month, day] = date.split("-");
        return `${day}.${month}.${year}.`;
    }
    
    return(
        <div className="household-article">
            <img src={images.imageIcon} alt="ARTICLE" />

            <div className="household-article-content">
                <strong>{article.name}</strong>
                {article.expirationDate ? <p>Expire on: {formatDate(article.expirationDate)}</p> : <></>}
            </div>
        </div>
    );
}

export default HouseholdArticle;