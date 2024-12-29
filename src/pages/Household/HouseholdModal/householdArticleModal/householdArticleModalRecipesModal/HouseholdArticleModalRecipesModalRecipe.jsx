import React, { useState } from "react";
import HouseholdRating from "../../../../../components/HouseholdRating";
import { images } from "../../../../../data/images";

const HouseholdArticleModalRecipesModalRecipe = ({ recipe, onClick }) => {
    const [rating, setRating] = useState(0);
    
    return(
        <div className="household-article-modal-recipes-modal-recipe" onClick={() => onClick(recipe, rating)}>
            <img src={images.imageIcon} alt="RECIPE" className="household-article-modal-recipes-modal-recipe-image" />

            <div className="household-article-modal-recipes-modal-recipe-content-holder">
                <strong>{recipe.name}</strong>
                <p>{recipe.description}</p>
            
                <HouseholdRating rating={rating} setRating={setRating} />
            </div>
        </div>
    );
}

export default HouseholdArticleModalRecipesModalRecipe;