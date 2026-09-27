const modalWindow = document.querySelector('#product-modal');
const svgNamespace = 'http://www.w3.org/2000/svg';
const alertIconPaths = [
    'M8 7.66667V11',
    'M8 5.00667L8.00667 4.99926',
    'M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z',
];

modalWindow.addEventListener('click', (ev) => {
    if (ev.target !== modalWindow)
        return

    const modalRect = modalWindow.getBoundingClientRect();
    const isOutside = ev.clientX < modalRect.left
        || ev.clientX > modalRect.right
        || ev.clientY < modalRect.top
        || ev.clientY > modalRect.bottom;

    if (isOutside)
        modalWindow.close()
})

function renderModal(product) {
    modalWindow.innerHTML = '';

    const modalContentBox = document.createElement('div');
    const productImgBox = document.createElement('div');
    const productImg = document.createElement('img');
    const productDescriptionBox = document.createElement('div');
    const productTitleBox = document.createElement('div');
    const productName = document.createElement('h3');
    const productText = document.createElement('p');
    const productTotal = document.createElement('p');
    const productTotalLabel = document.createElement('span');
    const productTotalPrice = document.createElement('span');
    const closeButton = document.createElement('button');

    modalContentBox.classList.add('modal__content');
    productImgBox.classList.add('modal__image-box');
    productImg.classList.add('modal__image');
    productImg.src = product.image;
    productImg.width = '340';
    productImg.height = '340';
    productImg.alt = product.name;
    productDescriptionBox.classList.add('modal__description');
    productTitleBox.classList.add('modal__title');
    productName.classList.add('modal__name');
    productName.id = 'product-modal-title';
    productName.innerText = product.name;
    productText.classList.add('modal__text');
    productText.innerText = product.description;
    productTotal.classList.add('modal__total');
    productTotalLabel.innerText = 'Total:';
    closeButton.type = 'button';
    closeButton.classList.add('button', 'button--secondary', 'modal__close');
    closeButton.innerText = 'Close';

    closeButton.addEventListener('click', () => {
        modalWindow.close()
    })

    productDescriptionBox.addEventListener('click', (ev) => {
        const selected = ev.target.closest('.tab')
        if (!selected)
            return

        if (selected.parentElement.dataset.multiple === 'true')
            setTabActive(selected, !selected.classList.contains('tab--active'))
        else
            selectSingleTab(selected)

        productTotalPrice.innerText = `$${calculateTotal(product.price, productDescriptionBox)}`;
    })

    productImgBox.append(productImg)

    productTitleBox.append(productName)
    productTitleBox.append(productText)
    productDescriptionBox.append(productTitleBox)

    if (product.sizes)
        productDescriptionBox.append(renderSizes(product.sizes))

    if (product.additives)
        productDescriptionBox.append(renderAdditives(product.additives))

    productTotalPrice.innerText = `$${calculateTotal(product.price, productDescriptionBox)}`;
    productTotal.append(productTotalLabel)
    productTotal.append(productTotalPrice)
    productDescriptionBox.append(productTotal)
    productDescriptionBox.append(renderAlert())
    productDescriptionBox.append(closeButton)

    modalContentBox.append(productImgBox)
    modalContentBox.append(productDescriptionBox)

    modalWindow.append(modalContentBox)

    modalWindow.showModal()
}

function renderAlert() {
    const alertBox = document.createElement('div');
    const alertIcon = document.createElementNS(svgNamespace, 'svg');
    const alertText = document.createElement('p');

    alertBox.classList.add('modal__alert');
    alertIcon.classList.add('modal__alert-icon');
    alertIcon.setAttribute('width', '16');
    alertIcon.setAttribute('height', '16');
    alertIcon.setAttribute('viewBox', '0 0 16 16');
    alertIcon.setAttribute('fill', 'none');
    alertIcon.setAttribute('aria-hidden', 'true');
    alertText.classList.add('modal__alert-text');
    alertText.innerText = 'The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.';

    alertIconPaths.forEach((pathData) => {
        const alertIconPath = document.createElementNS(svgNamespace, 'path');

        alertIconPath.setAttribute('d', pathData);
        alertIconPath.setAttribute('stroke', 'currentColor');
        alertIconPath.setAttribute('stroke-linecap', 'round');
        alertIconPath.setAttribute('stroke-linejoin', 'round');

        alertIcon.append(alertIconPath)
    })

    alertBox.append(alertIcon)
    alertBox.append(alertText)

    return alertBox
}

function renderSizes(sizes) {
    const sizeButtons = Object.entries(sizes).map(([key, value], index) => {
        return renderOption(key.toUpperCase(), value.size, value['add-price'], index === 0)
    })

    return renderOptionGroup('Size', sizeButtons, false)
}

function renderAdditives(additives) {
    const additiveButtons = additives.map((element, index) => {
        return renderOption(index + 1, element.name, element['add-price'], false)
    })

    return renderOptionGroup('Additives', additiveButtons, true)
}

function setTabActive(tab, isActive) {
    tab.classList.toggle('tab--active', isActive);
    tab.setAttribute('aria-pressed', isActive);
}

function selectSingleTab(selected) {
    selected.parentElement.querySelectorAll('.tab').forEach((tab) => {
        setTabActive(tab, tab === selected)
    })
}

function calculateTotal(basePrice, container) {
    let total = Number(basePrice);

    container.querySelectorAll('.tab--active').forEach((tab) => {
        total += Number(tab.dataset.price)
    })

    return total.toFixed(2)
}

function renderOptionGroup(labelText, buttons, isMultiple) {
    const productOptionsBox = document.createElement('div');
    const productOptionsLabel = document.createElement('p');
    const productOptionTabs = document.createElement('div');

    productOptionsBox.classList.add('modal__option-group');
    productOptionsLabel.classList.add('modal__label');
    productOptionsLabel.innerText = labelText;
    productOptionTabs.classList.add('tabs', 'modal__tabs');
    productOptionTabs.dataset.multiple = isMultiple;

    buttons.forEach((button) => productOptionTabs.append(button))

    productOptionsBox.append(productOptionsLabel)
    productOptionsBox.append(productOptionTabs)

    return productOptionsBox
}

function renderOption(iconText, text, price, isActive) {
    const productOptionButton = document.createElement('button');
    const productOptionIcon = document.createElement('span');

    productOptionButton.type = 'button';
    productOptionButton.classList.add('tab');
    productOptionButton.dataset.price = price;
    setTabActive(productOptionButton, isActive)

    productOptionIcon.classList.add('tab__icon');
    productOptionIcon.setAttribute('aria-hidden', 'true');
    productOptionIcon.innerText = iconText;

    productOptionButton.append(productOptionIcon)
    productOptionButton.append(text)

    return productOptionButton
}
export { renderModal }