import React from "react";
import HouseholdCreateArticleModal from "./HouseholdCreateArticleModal";
import HouseholdMembersModal from "./householdMembersModal/Index";
import HouseholdSettingsModal from "./HouseholdSettingsModal";

const HouseholdModal = ({
    type, household, householdModalRef,
    disableHouseholdModal, enableHouseholdMemberModal
}) => {
    return(
        <div className={`household-modal household-${type}-modal`} ref={householdModalRef}>
            {type === "create-article" ? <HouseholdCreateArticleModal household={household} disableHouseholdModal={disableHouseholdModal} />
            : type === "members" ? <HouseholdMembersModal household={household} disableHouseholdModal={disableHouseholdModal} enableHouseholdMemberModal={enableHouseholdMemberModal} />
            : type === "settings" ? <HouseholdSettingsModal household={household} disableHouseholdModal={disableHouseholdModal} /> : <></>}
        </div>
    );
}

export default HouseholdModal;