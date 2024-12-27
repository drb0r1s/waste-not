import React, { useState, useEffect, useRef } from "react";
import { images } from "../../../data/images";
import { Storage } from "../../../functions/Storage";

const HouseholdCreateArticleModal = ({ household, disableHouseholdModal }) => {
    const [articleInputs, setArticleInputs] = useState({ name: "", icon: "", expirationDate: "" });
    const [isPerishable, setIsPerishable] = useState(true);

    const expirationInputRef = useRef(null);
    
    const buttons = ["scan barcode", "scan expiration date"];

    useEffect(() => {
        if(!isPerishable && articleInputs.expirationDate) setArticleInputs(prevArticleInputs => { return {...prevArticleInputs, expirationDate: ""} });
    }, [isPerishable]);

    function createArticle() {
        if(isPerishable && !articleInputs.expirationDate) return expirationInputRef.current.style.border = "3px solid red";
        
        const [article] = Storage.get("ARTICLES", { key: "name", value: articleInputs.name });

        if(article) Storage.update("ARTICLES", article.id, { amount: article.amount + 1 });
        
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
            <header>
                <img src={images.returnIcon} alt="RETURN" onClick={disableHouseholdModal} />
                <h2>add article</h2>
            </header>

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

                        <div className="household-create-article-modal-checkbox-holder">
                            <input
                                type="checkbox"
                                name="create-article-perishable"
                                id="create-article-perishable"
                                checked={isPerishable}
                                onChange={() => setIsPerishable(prevIsPerishable => !prevIsPerishable)}
                            />

                            <label htmlFor="create-article-perishable">perishable</label>
                        </div>
                    </fieldset>

                    <fieldset id={!isPerishable ? "create-article-modal-fieldset-disabled" : ""}>
                        <label htmlFor="create-article-modal-expiration">expiration date</label>
                        
                        <input
                            type="date"
                            name="create-article-modal-expiration"
                            id="create-article-modal-expiration"
                            ref={expirationInputRef}
                            onChange={e => setArticleInputs(prevArticleInputs => { return {...prevArticleInputs, expirationDate: e.target.value} })}
                        />
                    </fieldset>
                </form>

                <div className="button-holder">
                    {buttons.map((button, index) => {
                        return <button key={index}>{button}</button>;
                    })}
                </div>
            </div>

            <button
                className="household-create-article-modal-button"
                onClick={createArticle}
            >done</button>
        </>
    );
}

export default HouseholdCreateArticleModal;