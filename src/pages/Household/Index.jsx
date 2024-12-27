import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import HouseholdHeader from "./HouseholdHeader";
import HouseholdMenu from "./HouseholdMenu";
import HouseholdArticle from "./HouseholdArticle";
import HouseholdModal from "./householdModal/Index";
import HouseholdMemberModal from "./HouseholdMemberModal";
import { Storage } from "../../functions/Storage";

const Household = () => {
    const location = useLocation();
    const household = location.state;

    const filter = { key: "householdId", value: household.id };

    const [articles, setArticles] = useState(Storage.get("ARTICLES", filter));

    const [isHouseholdModalActive, setIsHouseholdModalActive] = useState(false);
    const [isHouseholdMemberModalActive, setIsHouseholdMemberModalActive] = useState(false);
    const [activeArticle, setActiveArticle] = useState(false);

    const householdModalRef = useRef(null);
    const householdMemberModalHolderRef = useRef(null);
    const householdMemberModalRef = useRef(null);

    const tags = ["fridge", "freezer", "pantry"];

    useEffect(() => {
        setArticles(Storage.get("ARTICLES", filter));

        if(activeArticle) {
            const newActiveArticle = Storage.get("ARTICLES", { key: "id", value: activeArticle.id });
            setActiveArticle(newActiveArticle);
        }
    }, [localStorage.getItem("ARTICLES")]);

    function enableHouseholdModal(type) {
        setIsHouseholdModalActive(type);
        setTimeout(() => { householdModalRef.current.id = "household-modal-active" }, 1);
    }

    function disableHouseholdModal() {
        householdModalRef.current.id = "";
        setTimeout(() => { setIsHouseholdModalActive(false) }, 300);
    }

    function enableHouseholdArticleModal(article) {
        enableHouseholdModal("article");
        setActiveArticle(article);
    }

    function disableHouseholdArticleModal() {
        disableHouseholdModal();
        setTimeout(() => setActiveArticle(false), 300);
    }

    function enableHouseholdMemberModal() {
        setIsHouseholdMemberModalActive(true);
        
        setTimeout(() => {
            householdMemberModalHolderRef.current.id = "household-member-modal-holder-active";
            householdMemberModalRef.current.id = "household-member-modal-active";
        }, 1);
    }

    function disableHouseholdMemberModal(target) {
        if(!target.classList.contains("household-member-modal-holder")) return;
        
        householdMemberModalHolderRef.current.id = "";
        householdMemberModalRef.current.id = "";
        
        setTimeout(() => setIsHouseholdMemberModalActive(false), 300);
    }
    
    return(
        <div className="household">
            {isHouseholdModalActive ? <HouseholdModal
                type={isHouseholdModalActive}
                household={household}
                householdModalRef={householdModalRef}
                disableHouseholdModal={disableHouseholdModal}
                activeArticle={activeArticle}
                disableHouseholdArticleModal={disableHouseholdArticleModal}
                enableHouseholdMemberModal={enableHouseholdMemberModal}
            /> : <></>}

            {isHouseholdMemberModalActive ? <HouseholdMemberModal
                householdMemberModalHolderRef={householdMemberModalHolderRef}
                householdMemberModalRef={householdMemberModalRef}
                disableHouseholdMemberModal={disableHouseholdMemberModal}
            /> : <></>}
            
            <HouseholdHeader household={household} />

            <div className="household-tag-holder">
                {tags.map((tag, index) => {
                    return <p key={index} className="household-tag">{tag}</p>
                })}
            </div>

            <div
                className="article-holder"
                style={!articles.length ? { alignItems: "center", justifyContent: "center" } : {}}
            >
                {!articles.length ? <span>There are no articles.</span> : articles.map((article, index) => {
                    return <HouseholdArticle
                        key={index}
                        article={article}
                        onClick={enableHouseholdArticleModal}
                    />;
                })}
            </div>

            <HouseholdMenu enableHouseholdModal={enableHouseholdModal} />
        </div>
    );
}

export default Household;