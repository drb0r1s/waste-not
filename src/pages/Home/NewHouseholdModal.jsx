import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { images } from "../../data/images";
import { householdNames } from "../../data/householdNames";
import { articles } from "../../data/articles";
import { Storage } from "../../functions/Storage";
import { ExtendedDate } from "../../functions/ExtendedDate";

const NewHouseholdModal = ({ isNewHouseholdModalActive, newHouseholdModalRef, disableNewHouseholdModal }) => {
    const [householdName, setHouseholdName] = useState("");
    const [members, setMembers] = useState([]);
    const [owner, setOwner] = useState({});

    const navigate = useNavigate();
    const profile = Storage.get("PROFILE");

    useEffect(() => {
        const newMembers = Storage.selectRandom("USERS", [2, 8]);
        const newOwner = newMembers[Math.floor(Math.random() * newMembers.length)];
        
        if(typeof isNewHouseholdModalActive !== "boolean") {
            setHouseholdName(isNewHouseholdModalActive.name);

            const realMembers = [];

            for(let i = 0; i < isNewHouseholdModalActive.members.length; i++) {
                const [realMember] = Storage.get("USERS", { key: "id", value: isNewHouseholdModalActive.members[i] });
                realMembers.push(realMember);
            }

            setMembers(realMembers);

            const [realOwner] = Storage.get("USERS", { key: "id", value: isNewHouseholdModalActive.owner });
            setOwner(realOwner);
        }
        
        else {
            setHouseholdName(getHouseholdName(newOwner));
            setMembers(newMembers);
            setOwner(newOwner);
        }
    }, []);

    function getHouseholdName(owner) {
        const randomHouseholdName = householdNames[Math.floor(Math.random() * householdNames.length)];
        const ownerLastname = owner.name.split(" ")[1];

        const householdName = randomHouseholdName.replace("<lastname>", ownerLastname);
        return householdName;
    }

    function joinHousehold() {
        if(typeof isNewHouseholdModalActive !== "boolean") {
            const updatedHousehold = {...isNewHouseholdModalActive, members: [...isNewHouseholdModalActive.members, profile.id]};
                                
            Storage.gunUpdate("HOUSEHOLDS", isNewHouseholdModalActive.id, updatedHousehold);
            Storage.gunAddUser(profile);

            Storage.gunAdd("NOTIFICATIONS", {
                householdId: isNewHouseholdModalActive.id,
                type: "userJoined",
                userId: profile.id,
                date: ExtendedDate.defaultFormat()
            });

            disableNewHouseholdModal();
            navigate("/household", { state: { household: isNewHouseholdModalActive } });
        }

        else fakeJoin();
    }

    function fakeJoin() {
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

        Storage.add("NOTIFICATIONS", {
            householdId,
            type: "userJoined",
            userId: profile.id,
            date: ExtendedDate.defaultFormat()
        });

        for(let i = 0; i < newArticles.length; i++) Storage.add("ARTICLES", {
            householdId,
            name: newArticles[i].name,
            icon: newArticles[i].icon,
            expirationDate: ExtendedDate.getRandom("2025-01-01", "2025-03-01"),
            tag: newArticles[i].tag,
            amount: Math.floor(Math.random() * (20 - 1 + 1)) + 1,
            lastUsed: ExtendedDate.getRandom("2024-12-01", "2024-12-30")
        });

        for(let i = 0; i < newArticles.length; i++) Storage.add("NOTIFICATIONS", {
            householdId,
            type: "articleAdded",
            name: newArticles[i].name,
            icon: newArticles[i].icon,
            tag: newArticles[i].tag,
            date: ExtendedDate.getRandom("2024-11-01", "2024-11-30"),
            addedBy: members[Math.floor(Math.random() * members.length)].id
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

        for(let i = 0; i < newListArticles.length; i++) Storage.add("NOTIFICATIONS", {
            householdId,
            type: "listArticleAdded",
            name: newListArticles[i].name,
            icon: newListArticles[i].icon,
            date: ExtendedDate.getRandom("2024-11-01", "2024-11-30"),
            addedBy: members[Math.floor(Math.random() * members.length)].id,
        });

        const notifications = getNotifications(newArticles);

        for(let i = 0; i < notifications.length; i++) Storage.add("NOTIFICATIONS", {
            householdId,
            ...notifications[i]
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

    function getNotifications(newArticles) {
        const notifications = [];
        
        const types = [
            "articleRanOut", "articleUsed", "articleEdited", "articleRemoved",
            "listArticleRemoved", "listArticleMarked",
            "userJoined", "userLeft", "userRemoved"
        ];

        const amount = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

        for(let i = 0; i < amount; i++) {
            const randomType = types[Math.floor(Math.random() * types.length)];

            const includedArticle = getIncludedArticle();
            const excludedArticle = getExcludedArticle();

            const includedMember = getIncludedMember();
            const excludedMember = getExcludedMember();

            switch(randomType) {
                case "articleRanOut":
                    notifications.push({
                        type: randomType,
                        name: excludedArticle.name,
                        icon: excludedArticle.icon,
                        date: ExtendedDate.getRandom("2024-11-01", "2024-11-30")
                    });

                    break;
                case "articleUsed":
                    notifications.push({
                        type: randomType,
                        name: includedArticle.name,
                        icon: includedArticle.icon,
                        amount: includedArticle.amount,
                        date: ExtendedDate.getRandom("2024-11-01", "2024-11-30"),
                        usedBy: members[Math.floor(Math.random() * members.length)].id
                    });

                    break;
                case "articleEdited":
                    notifications.push({
                        type: randomType,
                        name: includedArticle.name,
                        icon: includedArticle.icon,
                        date: ExtendedDate.getRandom("2024-11-01", "2024-11-30"),
                        editedBy: members[Math.floor(Math.random() * members.length)].id
                    });

                    break;
                case "articleRemoved":
                    notifications.push({
                        type: randomType,
                        name: excludedArticle.name,
                        icon: excludedArticle.icon,
                        date: ExtendedDate.getRandom("2024-11-01", "2024-11-30"),
                        removedBy: members[Math.floor(Math.random() * members.length)].id
                    });

                    break;
                case "listArticleRemoved":
                    notifications.push({
                        type: randomType,
                        name: excludedArticle.name,
                        icon: excludedArticle.icon,
                        date: ExtendedDate.getRandom("2024-11-01", "2024-11-30"),
                        removedBy: members[Math.floor(Math.random() * members.length)].id
                    });

                    break;
                case "userJoined":
                    notifications.push({
                        type: randomType,
                        userId: includedMember.id,
                        date: ExtendedDate.getRandom("2024-11-01", "2024-11-30")
                    });

                    break;
                case "userLeft":
                case "userRemoved":
                    notifications.push({
                        type: randomType,
                        userId: excludedMember.id,
                        date: ExtendedDate.getRandom("2024-11-01", "2024-11-30")
                    });

                    break;
                default:
            }
        }

        return notifications;

        function getIncludedArticle() {
            const article = newArticles[Math.floor(Math.random() * newArticles.length)];
            return article;
        }
        
        function getExcludedArticle() {
            const article = articles[Math.floor(Math.random() * articles.length)];
            let exists = false;

            for(let i = 0; i < newArticles.length; i++) {
                if(newArticles[i].name === article.name) exists = true;
            }

            if(exists) return getExcludedArticle();
            return article;
        }

        function getIncludedMember() {
            const member = members[Math.floor(Math.random() * members.length)];
            return member;
        }

        function getExcludedMember() {
            const users = Storage.get("USERS");
            const randomUser = users[Math.floor(Math.random() * users.length)];

            let exists = false;

            for(let i = 0; i < members.length; i++) {
                if(members[i].id === randomUser.id) exists = true;
            }

            if(exists) return getExcludedMember();
            return randomUser;
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
                        
                        <Avatar member={member} />
                        <p>{member.nickname ? member.nickname : member.name}</p>
                    </div>;
                })}
            </div>
        </div>
    );
}

export default NewHouseholdModal;