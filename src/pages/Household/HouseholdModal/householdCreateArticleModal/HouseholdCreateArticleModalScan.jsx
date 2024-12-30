import React from "react";
import Webcam from "react-webcam";
import { articles } from "../../../../data/articles";
import { images } from "../../../../data/images";
import { Storage } from "../../../../functions/Storage";
import { ExtendedDate } from "../../../../functions/ExtendedDate";

const HouseholdCreateArticleModalScan = ({
    scanModalRef, isScanModalActive, disableScanModal,
    disableHouseholdModal, household
}) => {
    function scanArticle() {
        const randomArticle = articles[Math.floor(Math.random() * articles.length)];

        Storage.add("ARTICLES", {
            householdId: household.id,
            name: randomArticle.name,
            icon: randomArticle.icon,
            expirationDate: ExtendedDate.getRandom("2025-01-01", "2027-01-01"),
            tag: randomArticle.tag,
            amount: Math.floor(Math.random() * (20 - 1 + 1)) + 1,
            lastUsed: ExtendedDate.getRandom("2024-06-01", "2024-12-30")
        });

        disableScanModal();
        disableHouseholdModal();
    }
    
    return(
        <div className="household-create-article-modal-scan" ref={scanModalRef}>
            <img
                src={images.returnIcon}
                alt="RETURN"
                onClick={disableScanModal}
            />
            
            <h2>scan {isScanModalActive === "barcode" ? "barcode" : "expiration date"}</h2>
            <Webcam />

            <button onClick={scanArticle}>scan</button>
        </div>
    );
}

export default HouseholdCreateArticleModalScan;