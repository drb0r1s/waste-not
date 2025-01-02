import React, { useState, useRef } from "react";
import { images } from "../../../../data/images";

const HouseholdArticleModalUseModal = ({ activeArticle, useModalRef, disableModal, substractAmount }) => {
    const [useValue, setUseValue] = useState("");
    
    const inputRef = useRef(null);
    const okButtonRef = useRef(null);
    
    const buttons = ["cancel", "ok"];

    function updateUseValue(content) {
        if(!content) okButtonRef.current.classList.add("button-disabled");
        else okButtonRef.current.classList.remove("button-disabled");
        
        setUseValue(content);
    }

    function buttonClicked(key) {
        switch(key) {
            case "cancel":
                disableModal();
                break;
            case "ok":
                if(!useValue) return;

                const newAmount = activeArticle.amount - parseInt(useValue);
                if(newAmount < 0 || parseInt(useValue) < 1) return inputRef.current.style.border = "1px solid red";
                
                substractAmount(parseInt(useValue));
                disableModal();
                break;
            default:
        }
    }
    
    return(
        <div className="household-article-modal-use-modal" ref={useModalRef}>
            <img
                src={images.returnIcon}
                alt="RETURN"
                className="household-article-modal-use-modal-return"
                onClick={disableModal}
            />
            
            <div className="household-article-modal-use-modal-content-holder">
                <img src={activeArticle.icon ? activeArticle.icon : images.articleIcon} alt="ARTICLE" />
                <strong>{activeArticle.name}</strong>
            </div>

            <div className="household-article-modal-use-modal-mini-modal">
                <p>use</p>

                <input
                    type="number"
                    placeholder="00.00"
                    ref={inputRef}
                    value={useValue}
                    onChange={e => updateUseValue(e.target.value)}
                />

                <div className="household-article-modal-use-modal-mini-modal-button-holder">
                    {buttons.map((button, index) => {
                        if(button === "ok") return <button
                            key={index}
                            className="button-disabled"
                            ref={okButtonRef}
                            onClick={() => buttonClicked(button)}
                        >{button}</button>
                        
                        return <button
                            key={index}
                            onClick={() => buttonClicked(button)}
                        >{button}</button>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default HouseholdArticleModalUseModal;