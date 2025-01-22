import React from "react";
import HouseholdArticleModal from "./householdArticleModal/Index";
import HouseholdCreateArticleModal from "./householdCreateArticleModal/Index";
import HouseholdMembersModal from "./householdMembersModal/Index";
import HouseholdListModal from "./householdListModal/Index";
import HouseholdNotificationsModal from "./householdNotificationsModal/Index";
import HouseholdSettingsModal from "./HouseholdSettingsModal";

const HouseholdModal = ({
    type, household, householdModalRef,
    disableHouseholdModal, activeArticle, disableHouseholdArticleModal,
    enableHouseholdMemberModal, isList, setInfo
}) => {
    return(
        <div className={`household-modal household-${type}-modal`} ref={householdModalRef}>
            {type === "article" ? <HouseholdArticleModal household={household} activeArticle={activeArticle} disableHouseholdArticleModal={disableHouseholdArticleModal} setInfo={setInfo} />
            : type === "create-article" ? <HouseholdCreateArticleModal household={household} disableHouseholdModal={disableHouseholdModal} isList={isList} />
            : type === "members" ? <HouseholdMembersModal household={household} disableHouseholdModal={disableHouseholdModal} enableHouseholdMemberModal={enableHouseholdMemberModal} />
            : type === "list" ? <HouseholdListModal household={household} disableHouseholdModal={disableHouseholdModal} setInfo={setInfo} />
            : type === "notifications" ? <HouseholdNotificationsModal disableHouseholdModal={disableHouseholdModal} />
            : type === "settings" ? <HouseholdSettingsModal household={household} disableHouseholdModal={disableHouseholdModal} /> : <></>}
        </div>
    );
}

export default HouseholdModal;