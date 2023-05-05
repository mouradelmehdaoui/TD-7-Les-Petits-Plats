import getAllRecipeInfo from '../scripts/utils/functions.js'
import toggleCategory from '../scripts/utils/bundle.js'

class App {

    constructor() {
        this.$cardsContainer = document.querySelector(".recipes-container");
        this.$dropDonwIngredients = document.getElementById("dropdown-ingredients");
        this.$dropDonwAppareils = document.getElementById("dropdown-appareils");
        this.$dropDonwUstensiles = document.getElementById("dropdown-ustensiles");
        this.$inputSearch = document.querySelector('.searchInput');
        this.ReceiptService = new RecipesService(window.location.href+'/data/recipes.json')

    }

    async main() {

        console.log('je suis dans main de App');

        const allRecipes = await this.ReceiptService.getAllReceipts()
        this.$cardsContainer.innerHTML = new RecipesCard(allRecipes).createCards();
        this.ReceiptService.filterByInput(allRecipes, this.$inputSearch, this.$cardsContainer)

        const { ingredients, ustensils, appliances } = getAllRecipeInfo(allRecipes);

        [this.$dropDonwIngredients, this.$dropDonwAppareils, this.$dropDonwUstensiles]
            .forEach(($el, i) => {
                $el.innerHTML = new RecipesCard(allRecipes)
                    .createDropdown([ingredients, ustensils, appliances][i],
                        ['Ingrédients', 'Appareils', 'Ustensiles'][i]);
            });
        ['ingredients', 'ustensiles', 'appareils'].forEach((category) => { toggleCategory(category); });

    }

}

const app = new App()

app.main()


