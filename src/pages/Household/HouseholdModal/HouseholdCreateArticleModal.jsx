import React, { useState, useEffect, useRef } from "react";
import HouseholdHeader from "../../../components/HouseholdHeader";
import { Storage } from "../../../functions/Storage";
import { ExtendedDate } from "../../../functions/ExtendedDate";

const HouseholdCreateArticleModal = ({ household, disableHouseholdModal, isList }) => {
    const [articleInputs, setArticleInputs] = useState({ name: "", icon: "", expirationDate: "" });
    const [isPerishable, setIsPerishable] = useState(true);

    const expirationInputRef = useRef(null);
    
    const buttons = ["scan barcode", "scan expiration date"];

    useEffect(() => {
        if(!isPerishable && articleInputs.expirationDate) setArticleInputs(prevArticleInputs => { return {...prevArticleInputs, expirationDate: ""} });
    }, [isPerishable]);

    function createArticle() {
        if(isPerishable && !articleInputs.expirationDate && !isList) return expirationInputRef.current.style.border = "3px solid red";
        
        const [article] = Storage.get("ARTICLES", { key: "name", value: articleInputs.name });

        if(article && !isList) Storage.update("ARTICLES", article.id, { amount: article.amount + 1 });
        
        else if(isList) Storage.add("LIST_ARTICLES", {
            householdId: household.id,
            name: articleInputs.name,
            icon: articleInputs.icon,
            date: ExtendedDate.defaultFormat(),
            isMarked: false
        });
        
        else Storage.add("ARTICLES", {
            householdId: household.id,
            ...articleInputs,
            amount: 1,
            lastUsed: null
        });
        
        setArticleInputs({ name: "", icon: "", expirationDate: "" });
        disableHouseholdModal();
    }
    
    return(
        <>
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
                        return <button key={index}>{button}</button>;
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