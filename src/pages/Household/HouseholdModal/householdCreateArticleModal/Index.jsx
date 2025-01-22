import React, { useState, useEffect, useRef } from "react";
import HouseholdHeader from "../../../../components/HouseholdHeader";
import HouseholdCreateArticleModalScan from "./HouseholdCreateArticleModalScan";
import { Storage } from "../../../../functions/Storage";
import { ExtendedDate } from "../../../../functions/ExtendedDate";
import { getArticleIcon } from "../../../../functions/getArticleIcon";

const HouseholdCreateArticleModal = ({ household, disableHouseholdModal, isList }) => {
    const [articleInputs, setArticleInputs] = useState({ name: "", expirationDate: "", tag: "fridge" });
    const [isPerishable, setIsPerishable] = useState(true);
    const [isScanModalActive, setIsScanModalActive] = useState(false);

    const nameInputRef = useRef(null);
    const expirationInputRef = useRef(null);
    const scanModalRef = useRef(null);
    const createArticleButtonRef = useRef(null);
    
    const buttons = ["scan barcode", "scan expiration date"];
    const profile = Storage.get("PROFILE");

    useEffect(() => {
        if(!isPerishable && articleInputs.expirationDate) setArticleInputs(prevArticleInputs => { return {...prevArticleInputs, expirationDate: ""} });
    }, [isPerishable]);

    function updateName(content) {
        if(!content) createArticleButtonRef.current.classList.add("button-disabled");
        else createArticleButtonRef.current.classList.remove("button-disabled");

        setArticleInputs(prevArticleInputs => { return {...prevArticleInputs, name: content} });
    }

    function buttonClicked(key) {
        switch(key) {
            case "barcode":
                enableScanModal(key);
                break;
            case "expiration":
                enableScanModal(key);
                break;
            default:
        }
    }

    function createArticle() {
        if(!articleInputs.name) return;
        if(isPerishable && !articleInputs.expirationDate && !isList) return expirationInputRef.current.style.border = "2px solid red";
        
        const articleObject = {
            householdId: household.id,
            ...articleInputs,
            icon: getArticleIcon(articleInputs.name),
            amount: 1,
            lastUsed: null
        };

        const articleAddedNotification = type => { return {
            householdId: household.id,
            type,
            name: articleInputs.name,
            icon: articleInputs.icon,
            tag: articleInputs.tag,
            date: ExtendedDate.defaultFormat(),
            addedBy: profile.id
        }};

        const householdArticles = Storage.get("ARTICLES", { key: "householdId", value: household.id });
        let existingArticle = null;

        for(let i = 0; i < householdArticles.length; i++) {
            if(householdArticles[i].name === articleInputs.name) existingArticle = householdArticles[i];
        }

        if(existingArticle && !isList) {
            if(typeof household.id === "string") {
                Storage.gunUpdate("ARTICLES", existingArticle.id, { amount: existingArticle.amount + 1 });
                Storage.gunAdd("NOTIFICATIONS", articleAddedNotification("articleAdded"));
            }

            else {
                Storage.update("ARTICLES", existingArticle.id, { amount: existingArticle.amount + 1 });
                Storage.add("NOTIFICATIONS", articleAddedNotification("articleAdded"));
            }
        }
        
        else if(isList) {
            const listArticleObject = {
                householdId: household.id,
                name: articleInputs.name,
                icon: getArticleIcon(articleInputs.name),
                date: ExtendedDate.defaultFormat(),
                isMarked: false,
                addedBy: Storage.get("PROFILE").id
            };

            if(typeof household.id === "string") {
                Storage.gunAdd("LIST_ARTICLES", listArticleObject);
                Storage.gunAdd("NOTIFICATIONS", articleAddedNotification("listArticleAdded"));
            }

            else {
                Storage.add("LIST_ARTICLES", listArticleObject);
                Storage.add("NOTIFICATIONS", articleAddedNotification("listArticleAdded"));
            }
        }
        
        else {
            if(typeof household.id === "string") {
                Storage.gunAdd("ARTICLES", articleObject);
                Storage.gunAdd("NOTIFICATIONS", articleAddedNotification("articleAdded"));
            }

            else {
                Storage.add("ARTICLES", articleObject);
                Storage.add("NOTIFICATIONS", articleAddedNotification("articleAdded"));
            }
        }
        
        setArticleInputs({ name: "", expirationDate: "", tag: "fridge" });
        disableHouseholdModal();
    }

    function enableScanModal(key) {
        setIsScanModalActive(key);
        setTimeout(() => { scanModalRef.current.id = "household-create-artical-modal-scan-active" }, 1);
    }

    function disableScanModal() {
        scanModalRef.current.id = "";
        setTimeout(() => setIsScanModalActive(false), 300);
    }
    
    return(
        <>
            {isScanModalActive ? <HouseholdCreateArticleModalScan
                scanModalRef={scanModalRef}
                isScanModalActive={isScanModalActive}
                disableScanModal={disableScanModal}
                setName={newName => {
                    setArticleInputs(prevArticleInputs => { return {...prevArticleInputs, name: newName} });
                    updateName(newName);
                }}
                setExpirationDate={newDate => setArticleInputs(prevArticleInputs => { return {...prevArticleInputs, expirationDate: newDate} })}
            /> : <></>}
            
            <HouseholdHeader title="add article" returnFunction={disableHouseholdModal} />

            <div className="household-create-article-modal-content-holder">
                <form>
                    <fieldset>
                        <label htmlFor="create-article-modal-name">name</label>
                        
                        <input
                            type="text"
                            name="create-article-modal-name"
                            id="create-article-modal-name"
                            placeholder="Pan..."
                            maxLength="32"
                            ref={nameInputRef}
                            value={articleInputs.name}
                            onChange={e => updateName(e.target.value)}
                        />

                        {!isList ? <div className="household-create-article-modal-checkbox-holder">
                            <input
                                type="checkbox"
                                name="create-article-perishable"
                                id="create-article-perishable"
                                checked={isPerishable}
                                onChange={() => setIsPerishable(prevIsPerishable => !prevIsPerishable)}
                            />

                            <label htmlFor="create-article-perishable">perishable</label>
                        </div> : <></>}
                    </fieldset>

                    {!isList ? <fieldset>
                        <label htmlFor="create-article-modal-storage">store in</label>

                        <select
                            name="create-article-modal-storage"
                            id="create-article-modal-storage"
                            value={articleInputs.tag}
                            onChange={e => setArticleInputs(prevArticleInputs => { return {...prevArticleInputs, tag: e.target.value} })}
                        >
                            <option value="fridge">fridge</option>
                            <option value="freezer">freezer</option>
                            <option value="pantry">pantry</option>
                        </select>
                    </fieldset> : <></>}

                    {!isList ? <fieldset id={!isPerishable ? "create-article-modal-fieldset-disabled" : ""}>
                        <label htmlFor="create-article-modal-expiration">expiration date</label>
                        
                        <input
                            type="date"
                            name="create-article-modal-expiration"
                            id="create-article-modal-expiration"
                            ref={expirationInputRef}
                            value={articleInputs.expirationDate}
                            onChange={e => setArticleInputs(prevArticleInputs => { return {...prevArticleInputs, expirationDate: e.target.value} })}
                        />
                    </fieldset> : <></>}
                </form>

                {!isList ? <div className="button-holder">
                    {buttons.map((button, index) => {
                        return <button
                            key={index}
                            onClick={() => buttonClicked(button.split(" ")[1])}
                        >{button}</button>;
                    })}
                </div> : <></>}
            </div>

            <button
                className="household-create-article-modal-button button-disabled"
                ref={createArticleButtonRef}
                onClick={createArticle}
            >done</button>
        </>
    );
}

export default HouseholdCreateArticleModal;