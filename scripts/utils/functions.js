const getAllRecipeInfo = (recipes) => {

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

export default getAllRecipeInfo