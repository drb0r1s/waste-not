import React, { useState, useEffect, useRef } from "react";
import HouseholdButton from "./HouseholdButton";
import HomeModal from "./HomeModal";
import HouseholdModal from "./HouseholdModal";
import { images } from "../../data/images";
import { Household } from "../../functions/Household";

const Home = () => {
    const [households, setHouseholds] = useState([]);
    const [isHomeModalActive, setIsHomeModalActive] = useState(false);
    const [householdModals, setHouseholdModals] = useState({ create: false, join: false, scan: false });
    const [createHouseholdInput, setCreateHouseholdInput] = useState("");

    const homeModalRef = useRef(null);
    const householdModalRef = useRef(null);

    useEffect(() => {
        if(!localStorage.getItem("households")) return;
        setHouseholds(JSON.parse(localStorage.getItem("households")));
    }, []);

    useEffect(() => {
        if(localStorage.getItem("households")) setHouseholds(JSON.parse(localStorage.getItem("households")));
    }, [localStorage.getItem("households")]);
    
    useEffect(() => {
        if(isHomeModalActive) setTimeout(() => {
            homeModalRef.current.id = "home-modal-active";
        }, 1);
    }, [isHomeModalActive]);

    function disableHomeModal() {
        homeModalRef.current.id = "";
        setTimeout(() => setIsHomeModalActive(false), 300);
    }

    function enableHouseholdModal(key) {
        disableHomeModal();
        
        setHouseholdModals(prevHouseholdModals => {return {...prevHouseholdModals, [key]: true}});
        setTimeout(() => { householdModalRef.current.id = "household-modal-active" }, 1);
    }

    function disableHouseholdModal(key) {
        householdModalRef.current.id = "";
        setTimeout(() => { setHouseholdModals(prevHouseholdModals => { return {...prevHouseholdModals, [key]: false} }) }, 300);
    }
    
    function createButtonClicked(key) {
        switch(key) {
            case "invite":

                break;
            case "done":
                const household = { name: createHouseholdInput, icon: "" };
                Household.create(household);

                setCreateHouseholdInput("");
                disableHouseholdModal("create");

                break;
            default:
        }
    }

    return(
        <div className="home">
            <h1 className="floating-title">WasteNot</h1>

            <div className="household-holder">
                {!households.length ? <span>There are no households.</span> : households.map((household, index) => {
                    return <HouseholdButton key={index} index={index} household={household} />;
                })}
            </div>

            <div className="create-holder" onClick={() => setIsHomeModalActive(true)}>
                <img src={images.plusIcon} alt="+" />
            </div>

            {isHomeModalActive ? <HomeModal
                homeModalRef={homeModalRef}
                disableHomeModal={disableHomeModal}
                enableHouseholdModal={enableHouseholdModal}
            /> : <></>}

            {householdModals.create ? <HouseholdModal type="create" householdModalRef={householdModalRef} disableHouseholdModal={disableHouseholdModal} createButtonClicked={createButtonClicked} createHouseholdInput={createHouseholdInput} setCreateHouseholdInput={setCreateHouseholdInput} />
            : householdModals.join ? <HouseholdModal type="join" householdModalRef={householdModalRef} disableHouseholdModal={disableHouseholdModal} />
            : householdModals.scan ? <HouseholdModal type="scan" householdModalRef={householdModalRef} disableHouseholdModal={disableHouseholdModal} /> : <></>}
        </div>
    );
}

export default Home;