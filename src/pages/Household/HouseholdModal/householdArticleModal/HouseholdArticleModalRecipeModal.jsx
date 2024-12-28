import React from "react";
import HouseholdHeader from "../../../../components/HouseholdHeader";

const HouseholdArticleModalRecipeModal = ({ recipesModalRef, disableModal }) => {
    return(
        <div className="household-article-modal-recipe-modal" ref={recipesModalRef}>
            <HouseholdHeader
                title="recipes"
                returnFunction={disableModal}
                searchFunction={true}
            />
        </div>
    );
}

export default HouseholdArticleModalRecipeModal;