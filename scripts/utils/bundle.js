const toggleCategory = (category) => {
  const dropDwonClosed = select(`.dropdown-option-${category}`)
  const dropMenu = select(`.dropdown-menus-${category}`)
  const dropdownArrow = select(`.dropdown-arrow-${category}`)
  const dropdownTitle = select(`.dropdown-title-${category}`)
  const dropdownInput = document.createElement("input");
  dropdownInput.type = "text";
  dropdownInput.className = `dropdown-title-${category}`;
  dropdownInput.autofocus = true;

  dropdownArrow.addEventListener('click', () => {
    
    const isOpen = dropdownArrow.classList.contains('open')
    dropDwonClosed.classList.toggle('closed')
    dropdownArrow.classList.toggle('open')
    dropMenu.classList.toggle('expend', !isOpen)

    if (!isOpen) {
      dropdownInput.placeholder = 'Rechercher un '+ category;
      dropdownTitle.replaceWith(dropdownInput);
    } else {
      dropdownInput.replaceWith(dropdownTitle);
      dropdownInput.value = "";
    }
  })

}

const select = (selector) => {
  return document.querySelector(selector)
}

export default toggleCategory

