import React, { useState, useEffect } from "react";
import { images } from "../../../../data/images";
import { Storage } from "../../../../functions/Storage";
import { ExtendedDate } from "../../../../functions/ExtendedDate";

const HouseholdNotificationsModalNotification = ({ notification }) => {
    const [notificationIcon, setNotificationIcon] = useState("");
    const [notificationContent, setNotificationContent] = useState("");

    useEffect(() => {
        switch(notification.type) {
            case "userJoined":
                const [user] = Storage.get("USERS", { key: "id", value: notification.userId });

                setNotificationIcon(user.icon ? user.icon : images.noAvatarIcon);
                setNotificationContent(`${user.nickname ? user.nickname : user.name} has joined.`);
                break;
            case "articleAdded":
            case "listArticleAdded":
                const [addedBy] = Storage.get("USERS", { key: "id", value: notification.addedBy });

                setNotificationIcon(notification.icon ? notification.icon : images.articleIcon);
                setNotificationContent(`${notification.name} has been added to ${notification.type === "articleAdded" ? notification.tag : "shopping list"} by ${addedBy.nickname ? addedBy.nickname : addedBy.name}.`);
                break;
            default:
        }
    }, []);
    
    return(
        <div className="household-notifications-modal-notification">
            <img src={notificationIcon ? notificationIcon : images.imageIcon} alt="NOTIFICATION" />
            
            <div className="household-notifications-modal-notification-content-holder">
                <p>{notificationContent}</p>
                <span>{ExtendedDate.format(notification.date)}</span>
            </div>
        </div>
    );
}

export default HouseholdNotificationsModalNotification;