import React from "react";
import HouseholdHeader from "../../../components/HouseholdHeader";

const HouseholdNotificationsModal = ({ disableHouseholdModal }) => {
    return(
        <>
            <HouseholdHeader title="notifications" returnFunction={disableHouseholdModal} />
        
            <span>There are no notifications.</span>
        </>
    );
}

export default HouseholdNotificationsModal;