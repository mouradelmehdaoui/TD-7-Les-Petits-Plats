import { recipesFound } from './extractRecipes.js'
import { createTag } from './tagElement.js'
import { extractRecipes } from './extractRecipes.js';


export function searchMain(recipes, input, cardsContainer) {

  const myFunction = (e) => {
    const enterValue = e.target.value.toLowerCase()
    if (enterValue.length >= 2) {
      const filteredRecipes = recipes.filter((recipe) => {
        const nameMatch = recipe.name.toLowerCase().includes(enterValue);
        const descriptionMatch = recipe.description.toLowerCase().includes(enterValue);
        const ingredientMatches =
          recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(enterValue));
        return nameMatch || descriptionMatch || ingredientMatches;
      });
      cardsContainer.innerHTML = new RecipesCard(filteredRecipes).createCards();
      filtered(filteredRecipes);
    } else {
      filtered(recipes)
    }
  }
  input.addEventListener("input", myFunction);
}

const filtered = (recipes) => {

  const { ingredients, ustensils, appliances } = extractRecipes(recipes);
  const categories = ['ingredients', 'appareils', 'ustensiles'];

  categories.forEach(category => {
    let dropdownContent = document.querySelector(`.dropdown-option-${category}`);
    const generateDropdownHTML = (filteredItems) => {
      let dropdownHTML = "";
      filteredItems.forEach(item => {
        dropdownHTML += `<li class="dropdown-item-${category}">${item}</li>`;
      });
      return dropdownHTML;
    }

    let filteredItems = [];

    if (category === 'ingredients') {
      filteredItems = ingredients.filter(value => value);
    } else if (category === 'appareils') {
      filteredItems = appliances.filter(value => value);
    } else if (category === 'ustensiles') {
      filteredItems = ustensils.filter(value => value);
    }
    dropdownContent.innerHTML = generateDropdownHTML(filteredItems);
  });

}




