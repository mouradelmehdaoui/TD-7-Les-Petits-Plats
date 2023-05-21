import { generateRecipesItems } from './filtered.js';

let tagsClicked = [];

export const createTag = (e, arrayOfRecipes,  _cardsContainer) => {
    // récupération valeur cliquer pour le tag
    const liTag = e.target.closest("LI");
    if (!liTag) return;

    // création du tag dans le DOM
    const valueClicked = liTag.innerHTML.toLowerCase();
    const tagContainer = document.getElementById("tags-container");
    const tagElement = createTagElement(valueClicked);
    tagContainer.appendChild(tagElement);
    // extraction du category recette du dropdown 
    const dropdownType = extractDropdownType(e.target);

    // ajouter la couleur du tag dans le DOM
    applyColorToTagElement(tagElement, dropdownType);

    // add tag clicked and dropdown type in array
    tagsClicked.push(valueClicked);

    // Supprimer tag after clicked
    const tagClosed = tagElement.querySelector(".tags-closed");
    tagClosed.addEventListener("click", () => {
        tagElement.remove();
        const index = tagsClicked.indexOf(valueClicked);
        if (index !== -1) {
            tagsClicked.splice(index, 1);

            console.log(tagsClicked);

            generateRecipesItems(arrayOfRecipes, tagsClicked, _cardsContainer)
        }
    });

    return tagsClicked
};


export const applyColorToTagElement = (tagElement, dropdownType) => {
    const colors = {
        ingredients: '#3282F7',
        appareils: '#68D9A4',
        ustensiles: '#ED6454'
    };

    if (dropdownType in colors) {
        tagElement.style.backgroundColor = colors[dropdownType];
    }
};

export const createTagElement = (value) => {
    const tagElement = document.createElement("div");
    tagElement.classList.add("tags-item");
    tagElement.innerHTML = `
    <p id="tags-value">${value}</p>
    <div><i class="fa-regular fa-circle-xmark tags-closed"></i></div>
  `;
    return tagElement;
};

export const extractDropdownType = (element) => {
    const dropdownClass = element.classList.value;
    return dropdownClass.split('-')[2];
};

