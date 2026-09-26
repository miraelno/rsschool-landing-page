import products from './data/products.json'
import { showModal } from './modal-render';

let activeTab = document.querySelector('.tab--active');
const allTabs = document.querySelectorAll('.menu__tabs .tab');
const menuContainer = document.getElementById('menu');
const activeTabCategory = activeTab.dataset.category;

function isActiveTab(element) {
    return element.classList.contains('tab--active');
}

function findByCategory(category) {
    return products.filter((e) => {
        return e.category === category
    })
}

allTabs.forEach((el) => {
    el.addEventListener('click', () => {
        if (!isActiveTab(el)) {
            activeTab.classList = 'tab'
            activeTab = el
            el.classList.add('tab--active');
            renderMenuItems(el.dataset.category)
        }
    })
})

function renderMenuItems(category) {
    menuContainer.innerHTML = '';

    const itemsToRender = findByCategory(category);

    itemsToRender.map((item, index) => {

        const listItem = document.createElement('li');
        const productCart = document.createElement('article');
        const productImageBox = document.createElement('div');
        const productImage = document.createElement('img');
        const productDescriptionBox = document.createElement('div');
        const productTitleBox = document.createElement('div');
        const productTitle = document.createElement('h2');
        const productDescription = document.createElement('p');
        const productPrice = document.createElement('p');

        productCart.classList.add('product-card');
        productImageBox.classList.add('product-card__image-box');
        productImage.classList.add('product-card__image');
        productImage.src = item.image;
        productImage.width = '340';
        productImage.height = '340';
        productImage.alt = item.name;
        productDescriptionBox.classList.add('product-card__description');
        productTitleBox.classList.add('product-card__title');
        productTitle.classList.add('product-card__name');
        productTitle.innerText = item.name;
        productDescription.classList.add('product-card__text');
        productDescription.innerText = item.description;
        productPrice.classList.add('product-card__price');
        productPrice.innerText = `$${item.price}`;

        productImageBox.append(productImage)

        productTitleBox.append(productTitle)
        productTitleBox.append(productDescription)
        productDescriptionBox.append(productTitleBox)
        productDescriptionBox.append(productPrice)

        productCart.append(productImageBox)
        productCart.append(productDescriptionBox)

        listItem.append(productCart)

        menuContainer.append(listItem)

        listItem.dataset.id = index;
    })
}

renderMenuItems(activeTabCategory)

menuContainer.addEventListener('click', (ev) => {
    const selected = ev.target.closest('li')
    const selectedId = selected.dataset.id;
    showModal()
})

// function showModal(id) {
//     alert(`${id} is selected`)
// }