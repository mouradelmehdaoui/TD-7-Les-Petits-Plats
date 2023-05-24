import { recipesFound } from './extractRecipes.js'
import { filtered } from './filtered.js';

export function searchMain(recipes, input, cardsContainer, lastSearchInput, callback) {
  let filteredRecipes = recipes; // Initialize filtered recipes with all recipes
  let enterValue = lastSearchInput; // Set enterValue to the last search input

  const myFunction = () => {
    enterValue = input.value.toLowerCase().trim();
    const tags = Array.from(document.querySelectorAll(".tags")).map(tag => tag.textContent.toLowerCase().trim());

    if (enterValue.length >= 2 || tags.length > 0) {
      filteredRecipes = recipes.filter((recipe) => {
        const nameMatch = recipe.name.toLowerCase().includes(enterValue);
        const descriptionMatch = recipe.description.toLowerCase().includes(enterValue);
        const ingredientMatches = recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(enterValue)
        );
        const tagMatches = tags.every(tag => {
          const ingredientMatches = recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(tag)
          );
          const applianceMatch = recipe.appliance.toLowerCase().includes(tag);
          const ustensilMatches = recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(tag)
          );
          return ingredientMatches || applianceMatch || ustensilMatches;
        });

        return (nameMatch || descriptionMatch || ingredientMatches) && tagMatches;
      });
    } else {
      filteredRecipes = recipes; // Reset filtered recipes to all recipes if no search input or tags
    }

    cardsContainer.innerHTML = new RecipesCard(filteredRecipes).createCards();
    filtered(filteredRecipes);
    recipesFound(filteredRecipes);

    callback(filteredRecipes, enterValue); // Pass filtered recipes and enterValue to the callback function
  };

  input.addEventListener("input", myFunction);
}







