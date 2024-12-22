import React from "react";
import { images } from "../../data/images";

const HomeModal = ({ homeModalRef, setIsHomeModalActive, enableHouseholdModal }) => {
    const buttons = ["create household", "join household", "scan QR"];

    function disableHomeModal() {
        homeModalRef.current.id = "";
        setTimeout(() => setIsHomeModalActive(false), 300);
    }
    
    return(
        <div className="home-modal" ref={homeModalRef}>
            <div className="home-modal-x-holder">
                <img src={images.xIcon} alt="X" onClick={disableHomeModal} />
            </div>
            
            <div className="home-modal-button-holder">
                {buttons.map((button, index) => {
                    return <button
                        onClick={() => enableHouseholdModal(button.split(" ")[0])}
                        key={index}
                    >{button}</button>;
                })}
            </div>
        </div>
    );
}

export default HomeModal;