import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HouseholdHeader from "../../components/HouseholdHeader";
import HouseholdTagHolder from "../../components/HouseholdTagHolder";
import HouseholdMenu from "./HouseholdMenu";
import HouseholdArticle from "./HouseholdArticle";
import HouseholdModal from "./householdModal/Index";
import HouseholdMemberModal from "./HouseholdMemberModal";
import { Storage } from "../../functions/Storage";

const Household = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const storageFilter = { key: "householdId", value: location.state.household.id };

    const [household, setHousehold] = useState(location.state.household);
    const [articles, setArticles] = useState(Storage.get("ARTICLES", storageFilter));
    const [filteredArticles, setFilteredArticles] = useState(articles);
    const [filter, setFilter] = useState("");
    const [isHouseholdModalActive, setIsHouseholdModalActive] = useState(false);
    const [isHouseholdMemberModalActive, setIsHouseholdMemberModalActive] = useState(false);
    const [activeArticle, setActiveArticle] = useState(false);

    const householdModalRef = useRef(null);
    const householdMemberModalHolderRef = useRef(null);
    const householdMemberModalRef = useRef(null);

    const tags = ["fridge", "freezer", "pantry"];

    useEffect(() => setHousehold(...Storage.get("HOUSEHOLDS", { key: "id", value: household.id })), [localStorage.getItem("HOUSEHOLDS")]);
    
    useEffect(() => {
        setArticles(Storage.get("ARTICLES", storageFilter));

        if(activeArticle) {
            const newActiveArticle = Storage.get("ARTICLES", { key: "id", value: activeArticle.id });
            setActiveArticle(newActiveArticle);
        }
    }, [localStorage.getItem("ARTICLES")]);

    useEffect(updateFilter, [filter, articles]);

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

    function enableHouseholdMemberModal(member) {
        setIsHouseholdMemberModalActive(member);
        
        setTimeout(() => {
            householdMemberModalHolderRef.current.id = "household-member-modal-holder-active";
            householdMemberModalRef.current.id = "household-member-modal-active";
        }, 1);
    }

    function disableHouseholdMemberModal(target, force = false) {
        if(!target?.classList.contains("household-member-modal-holder") && !force) return;
        
        householdMemberModalHolderRef.current.id = "";
        householdMemberModalRef.current.id = "";
        
        setTimeout(() => setIsHouseholdMemberModalActive(false), 300);
    }

    function updateFilter() {
        if(!filter && articles.length) return setFilteredArticles(articles);
        else if(!filter || !articles.length) return;

        const newArticles = [];

        for(let i = 0; i < articles.length; i++) {
            if(articles[i].tag === filter) newArticles.push(articles[i]);
        }

        setFilteredArticles(newArticles);
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
                isList={false}
            /> : <></>}

            {isHouseholdMemberModalActive ? <HouseholdMemberModal
                activeMemberId={isHouseholdMemberModalActive}
                household={household}
                householdMemberModalHolderRef={householdMemberModalHolderRef}
                householdMemberModalRef={householdMemberModalRef}
                disableHouseholdMemberModal={disableHouseholdMemberModal}
            /> : <></>}
            
            <HouseholdHeader
                title={household.name}
                returnFunction={() => navigate("/")}
                searchFunction={true}
                className="household-main-header"
            />

            <HouseholdTagHolder tags={tags} setFilter={setFilter} />

            <div
                className="article-holder"
                style={!filteredArticles.length ? { alignItems: "center", justifyContent: "center" } : {}}
            >
                {!filteredArticles.length ? <span>There are no articles.</span> : filteredArticles.map((article, index) => {
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