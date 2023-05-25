import { generateRecipesItems } from './filtered.js';
import { filtered } from './filtered.js';
import { recipesFound } from './extractRecipes.js'

let tagsClicked = [];

let arrayOfItemsFilteredByUser = [];
let arrayOfRecipesOrFiltered = [];

export const createTag = (e, arrayOfRecipes, _cardsContainer, input) => {
    // récupération valeur cliquer pour le tag
    const liTag = e.target.closest("LI");
    if (!liTag) return;

    // création du tag dans le DOM
    const valueClicked = liTag.innerHTML.toLowerCase();

    if (valueClicked) {
        const found = tagsClicked.indexOf(valueClicked)
        if (found != -1) {
            return
        } else {
            // add tag clicked and dropdown type in array
            tagsClicked.push(valueClicked);
        }
    }

    const tagContainer = document.getElementById("tags-container");

    const tagElement = createTagElement(valueClicked);
    tagContainer.appendChild(tagElement);
    // extraction du category recette du dropdown 
    const dropdownType = extractDropdownType(e.target);

    // ajouter la couleur du tag dans le DOM
    applyColorToTagElement(tagElement, dropdownType);


    arrayOfItemsFilteredByUser = generateRecipesItems(arrayOfRecipes, tagsClicked, _cardsContainer);
    recipesFound(arrayOfItemsFilteredByUser )
    
    arrayOfRecipesOrFiltered = filtered(arrayOfItemsFilteredByUser);

    // Supprimer tag after clicked
    const tagClosed = tagElement.querySelector(".tags-closed");
    tagClosed.addEventListener("click", () => {

        tagElement.remove();
        const index = tagsClicked.indexOf(valueClicked);
        if (index !== -1) {
            tagsClicked.splice(index, 1);
            arrayOfItemsFilteredByUser = generateRecipesItems(arrayOfRecipes, tagsClicked, _cardsContainer)
            recipesFound(arrayOfItemsFilteredByUser)

            if (dropdownType != null) {
                filtered(arrayOfItemsFilteredByUser);
            }
            if (tagsClicked.length === 0) { 
                if(input.value){

                   const filteredRecipes = arrayOfRecipes.filter((recipe) => {
                        const nameMatch = recipe.name.toLowerCase().includes(input.value);
                        const descriptionMatch = recipe.description.toLowerCase().includes(input.value);
                        const ingredientMatches =
                          recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(input.value));
                        return nameMatch || descriptionMatch || ingredientMatches;
                      });
                
                      _cardsContainer.innerHTML = new RecipesCard(filteredRecipes).createCards();
                     
                      filtered(filteredRecipes)
                      recipesFound(filteredRecipes)
                }else  {
                    _cardsContainer.innerHTML = new RecipesCard(arrayOfRecipes).createCards();
                    recipesFound(arrayOfRecipes)
                }
               
            } 
        }
    });
    return arrayOfItemsFilteredByUser;
};


export const applyColorToTagElement = (tagElement, dropdownType) => {
    const colors = {
        ingredients: '#3282F7',
        appareils: '#68D9A4',
        ustensiles: '#ED6454'
    };

    if (dropdownType in colors) {
        tagElement.style.backgroundColor = colors[dropdownType];
    }
};

export const createTagElement = (value) => {
    const tagElement = document.createElement("div");
    tagElement.classList.add("tags-item");
    tagElement.innerHTML = `
    <p id="tags-value">${value}</p>
    <div><i class="fa-regular fa-circle-xmark tags-closed"></i></div>
  `;
    return tagElement;
};

export const extractDropdownType = (element) => {
    const dropdownClass = element.classList.value;

    const dropdownType = dropdownClass.split('-')[2];
    let filteredDropdown = ''
    switch (dropdownType) {
        case 'ingredients':
            filteredDropdown = 'ingredients';
            return filteredDropdown;
        case 'appareils':
            filteredDropdown = 'appareils';
            return filteredDropdown;
        case 'ustensiles':
            filteredDropdown = 'ustensiles';
            return filteredDropdown;
        default:
            return null; // or return null;
    }
};

