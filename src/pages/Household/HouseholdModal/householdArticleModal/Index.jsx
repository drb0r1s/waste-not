import React, { useState, useEffect, useRef } from "react";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import HouseholdArticleModalUseModal from "./HouseholdArticleModalUseModal";
import HouseholdArticleModalRecipesModal from "./householdArticleModalRecipesModal/Index";
import { images } from "../../../../data/images";
import { ExtendedDate } from "../../../../functions/ExtendedDate";
import { Storage } from "../../../../functions/Storage";
import { cutText } from "../../../../functions/cutText";
import { getArticleIcon } from "../../../../functions/getArticleIcon";

const HouseholdArticleModal = ({ household, activeArticle, disableHouseholdArticleModal, setInfo }) => {
    const [article, setArticle] = useState(activeArticle);
    const [daysLeft, setDaysLeft] = useState("");
    const [lastUsed, setLastUsed] = useState("Hasn't been used");
    const [isEditActive, setIsEditActive] = useState(false);
    const [editInputs, setEditInputs] = useState({ name: "", expirationDate: article.expirationDate, amount: "", lastUsed: article.lastUsed });
    const [isAddedToList, setIsAddedToList] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [confirmation, setConfirmation] = useState("");

    const useModalRef = useRef(null);
    const recipesModalRef = useRef(null);
    const amountInputRef = useRef(null);
    const lastUsedInputRef = useRef(null);
    const confirmationModalRef = useRef(null);
    const confirmationModalHolderRef = useRef(null);

    const buttons = ["use", "edit", "recipe recommendations", "add to shopping list", "remove"];
    const profile = Storage.get("PROFILE");

    useEffect(() => {
        if(article.expirationDate) setDaysLeft(ExtendedDate.getExpirationContent(article.expirationDate));
        if(article.lastUsed) setLastUsed(ExtendedDate.getLastUsedContent(article.lastUsed));
    }, []);

    useEffect(() => {
            if(!confirmation) return;
    
            setTimeout(() => {
                confirmationModalRef.current.id = "confirmation-modal-active";
                confirmationModalHolderRef.current.id = "confirmation-modal-holder-active";
            }, 1);
        }, [confirmation]);

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

                const listArticleObject = {
                    householdId: article.householdId,
                    name: article.name,
                    icon: article.icon,
                    date: ExtendedDate.defaultFormat(),
                    isMarked: false,
                    addedBy: profile.id
                };

                const listArticleAddedNotification = {
                    householdId: household.id,
                    type: "listArticleAdded",
                    name: article.name,
                    icon: article.icon,
                    tag: article.tag,
                    date: ExtendedDate.defaultFormat(),
                    addedBy: profile.id
                };
            
                if(typeof household.id === "string") {
                    Storage.gunAdd("LIST_ARTICLES", listArticleObject);
                    Storage.gunAdd("NOTIFICATIONS", listArticleAddedNotification);
                }

                else {
                    Storage.add("LIST_ARTICLES", listArticleObject);
                    Storage.add("NOTIFICATIONS", listArticleAddedNotification);
                }

                break;
            case "remove":
                setConfirmation(`Are you sure that you want to remove <strong>${activeArticle.name}</strong>?`);
                break;
            case "done":
                if(editInputs.amount && editInputs.amount < 1) return amountInputRef.current.style.border = "1px solid red";
                if(editInputs.lastUsed && ExtendedDate.getDayDifference(editInputs.lastUsed) > 0) return lastUsedInputRef.current.style.border = "1px solid red";
                setIsEditActive(false);

                const updatedProps = {
                    name: editInputs.name ? editInputs.name : article.name,
                    expirationDate: editInputs.expirationDate ? editInputs.expirationDate : article.expirationDate,
                    amount: editInputs.amount ? editInputs.amount : article.amount,
                    lastUsed: editInputs.lastUsed ? editInputs.lastUsed : article.lastUsed,
                    icon: editInputs.name ? getArticleIcon(editInputs.name) : article.icon
                };

                const articleEditedNotification = {
                    householdId: household.id,
                    type: "articleEdited",
                    name: article.name,
                    icon: article.icon,
                    date: ExtendedDate.defaultFormat(),
                    editedBy: profile.id
                };

                if(typeof household.id === "string") {
                    Storage.gunUpdate("ARTICLES", article.id, updatedProps);
                    Storage.gunAdd("NOTIFICATIONS", articleEditedNotification);
                }

                else {
                    Storage.update("ARTICLES", article.id, updatedProps);
                    Storage.add("NOTIFICATIONS", articleEditedNotification);
                }

                setArticle(prevArticle => { return {...prevArticle, ...updatedProps} });
                if(updatedProps.expirationDate) setDaysLeft(ExtendedDate.getExpirationContent(updatedProps.expirationDate));
                if(updatedProps.lastUsed) setLastUsed(ExtendedDate.getLastUsedContent(updatedProps.lastUsed));
                setEditInputs({ name: "", expirationDate: updatedProps.expirationDate, amount: "", lastUsed: updatedProps.lastUsed ? updatedProps.lastUsed : "" });

                break;
            default:
        }
    }

    function removeArticle() {
        const articleRemovedNotification = {
            householdId: household.id,
            type: "articleRemoved",
            name: article.name,
            icon: article.icon,
            date: ExtendedDate.defaultFormat(),
            removedBy: profile.id
        };
        
        setInfo(`<strong>${article.name}</strong> has been removed.`);

        if(typeof household.id === "string") {
            Storage.gunRemove("ARTICLES", article.id);
            Storage.gunAdd("NOTIFICATIONS", articleRemovedNotification);
        }

        else {
            Storage.remove("ARTICLES", article.id);
            Storage.add("NOTIFICATIONS", articleRemovedNotification);
        }
        
        disableHouseholdArticleModal();
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
            const articleRanOutNotification = {
                householdId: household.id,
                type: "articleRanOut",
                name: article.name,
                icon: article.icon,
                date: ExtendedDate.defaultFormat()
            };

            setInfo(`Household has ran out of <strong>${article.name}</strong>.`);
            
            if(typeof household.id === "string") {
                Storage.gunRemove("ARTICLES", article.id);
                Storage.gunAdd("NOTIFICATIONS", articleRanOutNotification);
            }

            else {
                Storage.remove("ARTICLES", article.id);
                Storage.add("NOTIFICATIONS", articleRanOutNotification);
            }
            
            disableHouseholdArticleModal();
        }
            
        else {
            const articleUsedNotification = {
                householdId: household.id,
                type: "articleUsed",
                name: article.name,
                icon: article.icon,
                amount: article.amount,
                date: ExtendedDate.defaultFormat(),
                usedBy: profile.id
            };
            
            if(typeof household.id === "string") {
                Storage.gunUpdate("ARTICLES", article.id, { amount: newAmount, lastUsed: ExtendedDate.defaultFormat() });
                Storage.gunAdd("NOTIFICATIONS", articleUsedNotification);
            }

            else {
                Storage.update("ARTICLES", article.id, { amount: newAmount, lastUsed: ExtendedDate.defaultFormat() });
                Storage.add("NOTIFICATIONS", articleUsedNotification);
            }
                    
            setArticle(prevArticle => { return {...prevArticle, amount: newAmount, lastUsed: ExtendedDate.defaultFormat() } });
            setLastUsed(ExtendedDate.getLastUsedContent(ExtendedDate.defaultFormat()));
        }
    }

    return(
        <>
            {confirmation ? <ConfirmationModal
                confirmation={confirmation}
                setConfirmation={setConfirmation}
                confirmationModalRef={confirmationModalRef}
                confirmationModalHolderRef={confirmationModalHolderRef}
                onAccept={removeArticle}
            /> : <></>}
            
            {isModalActive === "use" ? <HouseholdArticleModalUseModal activeArticle={article} useModalRef={useModalRef} disableModal={disableModal} substractAmount={substractAmount} />
            : isModalActive === "recipe" ? <HouseholdArticleModalRecipesModal recipesModalRef={recipesModalRef} disableModal={disableModal} /> : <></>}
            
            <img
                src={images.returnIcon}
                alt="RETURN"
                className="household-article-modal-return"
                onClick={disableHouseholdArticleModal}
            />

            <div className="household-article-modal-title-holder">
                <img src={activeArticle.icon ? activeArticle.icon : images.articleIcon} alt="IMAGE" />
                {isEditActive ? <input
                    type="text"
                    maxLength="32"
                    placeholder={cutText(article.name, 12)}
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
                            ref={amountInputRef}
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
                            ref={lastUsedInputRef}
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