import React, { useState, useEffect, useRef } from "react";
import Household from "./Household";
import HomeModal from "./HomeModal";
import HouseholdModal from "./HouseholdModal";
import { images } from "../../data/images";

const Home = () => {
    const [isHomeModalActive, setIsHomeModalActive] = useState(false);
    const [householdModals, setHouseholdModals] = useState({ create: false, join: false, scan: false });
    
    const homeModalRef = useRef(null);
    const householdModalRef = useRef(null);

    useEffect(() => {
        if(isHomeModalActive) setTimeout(() => {
            homeModalRef.current.id = "home-modal-active";
        }, 1);
    }, [isHomeModalActive]);

    function enableHouseholdModal(key) {
        setHouseholdModals(prevHouseholdModals => {return {...prevHouseholdModals, [key]: true}});
    
        setTimeout(() => {
            householdModalRef.current.id = "household-modal-active";
            console.log(householdModalRef.current)
        }, 1);
    }
    
    return(
        <div className="home">
            <h1>WasteNot</h1>

            <div className="household-holder">
                <Household index={0} />
            </div>

            <div className="create-holder" onClick={() => setIsHomeModalActive(true)}>
                <img src={images.plusIcon} alt="+" />
            </div>

            {isHomeModalActive ? <HomeModal
                homeModalRef={homeModalRef}
                setIsHomeModalActive={setIsHomeModalActive}
                enableHouseholdModal={enableHouseholdModal}
            /> : <></>}

            {householdModals.create ? <HouseholdModal type="create" householdModalRef={householdModalRef} />
            : householdModals.join ? <HouseholdModal type="join" householdModalRef={householdModalRef} />
            : householdModals.scan ? <HouseholdModal type="scan" householdModalRef={householdModalRef} /> : <></>}
        </div>
    );
}

export default Home;