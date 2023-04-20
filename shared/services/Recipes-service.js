
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

  filterByInput(recettes) {
    
    let recipesFiltered = []

    const inputSearch = document.getElementById('searchInput');
    const myFunction = (e) => {
      const enterValue =  e.target.value.toLowerCase()


      if(enterValue.length >= 2) {
       recipesFiltered = recettes.filter( value => value.name.includes(enterValue))
      }
      return recipesFiltered
    }
    inputSearch.addEventListener("input", myFunction);

  }

}

