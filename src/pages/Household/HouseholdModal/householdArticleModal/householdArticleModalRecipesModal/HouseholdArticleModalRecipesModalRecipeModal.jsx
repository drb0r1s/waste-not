import React from "react";
import HouseholdRating from "../../../../../components/HouseholdRating";
import { images } from "../../../../../data/images";

const HouseholdArticleModalRecipesModalRecipeModal = ({ activeRecipe, activeRating, recipeModalRef, disableRecipeModal }) => {
    return(
        <div className="household-article-modal-recipes-modal-recipe-modal" ref={recipeModalRef}>
            <img
                src={images.returnIcon}
                alt="RETURN"
                className="household-article-modal-recipes-modal-recipe-modal-return"
                onClick={disableRecipeModal}
            />

            <div className="household-article-modal-recipes-modal-recipe-modal-background"></div>

            <div className="household-article-modal-recipes-modal-recipe-modal-content-holder">
                <h2>{activeRecipe.name}</h2>
                <HouseholdRating rating={activeRating} />

                <p>{activeRecipe.description}</p>

                <div className="household-article-modal-recipes-modal-recipe-modal-ingredients-holder">
                    <strong>ingredients:</strong>

                    <ul>
                        {activeRecipe.ingredients.map((ingredient, index) => {
                            return <li key={index}>{ingredient}</li>;
                        })}
                    </ul>
                </div>

                <p>{activeRecipe.fullDescription}</p>
                
            </div>
        </div>
    );
}

export default HouseholdArticleModalRecipesModalRecipeModal;