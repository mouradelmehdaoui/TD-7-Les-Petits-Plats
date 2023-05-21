import { extractRecipes } from './utils/extractRecipes.js'
import { extractArrays } from './utils/extractRecipes.js'
import toggleCategory from '../scripts/utils/bundle.js'
import { generateDropdownContent } from '../scripts/utils/filtered.js'
import { generateRecipesItems } from '../scripts/utils/filtered.js'
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

        //localStorage.clear();
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
const launchApp = new App().main();

localStorage.clear();
let arrayOfRecipes = [];
let arrayOfIngredients = [];
let arrayOfAppliances = [];
let arrayOfUtensils = [];
let arrayOfItemsSearchedByUser = [];
let arrayOfItemsFilteredByUser = [];
let tagsTextArray = [];
const $inputSearch = document.querySelector('.searchInput');
const _cardsContainer = document.querySelector(".recipes-container");

launchApp.then((recipes) => {

    arrayOfRecipes = recipes;
    arrayOfIngredients = extractArrays(recipes, 'ingredients');
    arrayOfAppliances = extractArrays(recipes, 'appliance');
    arrayOfUtensils = extractArrays(recipes, 'ustensils');

    addEventListeners()
});


function addEventListeners() {
    $inputSearch.addEventListener("input", searchRecipes);
    document.addEventListener("input", handleDropdownChange);
    document.addEventListener("click", getTags);
}


function searchRecipes(event) {
    searchMain(arrayOfRecipes, $inputSearch, _cardsContainer)
}

const handleDropdownChange = (event) => {
    const dropdownType = extractDropdownType(event.target);
    const enterValue = event.target.value.toLowerCase();
    generateDropdownContent(arrayOfRecipes, dropdownType, enterValue)

};

const getTags = (e) => {

    tagsTextArray = createTag(e, arrayOfRecipes, _cardsContainer);
    generateRecipesItems(arrayOfRecipes, tagsTextArray, _cardsContainer)
};
























