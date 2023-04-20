class RecipesCard {
  constructor(recipes) {
    this.recipes = recipes;
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
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
        </div>
      </div>
      </div>
          `;

      photographerCards += photographerTemplate;
    }

    return photographerCards;
  }


}