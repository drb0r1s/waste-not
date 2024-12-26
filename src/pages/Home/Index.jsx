import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HouseholdButton from "./HouseholdButton";
import HomeModal from "./HomeModal";
import HouseholdModal from "./HouseholdModal";
import PlusButton from "../../components/PlusButton";
import { Storage } from "../../functions/Storage";

const Home = () => {
    const [households, setHouseholds] = useState(Storage.get("HOUSEHOLDS"));
    const [isHomeModalActive, setIsHomeModalActive] = useState(false);
    const [householdModals, setHouseholdModals] = useState({ create: false, join: false, scan: false });
    const [createHouseholdInput, setCreateHouseholdInput] = useState("");

    const homeModalRef = useRef(null);
    const householdModalRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if(Storage.get("HOUSEHOLDS").length) setHouseholds(Storage.get("HOUSEHOLDS"));
    }, [localStorage.getItem("HOUSEHOLDS")]);
    
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
                const householdNextId = parseInt(localStorage.getItem("HOUSEHOLDS_NEXT_ID"));
                const householdName = createHouseholdInput ? createHouseholdInput : `Household ${householdNextId + 1}`;

                const household = {
                    name: householdName,
                    icon: "",
                    members: 1
                };

                Storage.add("HOUSEHOLDS", household);

                setCreateHouseholdInput("");
                disableHouseholdModal("create");

                break;
            default:
        }
    }

    function joinButtonClicked() {

    }

    return(
        <div className="home">
            <h1 className="floating-title">WasteNot</h1>

            <div className="household-holder">
                {!households.length ? <span>There are no households.</span> : households.map((household, index) => {
                    return <HouseholdButton
                        key={index}
                        index={index}
                        household={household}
                        onClick={() => navigate("/household", { state: household })}
                    />;
                })}
            </div>

            <PlusButton onClick={() => setIsHomeModalActive(true)} />

            {isHomeModalActive ? <HomeModal
                homeModalRef={homeModalRef}
                disableHomeModal={disableHomeModal}
                enableHouseholdModal={enableHouseholdModal}
            /> : <></>}

            {householdModals.create ? <HouseholdModal type="create" householdModalRef={householdModalRef} disableHouseholdModal={disableHouseholdModal} createButtonClicked={createButtonClicked} createHouseholdInput={createHouseholdInput} setCreateHouseholdInput={setCreateHouseholdInput} />
            : householdModals.join ? <HouseholdModal type="join" householdModalRef={householdModalRef} disableHouseholdModal={disableHouseholdModal} joinButtonClicked={joinButtonClicked} />
            : householdModals.scan ? <HouseholdModal type="scan" householdModalRef={householdModalRef} disableHouseholdModal={disableHouseholdModal} /> : <></>}
        </div>
    );
}

export default Home;