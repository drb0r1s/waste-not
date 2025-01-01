import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../data/images";
import { householdNames } from "../../data/householdNames";
import { articles } from "../../data/articles";
import { Storage } from "../../functions/Storage";
import { ExtendedDate } from "../../functions/ExtendedDate";

const NewHouseholdModal = ({ newHouseholdModalRef, disableNewHouseholdModal }) => {
    const [householdName, setHouseholdName] = useState("");
    const [members, setMembers] = useState([]);
    const [owner, setOwner] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const newMembers = Storage.selectRandom("USERS", [2, 8]);
        const newOwner = newMembers[Math.floor(Math.random() * newMembers.length)];
        
        setHouseholdName(getHouseholdName(newOwner));
        setMembers(newMembers);
        setOwner(newOwner);
    }, []);

    function getHouseholdName(owner) {
        const randomHouseholdName = householdNames[Math.floor(Math.random() * householdNames.length)];
        const ownerLastname = owner.name.split(" ")[1];

        const householdName = randomHouseholdName.replace("<lastname>", ownerLastname);
        return householdName;
    }

    function joinHousehold() {
        const memberIds = getMemberIds();
        
        const household = {
            name: householdName,
            icon: "",
            members: [Storage.get("PROFILE").id, ...memberIds],
            owner: owner.id
        };

        Storage.add("HOUSEHOLDS", household);

        const newArticles = getArticles();
        const householdId = parseInt(localStorage.getItem("WASTENOT_HOUSEHOLDS_NEXT_ID")) - 1;

        for(let i = 0; i < newArticles.length; i++) Storage.add("ARTICLES", {
            householdId,
            name: newArticles[i].name,
            icon: newArticles[i].icon,
            expirationDate: ExtendedDate.getRandom("2025-01-01", "2025-04-01"),
            tag: newArticles[i].tag,
            amount: Math.floor(Math.random() * (20 - 1 + 1)) + 1,
            lastUsed: ExtendedDate.getRandom("2024-06-01", "2024-12-30")
        });

        const newListArticles = getArticles();
        
        for(let i = 0; i < newListArticles.length; i++) Storage.add("LIST_ARTICLES", {
            householdId,
            name: newListArticles[i].name,
            icon: newListArticles[i].icon,
            date: ExtendedDate.getRandom("2024-12-01", "2024-12-30"),
            isMarked: false,
            addedBy: members[Math.floor(Math.random() * members.length)].id
        });
        
        disableNewHouseholdModal();
        navigate("/household", { state: { household: {...household, id: householdId} } });
    }

    function getMemberIds() {
        const memberIds = [];
        for(let i = 0; i < members.length; i++) memberIds.push(members[i].id);

        return memberIds;
    }

    function getArticles() {
        const newArticles = [];

        const amount = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

        for(let i = 0; i < amount; i++) newArticles.push(getArticle());

        return newArticles;

        function getArticle() {
            const randomArticle = articles[Math.floor(Math.random() * articles.length)];
            let exists = false;

            for(let i = 0; i < newArticles.length; i++) {
                if(newArticles[i].name === randomArticle.name) exists = true;
            }

            if(exists) return getArticle();
            return randomArticle;
        }
    }
    
    return(
        <div className="new-household-modal" ref={newHouseholdModalRef}>
            <img
                src={images.returnIcon}
                alt="RETURN"
                className="new-household-modal-return"
                onClick={disableNewHouseholdModal}
            />

            <div className="new-household-modal-title-holder">
                <h2>{householdName}</h2>
                <button onClick={joinHousehold}>join</button>
            </div>

            <div className="new-household-modal-member-holder">
                {members.map((member, index) => {
                    return <div key={index} className="new-household-modal-member">
                        {member.id === owner.id ? <img
                            src={images.starIcon}
                            alt="STAR"
                            className="new-household-modal-member-star"
                        /> : <></>}
                        
                        <img src={member.icon ? member.icon : images.noAvatarIcon} alt="AVATAR" />
                        <p>{member.nickname ? member.nickname : member.name}</p>
                    </div>;
                })}
            </div>
        </div>
    );
}

export default NewHouseholdModal;