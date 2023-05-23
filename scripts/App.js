import { extractRecipes } from './utils/extractRecipes.js'
import { recipesFound } from './utils/extractRecipes.js'
import toggleCategory from '../scripts/utils/bundle.js'
import { generateDropdownContent } from '../scripts/utils/filtered.js'
import { searchMain } from './utils/searchMain.js'
import { createTag } from '../scripts/utils/tagElement.js'
import { extractDropdownType } from '../scripts/utils/tagElement.js'




class App {

    constructor() {
        this.$cardsContainer = document.querySelector(".recipes-container");
        this.$dropDonwIngredients = document.getElementById("dropdown-ingredients");
        this.$dropDonwAppareils = document.getElementById("dropdown-appareils");
        this.$dropDonwUstensiles = document.getElementById("dropdown-ustensiles");
        this.RecipesService = new RecipesService(window.location.href + '/data/recipes.json')
    }

    async main() {

        // recuepration des recettes et les affichées
        const recipes = await this.RecipesService.getAllReceipts()
        this.$cardsContainer.innerHTML = new RecipesCard(recipes).createCards();
        App.createDropdown(recipes, this.$dropDonwIngredients, this.$dropDonwAppareils, this.$dropDonwUstensiles);

        return recipes;
    }

    static createDropdown(recipes, $dropDonwIngredients, $dropDonwAppareils, $dropDonwUstensiles) {
        const { ingredients, appliances, ustensils } = extractRecipes(recipes);

        // création des dropdown avec les category extraites
        [$dropDonwIngredients, $dropDonwAppareils, $dropDonwUstensiles]
            .forEach(($el, i) => {
                $el.innerHTML = new RecipesCard(recipes)
                    .createDropdown([ingredients, appliances, ustensils][i],
                        ['Ingrédients', 'Appareils', 'Ustensiles'][i]);
            });
        ['ingredients', 'appareils', 'ustensiles'].forEach((category) => { toggleCategory(category); });
    }

}

//Launching the app
const initApp = new App().main();

let arrayOfRecipes = [];
let filteredRecipesArray = [];
let arrayOfRecipesOrFiltered = [];
let arrayOfSearch = [];

const $inputSearch = document.querySelector('.searchInput');
const _cardsContainer = document.querySelector(".recipes-container");

initApp.then((recipes) => {

    arrayOfRecipes = recipes;
    addEventListeners()

});

function addEventListeners() {
    $inputSearch.addEventListener("input", () => searchRecipes(arrayOfRecipes));
    document.addEventListener("input", handleDropdownChange);
    document.addEventListener("click", getTags);
}

function searchRecipes(arrayOfRecipes) {

    //let recipesToSearch = arrayOfRecipesOrFiltered.length > 0 ? arrayOfRecipesOrFiltered : arrayOfRecipes;


    return new Promise((resolve) => {

        // Create a promise
        searchMain(arrayOfRecipes, $inputSearch, _cardsContainer, (filteredRecipes) => {

            filteredRecipesArray = filteredRecipes;
            resolve(filteredRecipesArray); // Resolve the promise with the filtered recipes
        });
    }).then((filteredRecipes) => {
        // Access filtered recipes here
        // Use the filtered recipes as needed
        console.log( filteredRecipesArray);
        return filteredRecipesArray; 
    });
}

const handleDropdownChange = (event) => {
    const dropdownType = extractDropdownType(event.target);
    const enterValue = event.target.value.toLowerCase();
    generateDropdownContent(arrayOfRecipes, dropdownType, enterValue)
};

const getTags = (e) => {

    const array = filteredRecipesArray.length === 0 ? arrayOfRecipes : filteredRecipesArray
    
    const result =  createTag(e, array, _cardsContainer);

    if (result) {
        result.forEach(item => {
            if (!arrayOfRecipesOrFiltered.some(existingItem => existingItem.id === item.id)) {
                arrayOfRecipesOrFiltered.push(item);
            }
        });
    }
    console.log(result);
    if(result){recipesFound(result)};
   
};

























