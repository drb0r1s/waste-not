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

    const navigate = useNavigate();

    useEffect(() => {
        const [newMembers, owner] = setOwner(Storage.selectRandom("USERS", [1, 7]));
        
        setHouseholdName(getHouseholdName(owner));
        setMembers(newMembers);
    }, []);
    
    function setOwner(membersArray) {
        const randomMember = membersArray[Math.floor(Math.random() * membersArray.length)];
        const newMembers = [];

        for(let i = 0; i < membersArray.length; i++) {
            if(randomMember.name === membersArray[i].name) {
                newMembers.push({...randomMember, isOwner: true});
                continue;
            }

            newMembers.push(membersArray[i]);
        }

        return [newMembers, randomMember];
    }

    function getHouseholdName(owner) {
        const randomHouseholdName = householdNames[Math.floor(Math.random() * householdNames.length)];
        const ownerLastname = owner.name.split(" ")[1];

        const householdName = randomHouseholdName.replace("<lastname>", ownerLastname);
        return householdName;
    }

    function joinHousehold() {
        const household = {
            name: householdName,
            icon: "",
            members: [Storage.get("PROFILE"), ...members]
        };

        Storage.add("HOUSEHOLDS", household);

        const newArticles = getArticles();
        const householdId = parseInt(localStorage.getItem("HOUSEHOLDS_NEXT_ID")) - 1;

        for(let i = 0; i < newArticles.length; i++) Storage.add("ARTICLES", {
            householdId,
            name: newArticles[i].name,
            icon: newArticles[i].icon,
            expirationDate: ExtendedDate.getRandom("2025-01-01", "2027-01-01"),
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
            addedBy: members[Math.floor(Math.random() * members.length)]
        });
        
        disableNewHouseholdModal();
        navigate("/household", { state: { household: {...household, id: householdId} } });
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
                        {member.isOwner ? <img
                            src={images.starIcon}
                            alt="STAR"
                            className="new-household-modal-member-star"
                        /> : <></>}
                        
                        <img src={images.noAvatarIcon} alt="AVATAR" />
                        <p>{member.name}</p>
                    </div>;
                })}
            </div>
        </div>
    );
}

export default NewHouseholdModal;