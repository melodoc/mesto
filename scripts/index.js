import { initialCards, selector } from './constants.js';

// open-close elements
const openProfileButton = document.querySelector('.profile__button_action_edit');
const closeProfileButton = document.querySelector('.popup__button_action_close');
const popup = document.querySelector('.popup');
const popupOpenedClass = 'popup_opened';

// input elements
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__text');
const popUpNameInput = document.querySelector('.popup__input_type_name');
const popUpAboutInput = document.querySelector('.popup__input_type_about');

// submit form element
const profileForm = document.querySelector('.popup__form');

// card template
const cardList = document.querySelector('.photo-grid__list');

// set profile form data functions
function setInputValue(input, value) {
    input.setAttribute('value', value);
}

function setProfileFormData() {
    setInputValue(popUpNameInput, profileName.textContent);
    setInputValue(popUpAboutInput, profileAbout.textContent);
}

// open-close implementation
function openProfile() {
    setProfileFormData();
    popup.classList.add(popupOpenedClass);
}

function closeProfile() {
    popup.classList.remove(popupOpenedClass);
}

openProfileButton.addEventListener('click', openProfile);
closeProfileButton.addEventListener('click', closeProfile);

// submit form manage
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popUpNameInput.value;
    profileAbout.textContent = popUpAboutInput.value;
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
