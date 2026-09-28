const burgerButton = document.getElementById('burger_menu_button');
const header = document.querySelector('.header');
const mobileMenu = document.getElementById('mobile-menu');

function setMenuOpen(isOpen) {
    header.classList.toggle('header--menu-open', isOpen);
    document.documentElement.classList.toggle('scroll-lock', isOpen);
    burgerButton.setAttribute('aria-expanded', String(isOpen));
    burgerButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

burgerButton.addEventListener('click', () => {
    const isOpen = burgerButton.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen)
})

mobileMenu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
        setMenuOpen(false);
    }
});

document.addEventListener('keydown', (event) => {
    const eventKey = event.key;
    if (eventKey === 'Escape') {
        setMenuOpen(false)
    }
});