
class RecipesCard {
  constructor(recipes, ingredients) {
    this.recipes = recipes;
    this.ingredients = ingredients;

  }

  createCards() {
    const error = `<p class="text-center fw-bold">« Aucune recette ne correspond à votre critère... vous pouvez"
    "chercher « tarte aux pommes », « poisson », etc. </p>`;

    const photographerCards = this.recipes.map((recipe) => {
      const { id, name, time, description } = recipe;

      let ingredientsList = recipe.ingredients.map((ingredient) => {
        return `
        <li class="recipes__ingredients">${ingredient.ingredient} - 
        ${ingredient.quantity ? ingredient.quantity : ''} 
        ${ingredient.unit ? ingredient.unit : ''}</li>
      `;
      }).join('');

      return `
      <div class="recipes-card">
        <div class="recipes__img"></div>
        <div class="recipes__body">
          <div class="recipes__header row">
            <h5 class="recipes__title col">${name}</h5>
            <h5 class="recipes__time col"><i class="fa-regular fa-clock me-2"></i>${time} min</h5>
          </div>
          <div class="recipes__instruction row">
            <ul class="col">
              ${ingredientsList}
            </ul>
            <p class="recipes__description col">${description}</p>
          </div>
        </div>
      </div>
    `;
    }).join('');

    return photographerCards || error;
  }

  createDropdown(categorys, names) {

    const script = document.createElement('script');
    script.src = "../scripts/utils/bundle.js";
    script.type = "module";
    script.async = true;
    document.head.appendChild(script);

    const nameTitle = names
    const name = nameTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

    let dropDownCards = "";

    dropDownCards += `
    <div class="dropdown-menus-${name}">
   <p class="dropdown-title-${name}">${nameTitle}</p>
    <div class="dropdown-arrow-${name}"> 
      <i class="fa-solid fa-chevron-down"></i>
    </div>
    <ul class="dropdown-option-${name}">
    `
    if (!Array.isArray(categorys)) {
      throw new Error('categorys must be an array');
    }
    for (let category of categorys) {

      dropDownCards += `
        <li class="dropdown-item-${name}">${category}</li>
          `;
    }
    dropDownCards += `
    </ul>
  </div>`

    return dropDownCards;
  }

}