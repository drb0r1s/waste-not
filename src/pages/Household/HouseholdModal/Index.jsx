import React from "react";
import HouseholdCreateArticleModal from "./HouseholdCreateArticleModal";
import HouseholdMembersModal from "./HouseholdMembersModal/Index";

const HouseholdModal = ({
    type, household, householdModalRef,
    disableHouseholdModal
}) => {
    return(
        <div className={`household-modal household-${type}-modal`} ref={householdModalRef}>
            {type === "create-article" ? <HouseholdCreateArticleModal household={household} disableHouseholdModal={disableHouseholdModal} />
            : type === "members" ? <HouseholdMembersModal household={household} disableHouseholdModal={disableHouseholdModal} /> : <></>}
        </div>
    );
}

export default HouseholdModal;