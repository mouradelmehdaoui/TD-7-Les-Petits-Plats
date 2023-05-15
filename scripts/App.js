import getAllRecipeInfo from '../scripts/utils/functions.js'
import toggleCategory from '../scripts/utils/bundle.js'
import filtered from '../scripts/utils/filtered.js'
import RecipesService  from "../shared/services/Recipes-service.js";


class App {

    constructor() {
        this.$cardsContainer = document.querySelector(".recipes-container");
        this.$dropDonwIngredients = document.getElementById("dropdown-ingredients");
        this.$dropDonwAppareils = document.getElementById("dropdown-appareils");
        this.$dropDonwUstensiles = document.getElementById("dropdown-ustensiles");
        this.$inputSearch = document.querySelector('.searchInput');
        this.ReceiptService = new RecipesService(window.location.href + '/data/recipes.json')

    }

    async main() {

        const allRecipes = await this.ReceiptService.getAllReceipts()
        this.$cardsContainer.innerHTML = new RecipesCard(allRecipes).createCards();
        RecipesService.filterByInput(allRecipes, this.$inputSearch, this.$cardsContainer)
               
        const { ingredients, appliances, ustensils } = getAllRecipeInfo(allRecipes);
        filtered(allRecipes);

        [this.$dropDonwIngredients, this.$dropDonwAppareils, this.$dropDonwUstensiles]
            .forEach(($el, i) => {
                $el.innerHTML = new RecipesCard(allRecipes)
                    .createDropdown([ingredients, appliances, ustensils][i],
                        ['Ingrédients', 'Appareils', 'Ustensiles'][i]);
            });
        ['ingredients', 'appareils', 'ustensiles'].forEach((category) => { toggleCategory(category); });

    }

}

const app = new App()
app.main()


