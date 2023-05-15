import  {getAllRecipeInfo} from "../../scripts/utils/functions.js";
import  {recipesFound} from "../../scripts/utils/functions.js";

class Api {

  /**
   * 
   * @param {string} url 
   */
  constructor(url) {
    this._url = url
  }

  async getAll() {

    try {
      const response = await fetch(this._url)
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      const data = await response.json()
      return data

    }
    catch (error) {
      console.error(`Impossible d'obtenir les recettes: ${error}`);
    }
  }
}

class RecipesService extends Api {

  constructor(url) {
    super(url)
  }

  async getAllReceipts() {
    return await this.getAll()
  }

  static filterByInput(recipes, input, cardsContainer) {

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
        this.handleDropdownChange(filteredRecipes)
        recipesFound(filteredRecipes);
      } else {
        recipesFound(recipes);
        this.handleDropdownChange(recipes)
      }
    }
    input.addEventListener("input", myFunction);

  }

  static handleDropdownChange(filteredRecipes) {
    const { ingredients, ustensils, appliances } = getAllRecipeInfo(filteredRecipes);
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

}

export default RecipesService;

