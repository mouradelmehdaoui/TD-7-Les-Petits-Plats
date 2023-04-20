class App {

    constructor() {
        this.$cardsContainer = document.querySelector(".card__container");
        this.ReceiptService = new RecipesService('../api/recipes.json')
    }

    async main() {

        const allRecipes = await this.ReceiptService.getAllReceipts()
        this.$cardsContainer.innerHTML = new RecipesCard(allRecipes).createCards();
        const filter = this.ReceiptService.filterByInput(allRecipes)
    }
}

const app = new App()
app.main()