import React, { useState, useEffect, useRef } from "react";
import HouseholdHeader from "../../../../components/HouseholdHeader";
import HouseholdCreateArticleModalScan from "./HouseholdCreateArticleModalScan";
import { Storage } from "../../../../functions/Storage";
import { ExtendedDate } from "../../../../functions/ExtendedDate";

const HouseholdCreateArticleModal = ({ household, disableHouseholdModal, isList }) => {
    const [articleInputs, setArticleInputs] = useState({ name: "", icon: "", expirationDate: "", tag: "fridge" });
    const [isPerishable, setIsPerishable] = useState(true);
    const [isScanModalActive, setIsScanModalActive] = useState(false);

    const expirationInputRef = useRef(null);
    const scanModalRef = useRef(null);
    
    const buttons = ["scan barcode", "scan expiration date"];

    useEffect(() => {
        if(!isPerishable && articleInputs.expirationDate) setArticleInputs(prevArticleInputs => { return {...prevArticleInputs, expirationDate: ""} });
    }, [isPerishable]);

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
        if(isPerishable && !articleInputs.expirationDate && !isList) return expirationInputRef.current.style.border = "3px solid red";
        
        const [article] = Storage.get("ARTICLES", { key: "name", value: articleInputs.name });

        if(article && !isList) Storage.update("ARTICLES", article.id, { amount: article.amount + 1 });
        
        else if(isList) Storage.add("LIST_ARTICLES", {
            householdId: household.id,
            name: articleInputs.name,
            icon: articleInputs.icon,
            date: ExtendedDate.defaultFormat(),
            isMarked: false,
            addedBy: Storage.get("PROFILE")
        });
        
        else Storage.add("ARTICLES", {
            householdId: household.id,
            ...articleInputs,
            amount: 1,
            lastUsed: null
        });
        
        setArticleInputs({ name: "", icon: "", expirationDate: "", tag: "fridge" });
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
                disableHouseholdModal={disableHouseholdModal}
                household={household}
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
                            value={articleInputs.name}
                            onChange={e => setArticleInputs(prevArticleInputs => { return {...prevArticleInputs, name: e.target.value} })}
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
                className="household-create-article-modal-button"
                onClick={createArticle}
            >done</button>
        </>
    );
}

export default HouseholdCreateArticleModal;