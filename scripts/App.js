import { getAllAppliances, getAllIngredients, getAllUstensils } from '../scripts/utils/functions.js'

class App {

    constructor() {
        this.$cardsContainer = document.querySelector(".recipes-container");
        this.$dropDonwContainer = document.querySelector(".dropdown-option");
        this.$inputSearch = document.querySelector('.searchInput');
        this.ReceiptService = new RecipesService('../api/recipes.json')
    }

    async main() {

        const allRecipes = await this.ReceiptService.getAllReceipts()
        this.$cardsContainer.innerHTML = new RecipesCard(allRecipes).createCards();
        const ingredients = getAllIngredients(allRecipes)
        this.$dropDonwContainer.innerHTML = new RecipesCard(allRecipes).createDropdown(ingredients);
        this.ReceiptService.filterByInput(allRecipes, this.$inputSearch, this.$cardsContainer)
        
   
    }
}

const app = new App()
app.main()