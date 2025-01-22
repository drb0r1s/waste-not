import React, { useState, useEffect, useRef } from "react";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { images } from "../../../../data/images";
import { Storage } from "../../../../functions/Storage";
import { cutText } from "../../../../functions/cutText";
import { ExtendedDate } from "../../../../functions/ExtendedDate";

const HouseholdListModalListArticleModal = ({ household, activeListArticle, listArticleModalRef, disableListArticleModal, setInfo }) => {
    const [confirmation, setConfirmation] = useState("");

    const confirmationModalRef = useRef(null);
    const confirmationModalHolderRef = useRef(null);
    
    const buttons = ["make as bought", "remove item"];
    const profile = Storage.get("PROFILE");

    useEffect(() => {
        if(!confirmation) return;
    
        setTimeout(() => {
            confirmationModalRef.current.id = "confirmation-modal-active";
            confirmationModalHolderRef.current.id = "confirmation-modal-holder-active";
        }, 1);
    }, [confirmation]);

    function buttonClicked(key) {
        switch(key) {
            case "make":
                if(typeof household.id === "string") Storage.gunUpdate("LIST_ARTICLES", activeListArticle.id, { isMarked: !activeListArticle.isMarked });
                else Storage.update("LIST_ARTICLES", activeListArticle.id, { isMarked: !activeListArticle.isMarked });

                disableListArticleModal(null, true);

                break;
            case "remove":
                setConfirmation(`Are you sure that you want to remove <strong>${activeListArticle.name}</strong>?`);
                break;
            default:
        }
    }

    function removeListArticle() {
        const listArticleRemovedNotification = {
            type: "listArticleRemoved",
            name: activeListArticle.name,
            icon: activeListArticle.icon,
            date: ExtendedDate.defaultFormat(),
            removedBy: profile.id
        };
        
        setInfo(`<strong>${activeListArticle.name}</strong> has been removed from the shopping list.`);

        if(typeof household.id === "string") {
            Storage.gunRemove("LIST_ARTICLES", activeListArticle.id);
            Storage.gunAdd("NOTIFICATIONS", listArticleRemovedNotification);
        }

        else {
            Storage.remove("LIST_ARTICLES", activeListArticle.id);
            Storage.add("NOTIFICATIONS", listArticleRemovedNotification);
        }
        
        disableListArticleModal(null, true);
    }
    
    return(
        <div
            className="household-list-modal-list-article-modal-holder"
            ref={listArticleModalRef}
            onClick={e => disableListArticleModal(e.target)}
        >
            {confirmation ? <ConfirmationModal
                confirmation={confirmation}
                setConfirmation={setConfirmation}
                confirmationModalRef={confirmationModalRef}
                confirmationModalHolderRef={confirmationModalHolderRef}
                onAccept={removeListArticle}
            /> : <></>}
            
            <div className="household-list-modal-list-article-modal">
                <img src={activeListArticle.icon ? activeListArticle.icon : images.articleIcon} alt="ARTICLE" />
                <strong>{cutText(activeListArticle.name, 15)}</strong>

                <div className="household-list-modal-list-article-modal-button-holder">
                    {buttons.map((button, index) => {
                        return <button
                            key={index}
                            onClick={() => buttonClicked(button.split(" ")[0])}
                        >{activeListArticle.isMarked ? "unmark item" : button}</button>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default HouseholdListModalListArticleModal;