import React, { useEffect, useRef } from "react";
import { images } from "../data/images";

const InfoModal = ({ info, setInfo, infoModalRef }) => {
    const infoModalLineRef = useRef(null);

    useEffect(() => {
        let interval = setInterval(() => {
            if(!infoModalLineRef.current) return;
            
            const infoModalLineWidth = parseInt(getComputedStyle(infoModalLineRef.current).getPropertyValue("width"));
            
            if(!infoModalLineWidth) {
                disableModal();
                return clearInterval(interval);
            }
            
            infoModalLineRef.current.style.width = `${infoModalLineWidth - 1}px`;
        }, 15);
    }, []);

    function disableModal() {
        infoModalRef.current.id = "";
        setTimeout(() => setInfo(""), 300);
    }
    
    return(
        <div className="info-modal" ref={infoModalRef}>
            <div className="info-modal-line" ref={infoModalLineRef}></div>
            
            <img src={images.xIcon} alt="X" onClick={disableModal} />
            <p dangerouslySetInnerHTML={{ __html: info }}></p>
        </div>
    );
}

export default InfoModal;