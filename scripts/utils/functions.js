const getAllIngredients = (recipes) => {

  const byMap = []
  recipes.map(recipe =>
    recipe.ingredients.map(ingredient => byMap.push(ingredient.ingredient.toLowerCase()))
  )
  const uniqueIngredients = [...new Set(byMap)];

  const uniqueIngredients2 = byMap.filter((ingredient, index) => {
    return byMap.indexOf(ingredient) === index;
  });

  console.log(uniqueIngredients2);

  const ingredients = new Set(); // use a set to avoid duplicates
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.add(ingredient.ingredient.toLowerCase());
    });
  });

  console.log(Array.from(ingredients));
  return Array.from(ingredients)
}


const getAllUstensils = (recipes) => {

  const allUstensils = new Set();
  recipes.forEach(recipe => {
    recipe.ustensils.forEach(ustensil => {
      allUstensils.add(ustensil);

    });
  });
  return [...allUstensils]
}

const getAllAppliances = (recipes) => {

  const allAppliances = new Set();
  recipes.forEach(recipe => {
    allAppliances.add(recipe.appliance);
  });
  return [...allAppliances]
}

export { getAllAppliances, getAllIngredients, getAllUstensils }



// const arr =  ["a" , "b" , "c" , "a" ,"b" , "y"];

// const ok = arr.filter( (x, index) => arr.indexOf(x) === index)

// const ok2 = [... new Set(arr)]

// console.log(ok)
// console.log(ok2)