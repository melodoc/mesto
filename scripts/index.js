import { initialCards, selector, ActionType, ElementPositionType } from './constants.js';

// open-close elements
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

// submit profile form element
const profileForm = document.querySelector('#profile .popup__form');

// card template
const cardList = document.querySelector('.photo-grid__list');
const openAddCardButton = document.querySelector('.profile__button_action_add');
const addCardPopup = document.querySelector('#add-card');

// submit add card form element
const addCardForm = document.querySelector('#add-card .popup__form');

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

function toggleClassList(action, element, token = popupOpenedClass) {
    function addClassList() {
        return element.classList.add(token);
    }

    function removeClassList() {
        return element.classList.remove(token);
    }

    switch (action) {
        case ActionType.ADD:
            return addClassList();
        case ActionType.REMOVE:
            return removeClassList();
        default:
            return addClassList();
    }
}

// open-close implementation
function openProfile() {
    setProfileFormData();
    toggleClassList('add', profilePopup);
}

function closeProfilePopup() {
    toggleClassList('remove', profilePopup);
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

function fillCardContent(element, card) {
    element.querySelector(selector.header).textContent = card.name;
    element.querySelector(selector.image).alt = card.name;
    element.querySelector(selector.image).src = card.link;
    element.querySelector(selector.like).addEventListener('click', handleLikeButton);
    element.querySelector(selector.delete).addEventListener('click', handleDeleteButton);
}

function addCardElement(card, position = ElementPositionType.AFTER) {
    const cardElement = createElementFromTemplate('#card', '.card');
    fillCardContent(cardElement, card);

    function appendCardElement() {
        cardList.append(cardElement);
    }

    function prependCardElement() {
        cardList.prepend(cardElement);
    }

    switch (position) {
        case ElementPositionType.AFTER:
            appendCardElement();
            break;
        case ElementPositionType.BEFORE:
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
    toggleClassList('add', addCardPopup);
}

function closeAddCardPopup() {
    toggleClassList('remove', addCardPopup);
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
}

closeButtons.forEach((element) => element.addEventListener('click', closeAnyPopup));
