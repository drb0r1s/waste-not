import React from "react";
import HouseholdArticleModal from "./householdArticleModal/Index";
import HouseholdCreateArticleModal from "./HouseholdCreateArticleModal";
import HouseholdMembersModal from "./householdMembersModal/Index";
import HouseholdListModal from "./householdListModal/Index";
import HouseholdNotificationsModal from "./HouseholdNotificationsModal";
import HouseholdSettingsModal from "./HouseholdSettingsModal";

const HouseholdModal = ({
    type, household, householdModalRef,
    disableHouseholdModal, activeArticle, disableHouseholdArticleModal,
    enableHouseholdMemberModal, isList
}) => {
    return(
        <div className={`household-modal household-${type}-modal`} ref={householdModalRef}>
            {type === "article" ? <HouseholdArticleModal activeArticle={activeArticle} disableHouseholdArticleModal={disableHouseholdArticleModal} />
            : type === "create-article" ? <HouseholdCreateArticleModal household={household} disableHouseholdModal={disableHouseholdModal} isList={isList} />
            : type === "members" ? <HouseholdMembersModal household={household} disableHouseholdModal={disableHouseholdModal} enableHouseholdMemberModal={enableHouseholdMemberModal} />
            : type === "list" ? <HouseholdListModal household={household} disableHouseholdModal={disableHouseholdModal} />
            : type === "notifications" ? <HouseholdNotificationsModal disableHouseholdModal={disableHouseholdModal} />
            : type === "settings" ? <HouseholdSettingsModal household={household} disableHouseholdModal={disableHouseholdModal} /> : <></>}
        </div>
    );
}

export default HouseholdModal;