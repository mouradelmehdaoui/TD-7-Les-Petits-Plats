class RecipesCard {
  constructor(recipes, ingredients) {
    this.recipes = recipes;
    this.ingredients = ingredients;
  }

  createCards() {

    let photographerCards = "";

    for (let recipe of this.recipes) {

      const { id, name, time, description } = recipe;

      photographerCards += `
      <div class="recipes-card">
        <div class="recipes__img"></div>
        <div class="recipes__body">
        <div class="recipes__header row">
        <h5 class="recipes__title col">${name}</h5>
        <h5 class="recipes__time col"><i class="fa-regular fa-clock me-2"></i>${time} min</h5>
        </div>
        <div class="recipes__instruction row">
        <ul class="col">
          `;
      for (let ingredient of recipe.ingredients) {
        photographerCards += `
        
        <li class="recipes__ingredients">${ingredient.ingredient} - ${ingredient.quantity} ${ingredient.unit ? ingredient.unit : ''}</li>
        `;
      }

      photographerCards +=

        `</ul>
      <p class="recipes__description col">${description}</p>
      </div>
      </div>
      </div>`;
    }

    return photographerCards;
  }

  createDropdown(ingredients) {

    let dropDownCards = "";

    for (let ingredient of ingredients) {

      dropDownCards += `
        <li><a class="dropdown-item" href="#">${ingredient}</a></li>
          `;
    }

    return dropDownCards;
  }

}