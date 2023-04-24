const dropDwonClosed = document.querySelector('.dropdown-option')
const dropMenu = document.querySelector('.dropdown-menus')
const arrow = document.querySelector('.dropdown-arrow')

const toggleLanding = (e) => {
    const isOpen = e.currentTarget.classList[1]
    dropDwonClosed.classList.toggle('closed')
    arrow.classList.remove('open')
    dropMenu.classList.add('expend')

    if (isOpen === 'open') {
        dropMenu.classList.remove('expend')
    } else {
        arrow.classList.add('open')
    }
}
arrow.addEventListener('click', toggleLanding)



