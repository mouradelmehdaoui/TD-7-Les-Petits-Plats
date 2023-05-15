import getAllRecipeInfo from './functions.js'
import RecipesService  from "../../shared/services/Recipes-service.js";

const filtered = (recipes) => {
    const { ingredients, appliances, ustensils } = getAllRecipeInfo(recipes);
    const cardsContainer = document.querySelector(".recipes-container");

    console.log(ustensils);

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
            case 'appareils':
                const filteredAppliances = appliances.filter(value => value.toLowerCase().includes(enterValue));
                dropdownContent.innerHTML = generateDropdownHTML(filteredAppliances);
                break;
            case 'ustensiles':
                const filteredUstensils = ustensils.filter(value => value.toLowerCase().includes(enterValue));
                dropdownContent.innerHTML = generateDropdownHTML(filteredUstensils);
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
        const tagContainer = document.getElementById("tags-container");

        const createTagElement = (value) => {
            const tagElement = document.createElement("div");
            tagElement.classList.add("tags-item");
            tagElement.innerHTML = `
            <p id="tags-value">${value}</p>
            <div><i class="fa-regular fa-circle-xmark tags-closed"></i></div>
          `;
            return tagElement;
        };

        const tagValue = valueClicked;
        const tagElement = createTagElement(tagValue);
        tagContainer.appendChild(tagElement);
        const tagClosed = tagElement.querySelector(".tags-closed");

        const colors = {
            ingredients: '#3282F7',
            appareils: '#68D9A4',
            ustensiles: '#ED6454'
        };

        const dropdownType = extractDropdownType(e.target);
        if (dropdownType in colors) {
            tagElement.style.backgroundColor = colors[dropdownType];
        }

        const filteredRecipes = recipes.filter((recipe) => {
            const fields = [recipe.name, recipe.description].map((field) =>
                field.toLowerCase()
            );
            const ingredientMatches = recipe.ingredients.some((ingredient) =>
                ingredient.ingredient.toLowerCase().includes(valueClicked)
            );
            const ustensilstMatches = recipe.ustensils.some((ustensil) =>
                ustensil.toLowerCase().includes(valueClicked)
            );
            return fields.some((field) => field.includes(valueClicked)) || ingredientMatches || ustensilstMatches;
        });

        cardsContainer.innerHTML = new RecipesCard(filteredRecipes).createCards();

        tagClosed.addEventListener("click", () => {
            tagElement.remove();
            cardsContainer.innerHTML = new RecipesCard(recipes).createCards();
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