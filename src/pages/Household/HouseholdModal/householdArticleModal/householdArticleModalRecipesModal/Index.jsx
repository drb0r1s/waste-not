import React, { useState, useEffect, useRef } from "react";
import HouseholdHeader from "../../../../../components/HouseholdHeader";
import HouseholdTagHolder from "../../../../../components/HouseholdTagHolder";
import HouseholdArticleModalRecipesModalRecipe from "./HouseholdArticleModalRecipesModalRecipe";
import HouseholdArticleModalRecipesModalRecipeModal from "./HouseholdArticleModalRecipesModalRecipeModal";
import { recipes } from "../../../../../data/recipes";

const HouseholdArticleModalRecipesModal = ({ recipesModalRef, disableModal }) => {
    const [chosenRecipes, setChosenRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [filter, setFilter] = useState("");
    const [activeRecipe, setActiveRecipe] = useState(false);
    const [activeRating, setActiveRating] = useState(false);

    const recipeModalRef = useRef(null);

    const tags = ["main dish", "dessert", "appetizer", "snack"];

    useEffect(getRandomRecipes, []);

    useEffect(() => {
        if(!filter && chosenRecipes.length != filteredRecipes.length && chosenRecipes.length) return setFilteredRecipes(chosenRecipes);
        else if(!chosenRecipes.length) return;

        const newRecipes = [];

        for(let i = 0; i < chosenRecipes.length; i++) {
            if(chosenRecipes[i].tag === filter) newRecipes.push(chosenRecipes[i]);
        }

        setFilteredRecipes(newRecipes);
    }, [filter]);

    function getRandomRecipes() {
        const randomRecipes = [];

        for(let i = 0; i < tags.length; i++) {
            const randomAmount = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            for(let j = 0; j < randomAmount; j++) randomRecipes.push(selectRecipe(tags[i]));
        }
        
        setChosenRecipes(randomRecipes);
        setFilteredRecipes(randomRecipes);

        function selectRecipe(tag) {
            const taggedRecipes = [];

            for(let i = 0; i < recipes.length; i++) {
                if(recipes[i].tag === tag) taggedRecipes.push(recipes[i]);
            }

            let randomTaggedRecipe = taggedRecipes[Math.floor(Math.random() * taggedRecipes.length)];
            let exists = false;

            for(let i = 0; i < randomRecipes.length; i++) {
                if(randomRecipes[i]?.name === randomTaggedRecipe.name) exists = true;
            }

            if(exists) return selectRecipe(tag);
            else return randomTaggedRecipe;
        }
    }

    function enableRecipeModal(recipe, rating) {
        setActiveRecipe(recipe);
        setActiveRating(rating);

        setTimeout(() => { recipeModalRef.current.id = "household-article-modal-recipes-modal-recipe-modal-active" }, 1);
    }

    function disableRecipeModal() {
        recipeModalRef.current.id = "";

        setTimeout(() => {
            setActiveRecipe(false);
            setActiveRating(false);
        }, 300);
    }
    
    return(
        <div className="household-article-modal-recipes-modal" ref={recipesModalRef}>
            {activeRecipe ? <HouseholdArticleModalRecipesModalRecipeModal
                activeRecipe={activeRecipe}
                activeRating={activeRating}
                recipeModalRef={recipeModalRef}
                disableRecipeModal={disableRecipeModal}
            /> : <></>}
            
            <HouseholdHeader
                title="recipes"
                returnFunction={disableModal}
                searchFunction={true}
            />

            <HouseholdTagHolder tags={tags} setFilter={setFilter} />

            <div className="household-article-modal-recipes-modal-recipes-holder">
                {filteredRecipes.map((recipe, index) => {
                    return <HouseholdArticleModalRecipesModalRecipe
                        key={index}
                        recipe={recipe}
                        onClick={enableRecipeModal}
                    />;
                })}
            </div>
        </div>
    );
}

export default HouseholdArticleModalRecipesModal;