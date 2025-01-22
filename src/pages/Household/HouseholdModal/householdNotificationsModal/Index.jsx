import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import HouseholdHeader from "../../../../components/HouseholdHeader";
import HouseholdNotificationsModalNotification from "./HouseholdNotificationsModalNotification";
import { Storage } from "../../../../functions/Storage";

const HouseholdNotificationsModal = ({ disableHouseholdModal }) => {
    const location = useLocation();
    const storageFilter = { key: "householdId", value: location.state.household.id };
        
    const [notifications, setNotifications] = useState(Storage.get("NOTIFICATIONS", storageFilter));
    
    useEffect(() => setNotifications(Storage.get("NOTIFICATIONS", storageFilter)), [localStorage.getItem("WASTENOT_NOTIFICATIONS")]);
    
    return(
        <>
            <div className="household-notifications-modal-content-holder">
                <HouseholdHeader title="notifications" returnFunction={disableHouseholdModal} />
        
                <div className="household-notifications-modal-notification-holder">
                    {notifications.length ? notifications.reverse().map((notification, index) => {
                        return <HouseholdNotificationsModalNotification
                            key={index}    
                            notification={notification}
                        />
                    }) : <span className="no-span">There are no notifications.</span>}
                </div>
            </div>
        </>
    );
}

export default HouseholdNotificationsModal;