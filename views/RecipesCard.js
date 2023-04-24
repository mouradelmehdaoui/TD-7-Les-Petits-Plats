class RecipesCard {
  constructor(recipes, ingredients) {
    this.recipes = recipes;
    this.ingredients = ingredients;
  }

  createCards() {

    let photographerTemplate = "";
    let photographerCards = "";

    for (let recipe of this.recipes) {

      const { id, name, servings, time, description } = recipe;

      photographerTemplate = `
        <div class="col">
        <div class="card" style="width: 18rem;">
        <img src="https://source.unsplash.com/random/200x200?sig=${id}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h5 class="card-title">${time} min</h5>
          <p class="card-text">${description}</p>
          <p class="card-text"></p>
        </div>
        <p id="card-ingredients"></p>
      </div>
      </div>
          `;

      photographerCards += photographerTemplate;
    }

    return photographerCards;
  }

  createDropdown(ingredients) {

    let dropDownTemplate = "";
    let dropDownCards = "";

    for (let ingredient of ingredients) {


      dropDownTemplate = `
        <li><a class="dropdown-item" href="#">${ingredient}</a></li>
          `;

          dropDownCards += dropDownTemplate;
    }

    return dropDownCards;
  }

}