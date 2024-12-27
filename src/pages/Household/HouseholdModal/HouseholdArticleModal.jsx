import React, { useState, useEffect } from "react";
import { images } from "../../../data/images";
import { ExtendedDate } from "../../../functions/ExtendedDate";
import { Storage } from "../../../functions/Storage";

const HouseholdArticleModal = ({ activeArticle, disableHouseholdArticleModal }) => {
    const [article, setArticle] = useState(activeArticle);
    const [daysLeft, setDaysLeft] = useState("");
    const [lastUsed, setLastUsed] = useState("Hasn't been used");
    const [isEditActive, setIsEditActive] = useState(false);
    const [editInputs, setEditInputs] = useState({ name: "", expirationDate: "", amount: "", lastUsed: "" });
    
    const buttons = ["use", "edit", "recipe recommendations", "add to shopping list", "remove"];

    useEffect(() => {
        if(article.expirationDate) setDaysLeft(ExtendedDate.getExpirationContent(article.expirationDate));
        if(article.lastUsed) setLastUsed(ExtendedDate.getLastUsedContent(article.lastUsed));
    }, []);

    function buttonClicked(key) {
        switch(key) {
            case "use":
                if(article.amount === 1) {
                    Storage.remove("ARTICLES", article.id);
                    disableHouseholdArticleModal();
                }
            
                else {
                    Storage.update("ARTICLES", article.id, { amount: article.amount - 1, lastUsed: ExtendedDate.defaultFormat() });            
                    
                    setArticle(prevArticle => { return {...prevArticle, amount: prevArticle.amount - 1, lastUsed: ExtendedDate.defaultFormat() } });
                    setLastUsed(ExtendedDate.getLastUsedContent(ExtendedDate.defaultFormat()));
                }

                break;
            case "edit":
                setIsEditActive(true);    

                break;
            case "recipe": break;
            case "add": break;
            case "remove": break;
            case "done":
                setIsEditActive(false);

                const updatedProps = {

                };

                Storage.update("ARTICLES", article.id, editInputs);


                setEditInputs({ name: "", expirationDate: "", amount: "", lastUsed: "" });

                break;
            default:
        }
    }

    return(
        <>
            <img
                src={images.returnIcon}
                alt="RETURN"
                className="household-article-modal-return"
                onClick={disableHouseholdArticleModal}
            />

            <div className="household-article-modal-title-holder">
                <img src={images.imageIcon} alt="IMAGE" />
                {isEditActive ? <input
                    type="text"
                    placeholder={article.name}
                    value={editInputs.name}
                    onChange={e => setEditInputs(prevEditInputs => { return {...prevEditInputs, name: e.target.value} })}
                /> : <h2>{article.name}</h2>}
            </div>

            <div className="household-article-modal-info-holder">
                {article.expirationDate ? <div className="household-article-modal-info">
                    <div className="household-article-modal-info-content">
                        <p>expiration date:</p>

                        {isEditActive ? <input
                            type="date"
                            value={editInputs.expirationDate}
                            onChange={e => setEditInputs(prevEditInputs => { return {...prevEditInputs, expirationDate: e.target.value} })}
                        /> : <span>{ExtendedDate.format(article.expirationDate)}</span>}
                    </div>

                    <strong style={ExtendedDate.getDayDifference(article.expirationDate) < 0 ? { color: "red" } : {}}>{daysLeft}</strong>
                </div> : <></>}

                <div className="household-article-modal-info">
                    <div className="household-article-modal-info-content">
                        <p>amount:</p>
                        
                        {isEditActive ? <input
                            type="number"
                            placeholder={article.amount}
                            value={editInputs.amount}
                            onChange={e => setEditInputs(prevEditInputs => { return {...prevEditInputs, amount: e.target.value} })}
                        /> : <span>{article.amount}</span>}
                    </div>
                </div>

                <div className="household-article-modal-info">
                    <div className="household-article-modal-info-content">
                        <p>last used:</p>
                        
                        {isEditActive ? <input
                            type="date"
                            value={editInputs.lastUsed}
                            onChange={e => setEditInputs(prevEditInputs => { return {...prevEditInputs, lastUsed: e.target.value} })}
                        /> : <span>{lastUsed}</span>}
                    </div>
                </div>
            </div>

            <div className="household-article-modal-button-holder">
                {isEditActive ? <button>done</button> : buttons.map((button, index) => {
                    return <button
                        key={index}
                        onClick={() => buttonClicked(button.split(" ")[0])}
                    >{button}</button>;
                })}
            </div>
        </>
    );
}

export default HouseholdArticleModal;