export function extractRecipes(recipes) {

  const info = {
    ingredients: new Set(),
    ustensils: new Set(),
    appliances: new Set(),
  };

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      info.ingredients.add(ingredient.ingredient.toLowerCase());
    });

    recipe.ustensils.forEach((ustensil) => {
      info.ustensils.add(ustensil.toLowerCase());
    });

    info.appliances.add(recipe.appliance.toLowerCase());
  });

  return {
    ingredients: [...info.ingredients],
    ustensils: [...info.ustensils],
    appliances: [...info.appliances],
  };
};

export const extractArrays = (recipes, objectProperty) => {

  recipes = [].concat(
    ...recipes.map((recipe) => {
      let valueOfProperty = recipe[objectProperty];
      return valueOfProperty;
    })
  );

  return [...new Set(recipes)];
};




export function recipesFound(array) {
  const result = document.querySelector(".recipes-found-paragraph");

  if (array.length > 0) {
    result.innerHTML = `Résultat trouvé(s):<span class="fw-bold"> ${array.length}</span>`;
    result.classList.remove("hide");
  } else if(array.length === 0) {
    result.innerHTML = `Résultat trouvé(s):<span class="fw-bold"> 0 </span>`;
  } else {
    result.classList.add("hide");
  }
}

