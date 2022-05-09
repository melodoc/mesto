import { initialCards, selector, elementPositionType } from './constants.js';

// open-close profile elements
const openProfileButton = document.querySelector('.profile__button_action_edit');
const profilePopup = document.querySelector('#profile');
const popupOpenedClass = 'popup_opened';

// input elements
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__text');
const profilePopupNameInput = document.querySelector('.popup__input_type_name');
const profilePopupAboutInput = document.querySelector('.popup__input_type_about');
const addCardPopupTitleInput = document.querySelector('.popup__input_type_title');
const addCardPopupUrlInput = document.querySelector('.popup__input_type_url');

// submit form elements
const profileForm = document.querySelector('#profile .popup__form');
const addCardForm = document.querySelector('#add-card .popup__form');

// card template
const cardList = document.querySelector('.photo-grid__list');
const openAddCardButton = document.querySelector('.profile__button_action_add');
const addCardPopup = document.querySelector('#add-card');
const zoomPopup = document.querySelector('#zoom-img');
const zoomPopupImage = zoomPopup.querySelector('.popup__image');
const zoomPopupParagraph = zoomPopup.querySelector('.popup__description');

// every close button
const closeButtons = document.querySelectorAll('.popup__button_action_close');

// set profile form data functions
function setInputValue(input, value) {
    input.setAttribute('value', value);
}

function setProfileFormData() {
    setInputValue(profilePopupNameInput, profileName.textContent);
    setInputValue(profilePopupAboutInput, profileAbout.textContent);
}

function openPopup(element, token = popupOpenedClass) {
    element.classList.add(token);
}
function closePopup(element, token = popupOpenedClass) {
    element.classList.remove(token);
}

// open-close implementation
function openProfile() {
    setProfileFormData();
    openPopup(profilePopup);
}

function closeProfilePopup() {
    closePopup(profilePopup);
}

openProfileButton.addEventListener('click', openProfile);

// submit form manage
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profilePopupNameInput.value;
    profileAbout.textContent = profilePopupAboutInput.value;
    closeProfilePopup();
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// card load
function createElementFromTemplate(templateId, selector) {
    const template = document.querySelector(templateId).content;
    return template.querySelector(selector).cloneNode(true);
}

function handleLikeButton(evt) {
    evt.target.classList.toggle('card__like-button_state_active');
}

function handleDeleteButton(evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
}

function openZoomPopup(evt) {
    openPopup(zoomPopup);
    zoomPopupImage.src = evt.target.currentSrc;
    zoomPopupParagraph.textContent = evt.target.name;
}

function closeZoomPopup() {
    closePopup(zoomPopup);
}

function getCardElements(element, selector) {
    const { header, image, like } = selector;
    const deleteButton = selector.delete;

    return [
        element.querySelector(header),
        element.querySelector(image),
        element.querySelector(like),
        element.querySelector(deleteButton)
    ];
}

function fillCardContent(element, card) {
    const [header, image, like, deleteButton] = getCardElements(element, selector);

    header.textContent = card.name;
    image.alt = card.name;
    image.name = card.name;
    image.src = card.link;
    image.addEventListener('click', openZoomPopup);
    like.addEventListener('click', handleLikeButton);
    deleteButton.addEventListener('click', handleDeleteButton);
}

function addCardElement(card, position = elementPositionType.AFTER) {
    const cardElement = createElementFromTemplate('#card', '.card');
    fillCardContent(cardElement, card);

    function appendCardElement() {
        cardList.append(cardElement);
    }

    function prependCardElement() {
        cardList.prepend(cardElement);
    }

    switch (position) {
        case elementPositionType.AFTER:
            appendCardElement();
            break;
        case elementPositionType.BEFORE:
            prependCardElement();
            break;
        default:
            appendCardElement();
            break;
    }
}

initialCards.forEach((card) => {
    addCardElement(card);
});

// open-close implementation of add card form
function openAddCardPopup() {
    openPopup(addCardPopup);
}

function closeAddCardPopup() {
    closePopup(addCardPopup);
}

openAddCardButton.addEventListener('click', openAddCardPopup);

// clearInput for add card form
function clearAddCardPopupInput() {
    addCardPopupTitleInput.value = '';
    addCardPopupUrlInput.value = '';
}

// submit add card form
function handleAddCardPopupSubmit(evt) {
    evt.preventDefault();

    const card = {
        name: addCardPopupTitleInput.value,
        link: addCardPopupUrlInput.value
    };

    addCardElement(card, 'before');
    clearAddCardPopupInput();
    closeAddCardPopup();
}

addCardForm.addEventListener('submit', handleAddCardPopupSubmit);

// close any form
function closeAnyPopup() {
    closeProfilePopup();
    closeAddCardPopup();
    closeZoomPopup();
}

closeButtons.forEach((element) => element.addEventListener('click', closeAnyPopup));
