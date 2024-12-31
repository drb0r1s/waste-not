import React, { useState, useEffect, useRef } from "react";
import HouseholdArticleModalUseModal from "./HouseholdArticleModalUseModal";
import HouseholdArticleModalRecipesModal from "./householdArticleModalRecipesModal/Index";
import { images } from "../../../../data/images";
import { ExtendedDate } from "../../../../functions/ExtendedDate";
import { Storage } from "../../../../functions/Storage";
import { cutText } from "../../../../functions/cutText";

const HouseholdArticleModal = ({ activeArticle, disableHouseholdArticleModal }) => {
    const [article, setArticle] = useState(activeArticle);
    const [daysLeft, setDaysLeft] = useState("");
    const [lastUsed, setLastUsed] = useState("Hasn't been used");
    const [isEditActive, setIsEditActive] = useState(false);
    const [editInputs, setEditInputs] = useState({ name: "", expirationDate: article.expirationDate, amount: "", lastUsed: article.lastUsed });
    const [isAddedToList, setIsAddedToList] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);

    const useModalRef = useRef(null);
    const recipesModalRef = useRef(null);

    const buttons = ["use", "edit", "recipe recommendations", "add to shopping list", "remove"];

    useEffect(() => {
        if(article.expirationDate) setDaysLeft(ExtendedDate.getExpirationContent(article.expirationDate));
        if(article.lastUsed) setLastUsed(ExtendedDate.getLastUsedContent(article.lastUsed));
    }, []);

    function enableModal(type) {
        setIsModalActive(type);

        setTimeout(() => {
            if(type === "use") useModalRef.current.id = "household-article-modal-modal-active";
            else if(type === "recipe") recipesModalRef.current.id = "household-article-modal-modal-active";
        }, 1);
    }

    function disableModal() {
        if(isModalActive === "use") useModalRef.current.id = "";
        else if(isModalActive === "recipe") recipesModalRef.current.id = "";
    
        setTimeout(() => setIsModalActive(false), 300);
    }

    function buttonClicked(key) {
        switch(key) {
            case "use":
                enableModal("use");
                break;
            case "edit":
                setIsEditActive(true);
                break;
            case "recipe":
                enableModal("recipe");
                break;
            case "add":
                if(isAddedToList) return;
                setIsAddedToList(true);
            
                Storage.add("LIST_ARTICLES", {
                    householdId: article.householdId,
                    name: article.name,
                    icon: article.icon,
                    date: ExtendedDate.defaultFormat(),
                    isMarked: false,
                    addedBy: Storage.get("PROFILE").id
                });

                break;
            case "remove":
                Storage.remove("ARTICLES", article.id);
                disableHouseholdArticleModal();
                
                break;
            case "done":
                setIsEditActive(false);

                const updatedProps = {
                    name: editInputs.name ? editInputs.name : article.name,
                    expirationDate: editInputs.expirationDate ? editInputs.expirationDate : article.expirationDate,
                    amount: editInputs.amount ? editInputs.amount : article.amount,
                    lastUsed: editInputs.lastUsed ? editInputs.lastUsed : article.lastUsed
                };

                Storage.update("ARTICLES", article.id, updatedProps);

                setArticle(prevArticle => { return {...prevArticle, ...updatedProps} });
                setDaysLeft(ExtendedDate.getExpirationContent(updatedProps.expirationDate));
                setLastUsed(ExtendedDate.getLastUsedContent(updatedProps.lastUsed));
                setEditInputs({ name: "", expirationDate: updatedProps.expirationDate, amount: "", lastUsed: updatedProps.lastUsed });

                break;
            default:
        }
    }

    function updateDaysLeft(date) {
        setDaysLeft(ExtendedDate.getExpirationContent(date));
        setEditInputs(prevEditInputs => { return {...prevEditInputs, expirationDate: date} });
    }

    function updateLastUsed(date) {
        setLastUsed(ExtendedDate.getLastUsedContent(date));
        setEditInputs(prevEditInputs => { return {...prevEditInputs, lastUsed: date} });
    }

    function substractAmount(value) {
        const newAmount = article.amount - value;
        
        if(!newAmount) {
            Storage.remove("ARTICLES", article.id);
            disableHouseholdArticleModal();
        }
            
        else {
            Storage.update("ARTICLES", article.id, { amount: newAmount, lastUsed: ExtendedDate.defaultFormat() });            
                    
            setArticle(prevArticle => { return {...prevArticle, amount: newAmount, lastUsed: ExtendedDate.defaultFormat() } });
            setLastUsed(ExtendedDate.getLastUsedContent(ExtendedDate.defaultFormat()));
        }
    }

    return(
        <>
            {isModalActive === "use" ? <HouseholdArticleModalUseModal activeArticle={article} useModalRef={useModalRef} disableModal={disableModal} substractAmount={substractAmount} />
            : isModalActive === "recipe" ? <HouseholdArticleModalRecipesModal recipesModalRef={recipesModalRef} disableModal={disableModal} /> : <></>}
            
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
                /> : <h2>{cutText(article.name, 20)}</h2>}
            </div>

            <div className="household-article-modal-info-holder">
                {article.expirationDate ? <div className="household-article-modal-info">
                    <div className="household-article-modal-info-content">
                        <p>expiration date:</p>

                        {isEditActive ? <input
                            type="date"
                            value={editInputs.expirationDate}
                            onChange={e => updateDaysLeft(e.target.value)}
                        /> : <span>{ExtendedDate.format(article.expirationDate)}</span>}
                    </div>

                    <strong style={ExtendedDate.getDayDifference(editInputs.expirationDate) < 0 ? { color: "red" } : {}}>{daysLeft}</strong>
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
                            value={editInputs.lastUsed ? editInputs.lastUsed : ""}
                            onChange={e => updateLastUsed(e.target.value)}
                        /> : <span>{lastUsed}</span>}
                    </div>
                </div>
            </div>

            <div className="household-article-modal-button-holder">
                {isEditActive ? <button onClick={() => buttonClicked("done")}>done</button> : buttons.map((button, index) => {
                    if(button.split(" ")[0] === "add") return <button
                        key={index}
                        className={isAddedToList ? "household-article-modal-button-disabled" : ""}
                        onClick={() => buttonClicked(button.split(" ")[0])}
                    >{isAddedToList ? "added to shopping list" : button}</button>
                    
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