import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MobileInfo from "./MobileInfo";
import HouseholdButton from "./HouseholdButton";
import HomeModal from "./HomeModal";
import HouseholdModal from "./HouseholdModal";
import NewHouseholdModal from "./NewHouseholdModal";
import PlusButton from "../../components/PlusButton";
import InfoModal from "../../components/InfoModal";
import { useBrowserReturn } from "../../hooks/useBrowserReturn";
import { Storage } from "../../functions/Storage";
import { ExtendedDate } from "../../functions/ExtendedDate";

const Home = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [households, setHouseholds] = useState(Storage.get("HOUSEHOLDS"));
    const [isHomeModalActive, setIsHomeModalActive] = useState(false);
    const [householdModals, setHouseholdModals] = useState({ create: false, join: false, scan: false });
    const [createHouseholdInput, setCreateHouseholdInput] = useState("");
    const [joinHouseholdInput, setJoinHouseholdInput] = useState("");
    const [isNewHouseholdModalActive, setIsNewHouseholdModalActive] = useState(false);
    const [isHouseholdModalLoading, setIsHouseholdModalLoading] = useState(false);
    const [info, setInfo] = useState("");

    const homeModalRef = useRef(null);
    const householdModalRef = useRef(null);
    const newHouseholdModalRef = useRef(null);
    const joinHouseholdInputRef = useRef(null);
    const infoModalRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();

    useBrowserReturn();

    useEffect(() => {
        const resize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", resize);

        if(location.state?.info && !info) {
            setInfo(location.state.info);
            setTimeout(() => { infoModalRef.current.id = "info-modal-active" }, 10);
        }

        return () => {
            window.removeEventListener("resize", resize);
        }
    }, []);
    
    useEffect(() => {
        if(Storage.get("HOUSEHOLDS").length) setHouseholds(Storage.get("HOUSEHOLDS"));
    }, [localStorage.getItem("WASTENOT_HOUSEHOLDS")]);
    
    useEffect(() => {
        if(isHomeModalActive) setTimeout(() => { homeModalRef.current.id = "home-modal-active" }, 1);
    }, [isHomeModalActive]);

    useEffect(() => {
        if(isNewHouseholdModalActive) setTimeout(() => { newHouseholdModalRef.current.id = "new-household-modal-active" }, 10);
    }, [isNewHouseholdModalActive]);

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

    function disableNewHouseholdModal() {
        newHouseholdModalRef.current.id = "";
        setTimeout(() => setIsNewHouseholdModalActive(false), 300);
    }
    
    function createButtonClicked(key) {
        switch(key) {
            case "invite":
                navigate("/invite", { state: { household: {}, returnHome: true } });
                break;
            case "done":
                const householdNextId = parseInt(localStorage.getItem("WASTENOT_HOUSEHOLDS_NEXT_ID"));
                const householdName = createHouseholdInput ? createHouseholdInput : `Household ${householdNextId + 1}`;
                
                const household = {
                    name: householdName,
                    icon: "",
                    members: [Storage.get("PROFILE").id],
                    owner: Storage.get("PROFILE").id
                };

                Storage.add("HOUSEHOLDS", household);

                if(householdName[0].toLowerCase() === "a") {
                    const users = Storage.selectRandom("USERS", [2, 8]);
                    const userIds = [];
                    
                    for(let i = 0; i < users.length; i++) userIds.push(users[i].id);

                    const randomTime = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
                    setTimeout(() => {
                        for(let i = 0; i < users.length; i++) Storage.add("NOTIFICATIONS", {
                            householdId: householdNextId,
                            type: "userJoined",
                            userId: users[i].id,
                            date: ExtendedDate.defaultFormat()
                        });
                        
                        Storage.update("HOUSEHOLDS", householdNextId, { members: [...household.members, ...userIds] });
                        setHouseholds(Storage.get("HOUSEHOLDS"));
                    }, randomTime * 1000);
                }

                setHouseholds(Storage.get("HOUSEHOLDS"));
                setCreateHouseholdInput("");
                disableHouseholdModal("create");

                break;
            default:
        }
    }

    function joinButtonClicked() {
        if(joinHouseholdInput.length < 16) return;

        const code = joinHouseholdInput;
        
        setJoinHouseholdInput("");
        setIsHouseholdModalLoading(true);

        const loadingTime = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

        setTimeout(() => {
            setIsHouseholdModalLoading(false);
            
            setTimeout(() => {
                if(code[0].toLowerCase() !== "a") return joinHouseholdInputRef.current.style.border = "3px solid red";
                setIsNewHouseholdModalActive(true);
            }, 1);
        }, loadingTime * 1000);
    }

    function scanButtonClicked() {
        setIsHouseholdModalLoading(true);

        const loadingTime = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

        setTimeout(() => {
            setIsHouseholdModalLoading(false);
            setTimeout(() => setIsNewHouseholdModalActive(true), 1);
        }, loadingTime * 1000);
    }

    return(
        <>
            {width > 1024 ? <MobileInfo /> : <div className="home">
                {info ? <InfoModal info={info} setInfo={setInfo} infoModalRef={infoModalRef} /> : <></>}
                
                {isNewHouseholdModalActive ? <NewHouseholdModal
                    newHouseholdModalRef={newHouseholdModalRef}
                    disableNewHouseholdModal={disableNewHouseholdModal}
                /> : <></>}
                
                <h1 className="floating-title">WasteNot</h1>

                <div className="household-holder">
                    {!households.length ? <span>There are no households.</span> : households.map((household, index) => {
                        return <HouseholdButton
                            key={index}
                            index={index}
                            household={household}
                            onClick={() => navigate("/household", { state: { household: household } })}
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
                : householdModals.join ? <HouseholdModal type="join" householdModalRef={householdModalRef} disableHouseholdModal={disableHouseholdModal} joinButtonClicked={joinButtonClicked} joinHouseholdInput={joinHouseholdInput} setJoinHouseholdInput={setJoinHouseholdInput} joinHouseholdInputRef={joinHouseholdInputRef} isHouseholdModalLoading={isHouseholdModalLoading} />
                : householdModals.scan ? <HouseholdModal type="scan" householdModalRef={householdModalRef} disableHouseholdModal={disableHouseholdModal} scanButtonClicked={scanButtonClicked} isHouseholdModalLoading={isHouseholdModalLoading} /> : <></>}
            </div>}
        </>
    );
}

export default Home;