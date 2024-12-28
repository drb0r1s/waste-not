import React from "react";
import { images } from "../../../../data/images";
import { Storage } from "../../../../functions/Storage";

const HouseholdListModalListArticleModal = ({ activeListArticle, listArticleModalRef, disableListArticleModal }) => {
    const buttons = ["make as bought", "remove item"];

    function buttonClicked(key) {
        switch(key) {
            case "make":
                Storage.update("LIST_ARTICLES", activeListArticle.id, { isMarked: !activeListArticle.isMarked });
                disableListArticleModal(null, true);

                break;
            case "remove":
                Storage.remove("LIST_ARTICLES", activeListArticle.id);
                disableListArticleModal(null, true);

                break;
            default:
        }
    }
    
    return(
        <div
            className="household-list-modal-list-article-modal-holder"
            ref={listArticleModalRef}
            onClick={e => disableListArticleModal(e.target)}
        >
            <div className="household-list-modal-list-article-modal">
                <img src={images.imageIcon} alt="ARTICLE" />
                <strong>{activeListArticle.name}</strong>

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