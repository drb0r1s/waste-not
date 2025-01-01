import React, { useState, useEffect } from "react";
import { images } from "../../data/images";
import { ExtendedDate } from "../../functions/ExtendedDate";
import { cutText } from "../../functions/cutText";

const HouseholdArticle = ({ article, onClick }) => {
    const [daysLeft, setDaysLeft] = useState("");
    
    useEffect(() => {
        if(!article.expirationDate) return;
        setDaysLeft(ExtendedDate.getExpirationContent(article.expirationDate));
    }, []);

    useEffect(() => setDaysLeft(ExtendedDate.getExpirationContent(article.expirationDate)), [article]);
    
    return(
        <div className="household-article" onClick={() => onClick(article)}>
            <img src={article.icon ? article.icon : images.imageIcon} alt="ARTICLE" />

            <div className="household-article-content">
                <strong>{cutText(article.name, 15)}</strong>
                {article.expirationDate ? <p style={ExtendedDate.getDayDifference(article.expirationDate) < 0 ? { color: "red" } : {}}>{daysLeft}</p> : <></>}
            </div>
        </div>
    );
}

export default HouseholdArticle;