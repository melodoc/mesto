import { initialCards, selector, ActionType } from './constants.js';

// open-close elements
const openProfileButton = document.querySelector('.profile__button_action_edit');
const closeProfileButton = document.querySelector('.popup__button_action_close');
const profilePopup = document.querySelector('#profile');
const popupOpenedClass = 'popup_opened';

// input elements
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__text');
const profilePopupNameInput = document.querySelector('.popup__input_type_name');
const profilePopupAboutInput = document.querySelector('.popup__input_type_about');

// submit form element
const profileForm = document.querySelector('.popup__form');

// card template
const cardList = document.querySelector('.photo-grid__list');
const openAddCardButton = document.querySelector('.profile__button_action_add');
const addCardPopup = document.querySelector('#add-card');
const closeAddCardButton = document.querySelectorAll('.popup__button_action_close')[1];

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

function closeProfile() {
    toggleClassList('remove', profilePopup);
}

openProfileButton.addEventListener('click', openProfile);
closeProfileButton.addEventListener('click', closeProfile);

// submit form manage
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profilePopupNameInput.value;
    profileAbout.textContent = profilePopupAboutInput.value;
    closeProfile();
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

// card load
function createElementFromTemplate(templateId, selector) {
    const template = document.querySelector(templateId).content;
    return template.querySelector(selector).cloneNode(true);
}

function fillCardContent(element, card) {
    element.querySelector(selector.header).textContent = card.name;
    element.querySelector(selector.image).alt = card.name;
    element.querySelector(selector.image).src = card.link;
}

initialCards.forEach((card) => {
    const cardElement = createElementFromTemplate('#card', '.card');
    fillCardContent(cardElement, card);
    cardList.append(cardElement);
});

// add card form
function openAddCardForm() {
    toggleClassList('add', addCardPopup);
}

function closeAddCardForm() {
    toggleClassList('remove', addCardPopup);
}

openAddCardButton.addEventListener('click', openAddCardForm);
closeAddCardButton.addEventListener('click', closeAddCardForm);
