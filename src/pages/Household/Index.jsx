import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import HouseholdHeader from "./HouseholdHeader";
import HouseholdMenu from "./HouseholdMenu";
import HouseholdArticle from "./HouseholdArticle";
import HouseholdModal from "./HouseholdModal/Index";
import { Storage } from "../../functions/Storage";

const Household = () => {
    const location = useLocation();
    const household = location.state;

    const foreign = { key: "householdId", value: household.id };

    const [articles, setArticles] = useState(Storage.get("ARTICLES", foreign));
    const [isHouseholdModalActive, setIsHouseholdModalActive] = useState(false);
    
    const householdModalRef = useRef(null);

    const tags = ["fridge", "freezer", "pantry"];

    useEffect(() => {
        if(Storage.get("ARTICLES", foreign).length) setArticles(Storage.get("ARTICLES", foreign));
    }, [localStorage.getItem("ARTICLES")]);

    function enableHouseholdModal(type) {
        setIsHouseholdModalActive(type);
        setTimeout(() => { householdModalRef.current.id = "household-modal-active" }, 1);
    }

    function disableHouseholdModal() {
        householdModalRef.current.id = "";
        setTimeout(() => { setIsHouseholdModalActive(false) }, 300);
    }
    
    return(
        <div className="household">
            {isHouseholdModalActive ? <HouseholdModal
                type={isHouseholdModalActive}
                household={household}
                householdModalRef={householdModalRef}
                disableHouseholdModal={disableHouseholdModal}
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
                    return <HouseholdArticle key={index} article={article} />;
                })}
            </div>

            <HouseholdMenu enableHouseholdModal={enableHouseholdModal} />
        </div>
    );
}

export default Household;