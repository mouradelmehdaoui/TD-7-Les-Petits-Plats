import { recipesFound } from './extractRecipes.js'
import { createTag } from './tagElement.js'
import { extractRecipes } from './extractRecipes.js';


export function searchMain(recipes, input, cardsContainer) {

  // const myFunction = (e) => {
  //   let filteredRecipes = recipes;
  //   const enterValue = e.target.value.toLowerCase()
  //   if (enterValue.length >= 2) {
  //     filteredRecipes = filteredRecipes.filter((recipe) => {
  //       const nameMatch = recipe.name.toLowerCase().includes(enterValue);
  //       const descriptionMatch = recipe.description.toLowerCase().includes(enterValue);
  //       const ingredientMatches =
  //         recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(enterValue));
  //       return nameMatch || descriptionMatch || ingredientMatches;
  //     });
  //     cardsContainer.innerHTML = new RecipesCard(filteredRecipes).createCards();
  //     filtered(filteredRecipes);
  
      
  //     return filteredRecipes
  //   } else {
  //     filtered(recipes)
  //     return filteredRecipes
  //   }
  // }
  // input.addEventListener("input", myFunction);
}






