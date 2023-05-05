
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
          // indexoff avec recipes.json
          return nameMatch || descriptionMatch;
        });
        cardsContainer.innerHTML = new RecipesCard(filteredRecipes).createCards();
      }
    }
    input.addEventListener("input", myFunction);
  }
}

