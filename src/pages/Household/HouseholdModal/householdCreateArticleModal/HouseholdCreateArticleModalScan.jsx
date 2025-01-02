import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import Loading from "../../../../components/Loading";
import { articles } from "../../../../data/articles";
import { images } from "../../../../data/images";
import { ExtendedDate } from "../../../../functions/ExtendedDate";

const HouseholdCreateArticleModalScan = ({
    scanModalRef, isScanModalActive, disableScanModal,
    setName, setExpirationDate
}) => {
    const [isVideoActive, setIsVideoActive] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVideoActive(true), 2000);
    }, []);

    function scanArticle() {
        switch(isScanModalActive) {
            case "barcode":
                const randomArticle = articles[Math.floor(Math.random() * articles.length)];
                setName(randomArticle.name);

                break;
            case "expiration":
                setExpirationDate(ExtendedDate.getRandom("2025-01-01", "2025-03-01"));
                break;
            default:
        }        

        disableScanModal();
    }
    
    return(
        <div className="household-create-article-modal-scan" ref={scanModalRef}>
            <img
                src={images.returnIcon}
                alt="RETURN"
                onClick={disableScanModal}
            />
            
            <h2>scan {isScanModalActive === "barcode" ? "barcode" : "expiration date"}</h2>
            
            {!isVideoActive ? <Loading /> : <></>}
            
            <Webcam
                className={isVideoActive ? "video-active" : ""}
                videoConstraints={{ facingMode: "environment" }}
            />

            <button onClick={scanArticle}>scan</button>
        </div>
    );
}

export default HouseholdCreateArticleModalScan;