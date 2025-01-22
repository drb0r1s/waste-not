import React, { useState, useEffect } from "react";
import { images } from "../../../../data/images";
import { Storage } from "../../../../functions/Storage";
import { ExtendedDate } from "../../../../functions/ExtendedDate";
import { getUserIcon } from "../../../../functions/getUserIcon";

const HouseholdNotificationsModalNotification = ({ notification }) => {
    const [notificationIcon, setNotificationIcon] = useState("");
    const [notificationContent, setNotificationContent] = useState("");

    useEffect(() => {
        switch(notification.type) {
            case "userJoined":
            case "userLeft":
            case "userRemoved":
                const [user] = Storage.get("USERS", { key: "id", value: notification.userId });

                setNotificationIcon(getUserIcon(user));
                setNotificationContent(`<strong>${user.nickname ? user.nickname : user.name}</strong> has ${notification.type === "userJoined" ? "joined" : notification.type === "userLeft" ? "left" : "been removed by the owner"}.`);
                break;
            case "articleAdded":
            case "listArticleAdded":
                const [addedBy] = Storage.get("USERS", { key: "id", value: notification.addedBy });

                setNotificationIcon(notification.icon ? notification.icon : images.articleIcon);
                setNotificationContent(`<strong>${notification.name}</strong> has been added to <strong>${notification.type === "articleAdded" ? notification.tag : "the shopping list"}</strong> by <strong>${addedBy.nickname ? addedBy.nickname : addedBy.name}</strong>.`);
                break;
            case "articleRanOut":
                setNotificationIcon(notification.icon ? notification.icon : images.articleIcon);
                setNotificationContent(`Household has ran out of <strong>${notification.name}</strong>.`);

                break;
            case "articleUsed":
                const [usedBy] = Storage.get("USERS", { key: "id", value: notification.usedBy });

                setNotificationIcon(notification.icon ? notification.icon : images.articleIcon);
                setNotificationContent(`<strong>${notification.name}</strong> has been used by <strong>${usedBy.nickname ? usedBy.nickname : usedBy.name}</strong>.`);
                break;
            case "articleEdited":
                const [editedBy] = Storage.get("USERS", { key: "id", value: notification.editedBy });

                setNotificationIcon(notification.icon ? notification.icon : images.articleIcon);
                setNotificationContent(`<strong>${notification.name}</strong> has been edited by <strong>${editedBy.nickname ? editedBy.nickname : editedBy.name}</strong>.`);
                break;
            case "articleRemoved":
            case "listArticleRemoved":
                const [removedBy] = Storage.get("USERS", { key: "id", value: notification.removedBy });
    
                setNotificationIcon(notification.icon ? notification.icon : images.articleIcon);
                setNotificationContent(`<strong>${notification.name}</strong> has been removed${notification.type === "listArticleRemoved" ? " from the shopping list" : ""} by <strong>${removedBy.nickname ? removedBy.nickname : removedBy.name}</strong>.`);
                break;
            default:
        }
    }, []);
    
    return(
        <div className="household-notifications-modal-notification">
            <img src={notificationIcon ? notificationIcon : images.imageIcon} alt="NOTIFICATION" />
            
            <div className="household-notifications-modal-notification-content-holder">
                <p dangerouslySetInnerHTML={{ __html: notificationContent }}></p>
                <span>{ExtendedDate.format(notification.date)}</span>
            </div>
        </div>
    );
}

export default HouseholdNotificationsModalNotification;