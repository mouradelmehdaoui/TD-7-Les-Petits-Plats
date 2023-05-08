import getAllRecipeInfo from './functions.js'

const filtered = (recipes) => {
    const { ingredients, ustensils, appliances } = getAllRecipeInfo(recipes);
    const cardsContainer = document.querySelector(".recipes-container");

    const handleDropdownChange = (event) => {
   

        const dropdownType = extractDropdownType(event.target);

        const enterValue = event.target.value.toLowerCase();
        const dropdownContent = document.querySelector(`.dropdown-option-${dropdownType}`);

        const generateDropdownHTML = (filteredItems) => {
            let dropdownHTML = "";
            filteredItems.forEach(item => {
                dropdownHTML += `<li class="dropdown-item-${dropdownType}">${item}</li>`;
            });
            return dropdownHTML;
        }

        switch (dropdownType) {
            case 'ingredients':
                const filteredIngredients = ingredients.filter(value => value.toLowerCase().includes(enterValue));
                dropdownContent.innerHTML = generateDropdownHTML(filteredIngredients);
                break;
            case 'ustensiles':
                const filteredUstensils = ustensils.filter(value => value.toLowerCase().includes(enterValue));
                dropdownContent.innerHTML = generateDropdownHTML(filteredUstensils);
                break;
            case 'appareils':
                const filteredAppliances = appliances.filter(value => value.toLowerCase().includes(enterValue));
                dropdownContent.innerHTML = generateDropdownHTML(filteredAppliances);
                break;
            default:
                RecipesService.filterByInput(recipes, cardsContainer)
                return;
        }
    };

    const tags = (e) => {
        const liTag = e.target.closest("LI");
        if (!liTag) return;

        const valueClicked = liTag.innerHTML.toLowerCase();
        const tag = document.querySelector(".tags-container");
        const tagValue = document.getElementById("tags-value");
        const tagClosed = document.querySelector(".tags-closed");
        tagValue.innerText = valueClicked;
        tag.classList.add("show");

        // Add background color Tag by name dropdown
        const colors = {
            ingredients: '#3282F7',
            appareils: '#68D9A4',
            ustensiles: '#ED6454'
        };

        const dropdownType = extractDropdownType(e.target);
        if (dropdownType in colors) {
            tag.style.backgroundColor = colors[dropdownType];
        }

        const filteredRecipes = recipes.filter((recipe) => {
            const fields = [recipe.name, recipe.description].map((field) =>
                field.toLowerCase()
            );
            const ingredientMatches = recipe.ingredients.some((ingredient) =>
                ingredient.ingredient.toLowerCase().includes(valueClicked)
            );
            return fields.some((field) => field.includes(valueClicked)) || ingredientMatches;
        });

        cardsContainer.innerHTML = new RecipesCard(filteredRecipes).createCards();

        tagClosed.addEventListener("click", () => {
            cardsContainer.innerHTML = new RecipesCard(recipes).createCards();
            tag.classList.remove("show");
        });
    };
    document.addEventListener("input", handleDropdownChange);
    document.addEventListener("click", tags);


    const extractDropdownType = (element) => {
        const dropdownClass = element.classList.value;
      return dropdownClass.split('-')[2];
      };

};

export default filtered