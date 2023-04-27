const toggleCategory = (category) => {
    const dropDwonClosed = select(`.dropdown-option-${category}`)
    const dropMenu = select(`.dropdown-menus-${category}`)
    const arrow = select(`.dropdown-arrow-${category}`)
  
    arrow.addEventListener('click', () => {
      const isOpen = arrow.classList.contains('open')
      dropDwonClosed.classList.toggle('closed')
      arrow.classList.toggle('open')
      dropMenu.classList.toggle('expend', !isOpen)
    })
  }
  
  const select = (selector) => {
    return document.querySelector(selector)
  }

export default toggleCategory

