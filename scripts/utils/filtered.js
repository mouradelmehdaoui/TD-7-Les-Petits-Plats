import { extractRecipes } from './extractRecipes.js'

const generateDropdownHTML = (filteredItems, dropdownType) => {
  let dropdownHTML = "";
  filteredItems.forEach(item => {
    dropdownHTML += `<li class="dropdown-item-${dropdownType}">${item}</li>`;
  });
  return dropdownHTML;
};

const updateDropdownContent = (filteredItems, dropdownType) => {
  const dropdownContent = document.querySelector(`.dropdown-option-${dropdownType}`);
  const dropdownHTML = generateDropdownHTML(filteredItems, dropdownType);
  dropdownContent.innerHTML = dropdownHTML;
  return filteredItems;
};

export const generateDropdownContent = (array, dropdownType, values) => {
  const { ingredients, appliances, ustensils } = extractRecipes(array);

  let enterValue = '';
  if (Array.isArray(values)) {
    enterValue = values.join(", ");
  } else {
    enterValue = values;
  }

  switch (dropdownType) {
    case 'ingredients':
      const filteredIngredients = ingredients.filter(value => value.toLowerCase().includes(enterValue));
      return updateDropdownContent(filteredIngredients, dropdownType);
    case 'appareils':
      const filteredAppliances = appliances.filter(value => value.toLowerCase().includes(enterValue));
      return updateDropdownContent(filteredAppliances, dropdownType);
    case 'ustensiles':
      const filteredUstensils = ustensils.filter(value => value.toLowerCase().includes(enterValue));
      return updateDropdownContent(filteredUstensils, dropdownType);
    default:
      return []; // or return null;
  }
};



export const generateDropdownItems = (array, dropdownType, enterValue) => {
  const filteredItems = array.filter(value => value.toLowerCase().includes(enterValue));
  return updateDropdownContent(filteredItems, dropdownType);
};

export const generateRecipesItems = (recipes, tags, cardsContainer) => {

  if (Array.isArray(tags)) {

    let filteredRecipes = recipes; // Initialize filtered recipes with all recipes

    tags.forEach(valueClicked => {
      if (valueClicked) {
        filteredRecipes = filteredRecipes.filter((recipe) => {
          const ingredientMatches = recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(valueClicked)
          );
          const applianceMatches = recipe.appliance.toLowerCase().includes(valueClicked);
          const ustensilsMatches = recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(valueClicked)
          );
          return ingredientMatches || ustensilsMatches || applianceMatches;
        });
        cardsContainer.innerHTML = new RecipesCard(filteredRecipes).createCards();
      }

    })
    return filteredRecipes;
  }
}


export const filtered = (recipes) => {

  const { ingredients, ustensils, appliances } = extractRecipes(recipes);
  const categories = ['ingredients', 'appareils', 'ustensiles'];

  let filteredItems = [];

  categories.forEach(category => {
    let dropdownContent = document.querySelector(`.dropdown-option-${category}`);
    const generateDropdownHTML = (filteredItems) => {
      let dropdownHTML = "";
      filteredItems.forEach(item => {
        dropdownHTML += `<li class="dropdown-item-${category}">${item}</li>`;
      });
      return dropdownHTML;
    }

    if (category === 'ingredients') {
      filteredItems = ingredients.filter(value => value);

    } else if (category === 'appareils') {
      filteredItems = appliances.filter(value => value);

    } else if (category === 'ustensiles') {
      filteredItems = ustensils.filter(value => value);

    }
    dropdownContent.innerHTML = generateDropdownHTML(filteredItems);

  });

  return filteredItems

}






