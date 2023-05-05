import getAllRecipeInfo from './functions.js'


const filtered = (recipes) => {
    const { ingredients, ustensils, appliances } = getAllRecipeInfo(recipes);

    const handleDropdownChange = (event) => {
        const dropdownClass = event.target.classList.value;
        const dropdownType = dropdownClass.split('-')[2];
        const enterValue = event.target.value.toLowerCase();
        const dropdownContent = document.querySelector(`.dropdown-option-${dropdownType}`);
        let dropdownHTML = "";

        switch (dropdownType) {
            case 'ingredients':
                const filteredIngredients = ingredients.filter(value => value.toLowerCase().includes(enterValue));
                filteredIngredients.forEach(ingredient => {
                    dropdownHTML += `<li><a class="dropdown-item" href="#">${ingredient}</a></li>`;
                });
                break;
            case 'ustensiles':
                const filteredUstensils = ustensils.filter(value => value.toLowerCase().includes(enterValue));
                filteredUstensils.forEach(ustensil => {
                    dropdownHTML += `<li><a class="dropdown-item" href="#">${ustensil}</a></li>`;
                });
                break;
            case 'appareils':
                const filteredAppliances = appliances.filter(value => value.toLowerCase().includes(enterValue));
                filteredAppliances.forEach(app => {
                    dropdownHTML += `<li><a class="dropdown-item" href="#">${app}</a></li>`;
                });
                break;
            default:
                console.error(`Unknown dropdown type: ${dropdownType}`);
                return;
        }

        dropdownContent.innerHTML = dropdownHTML;
    };
    document.addEventListener("input", handleDropdownChange);

};

export default filtered