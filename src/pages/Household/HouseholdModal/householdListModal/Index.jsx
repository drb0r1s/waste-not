import React, { useState, useEffect, useRef } from "react";
import HouseholdHeader from "../../../../components/HouseholdHeader";
import HouseholdListModalListArticle from "./HouseholdListModalListArticle";
import HouseholdModal from "../Index";
import HouseholdListModalListArticleModal from "./HouseholdListModalListArticleModal";
import PlusButton from "../../../../components/PlusButton";
import { Storage } from "../../../../functions/Storage";

const HouseholdListModal = ({ household, disableHouseholdModal }) => {
    const filter = { key: "householdId", value: household.id };
    
    const [listArticles, setListArticles] = useState(Storage.get("LIST_ARTICLES", filter));
    const [isCreateArticleModalActive, setIsCreateArticleModalActive] = useState(false);
    const [isListArticleModalActive, setIsListArticleModalActive] = useState(false);
    const [activeListArticle, setActiveListArticle] = useState(null);

    const createArticleModalRef = useRef(null);
    const listArticleModalRef = useRef(null);
    const activeListArticleRef = useRef(null);

    useEffect(() => setListArticles(Storage.get("LIST_ARTICLES", filter)), [localStorage.getItem("LIST_ARTICLES")]);

    function enableCreateArticleModal() {
        setIsCreateArticleModalActive(true);
        setTimeout(() => { createArticleModalRef.current.id = "household-modal-active" }, 1);
    }

    function disableCreateArticleModal() {
        createArticleModalRef.current.id = "";
        setTimeout(() => setIsCreateArticleModalActive(false), 300);
    }

    function enableListArticleModal(listArticle) {
        setIsListArticleModalActive(true);
        setActiveListArticle(listArticle);
        setTimeout(() => { listArticleModalRef.current.id = "household-list-modal-list-article-modal-active" }, 1);
    }

    function disableListArticleModal(target, force = false) {
        if(!target?.classList.contains("household-list-modal-list-article-modal-holder") && !force) return;

        listArticleModalRef.current.id = "";

        setTimeout(() => {
            setIsListArticleModalActive(false);
            setActiveListArticle(null);
        }, 300);
    }
    
    return(
        <>
            {isCreateArticleModalActive ? <HouseholdModal
                type="create-article"
                household={household}
                householdModalRef={createArticleModalRef}
                disableHouseholdModal={disableCreateArticleModal}
                isList={true}
            /> : <></>}

            {isListArticleModalActive ? <HouseholdListModalListArticleModal
                activeListArticle={activeListArticle}
                listArticleModalRef={listArticleModalRef}
                disableListArticleModal={disableListArticleModal}
            /> : <></>}
            
            <HouseholdHeader title="shopping list" returnFunction={disableHouseholdModal} />

            <div
                className="household-list-modal-list-article-holder"
                style={!listArticles.length ? { justifyContent: "center" } : {}}
            >
                {!listArticles.length ? <span className="household-list-modal-article-holder-no-span">There are no articles in the shopping list.</span> : listArticles.map((listArticle, index) => {
                    return <HouseholdListModalListArticle
                        key={index}
                        listArticle={listArticle}
                        onClick={enableListArticleModal}
                    />;
                })}
            </div>

            <PlusButton onClick={enableCreateArticleModal} />
        </>
    );
}

export default HouseholdListModal;