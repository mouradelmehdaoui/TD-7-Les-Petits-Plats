import {extractRecipes} from './extractRecipes.js'
import {extractDropdownType} from './tagElement.js'




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

  console.log(dropdownType);
  let enterValue = '';
  if(Array.isArray(values)) {
    enterValue  = values.join(", ");
  } else {
    enterValue = values;
  }

  console.log(enterValue);

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
    if(valueClicked){
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









// export const generateDropdownContent = (array, dropdownType, enterValue) => {
//   const { ingredients, appliances, ustensils } = categoryRecipe(array);
//   const dropdownContent = document.querySelector(`.dropdown-option-${dropdownType}`);

//   const generateDropdownHTML = (filteredItems) => {
//     let dropdownHTML = "";
//     filteredItems.forEach(item => {
//       dropdownHTML += `<li class="dropdown-item-${dropdownType}">${item}</li>`;
//     });
//     return dropdownHTML;
//   };

//   switch (dropdownType) {
//     case 'ingredients':
//       const filteredIngredients = ingredients.filter(value => value.toLowerCase().includes(enterValue));
//       dropdownContent.innerHTML = generateDropdownHTML(filteredIngredients);
//       return filteredIngredients;
//     case 'appareils':
//       const filteredAppliances = appliances.filter(value => value.toLowerCase().includes(enterValue));
//       dropdownContent.innerHTML = generateDropdownHTML(filteredAppliances);
//       return filteredAppliances;
//     case 'ustensiles':
//       const filteredUstensils = ustensils.filter(value => value.toLowerCase().includes(enterValue));
//       dropdownContent.innerHTML = generateDropdownHTML(filteredUstensils);
//       return filteredUstensils;
//     default:
//       return []; // or return null;
//   }
// };


// export const generateDropdownItems = (array, dropdownType, enterValue) => {

//   const dropdownContent = document.querySelector(`.dropdown-option-${dropdownType}`);
//   const generateDropdownHTML = (filteredItems) => {
//     let dropdownHTML = "";
//     filteredItems.forEach(item => {
//       dropdownHTML += `<li class="dropdown-item-${dropdownType}">${item}</li>`;
//     });
//     return dropdownHTML;
//   };

//   switch (dropdownType) {
//     case 'ingredients':
//       const filteredIngredients = array.filter(value => value.toLowerCase().includes(enterValue));
//       dropdownContent.innerHTML = generateDropdownHTML(filteredIngredients);
//       return filteredIngredients;
//     case 'appareils':
//       const filteredAppliances = array.filter(value => value.toLowerCase().includes(enterValue));
//       dropdownContent.innerHTML = generateDropdownHTML(filteredAppliances);
//       return filteredAppliances;
//     case 'ustensiles':
//       const filteredUstensils = array.filter(value => value.toLowerCase().includes(enterValue));
//       dropdownContent.innerHTML = generateDropdownHTML(filteredUstensils);
//       return filteredUstensils;
//     default:
//       return []; // or return null;
//   }
// };

// const cardsContainer = document.querySelector(".recipes-container");
// const handleDropdownChange = (event) => {
//     const dropdownType = extractDropdownType(event.target);
//     const enterValue = event.target.value.toLowerCase();
//     RecipesService.handleDropdownSelection(dropdownType,enterValue, recipes)
// };
// const tags = (e) => {

//     const liTag = e.target.closest("LI");
//     if (!liTag) return;

//     const valueClicked = liTag.innerHTML.toLowerCase();
//     const tagContainer = document.getElementById("tags-container");

//     const createTagElement = (value) => {
//         const tagElement = document.createElement("div");
//         tagElement.classList.add("tags-item");
//         tagElement.innerHTML = `
//         <p id="tags-value">${value}</p>
//         <div><i class="fa-regular fa-circle-xmark tags-closed"></i></div>
//       `;
//         return tagElement;
//     };

//     const tagValue = valueClicked;
//     const tagElement = createTagElement(tagValue);
//     tagContainer.appendChild(tagElement);
//     const tagClosed = tagElement.querySelector(".tags-closed");

//     const colors = {
//         ingredients: '#3282F7',
//         appareils: '#68D9A4',
//         ustensiles: '#ED6454'
//     };

//     const dropdownType = extractDropdownType(e.target);


//     if (dropdownType in colors) {
//         tagElement.style.backgroundColor = colors[dropdownType];
//     }

//     //const recipesOrfilteredRecipes = counterTag === 0 ? recipes : filteredRecipes

//     const filteredRecipes = recipes.filter((recipe) => {
//         const ingredientMatches = recipe.ingredients.some((ingredient) =>
//             ingredient.ingredient.toLowerCase().includes(valueClicked)
//         );
//         const appliancestMatches = recipe.appliance.toLowerCase().includes(valueClicked);

//         const ustensilstMatches = recipe.ustensils.some((ustensil) =>
//             ustensil.toLowerCase().includes(valueClicked)
//         );
//         return ingredientMatches || ustensilstMatches || appliancestMatches;
      
//     });

//     cardsContainer.innerHTML = new RecipesCard(filteredRecipes).createCards();

//     tagClosed.addEventListener("click", () => {
        
//         tagElement.remove();
//         cardsContainer.innerHTML = new RecipesCard(filteredRecipes).createCards();

//     });
    

// };

// document.addEventListener("input", handleDropdownChange);
// document.addEventListener("click", tags);


// const extractDropdownType = (element) => {
//     const dropdownClass = element.classList.value;
//     return dropdownClass.split('-')[2];
// };
