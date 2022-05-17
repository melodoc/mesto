import { initialCards, selector, elementPositionType, defaultValidationProps } from './constants.js';
import { enableValidation, toggleButtonState } from './validation.js';

// open-close profile elements
const openProfileButton = document.querySelector('.profile__button_action_edit');
const profilePopup = document.querySelector('#profile');
const closeProfilePopupButton = document.querySelector('#profile .popup__button_action_close');

// input elements
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__text');
const profilePopupNameInput = document.querySelector('.popup__input_type_name');
const profilePopupAboutInput = document.querySelector('.popup__input_type_about');
const addCardPopupTitleInput = document.querySelector('.popup__input_type_title');
const addCardPopupUrlInput = document.querySelector('.popup__input_type_url');
const closeAddCardPopupButton = document.querySelector('#add-card .popup__button_action_close');

// submit form elements
const profileForm = document.querySelector('#profile .popup__form');
const profileButtonElement = profileForm.querySelector('.popup__button_action_submit');
const profileInputList = Array.from(profileForm.querySelectorAll('.popup__input'));

const addCardForm = document.querySelector('#add-card .popup__form');
const addCardButtonElement = addCardForm.querySelector('.popup__button_action_submit');
const addCardInputList = Array.from(addCardForm.querySelectorAll('.popup__input'));

// card template
const cardTemplate = document.querySelector('#card').content;
const cardList = document.querySelector('.photo-grid__list');
const openAddCardButton = document.querySelector('.profile__button_action_add');
const addCardPopup = document.querySelector('#add-card');
const zoomPopup = document.querySelector('#zoom-img');
const zoomPopupImage = zoomPopup.querySelector('.popup__image');
const zoomPopupParagraph = zoomPopup.querySelector('.popup__description');
const closeZoomPopupButton = document.querySelector('#zoom-img .popup__button_action_close');

const inactiveButtonClass = defaultValidationProps.inactiveButtonClass;

// every close button
const popupOpenedClass = 'popup_opened';

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

function closeProfilePopup() {
    closePopup(profilePopup);
}

// card load
function createCardFromTemplate(selector) {
    return cardTemplate.querySelector(selector).cloneNode(true);
}

function handleLikeButton(evt) {
    evt.target.classList.toggle('card__like-button_state_active');
}

function handleDeleteButton(evt) {
    const cardElement = evt.target.closest('.card');
    cardElement.remove();
}

function setZoomPopupContent(data) {
    zoomPopupImage.src = data.src;
    zoomPopupParagraph.textContent = data.name;
    zoomPopupImage.alt = data.name;
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

function createCard(card) {
    const cardElement = createCardFromTemplate('.card');
    const [header, image, like, deleteButton] = getCardElements(cardElement, selector);
    const { name, link } = card;

    header.textContent = name;
    image.alt = name;
    image.name = name;
    image.src = link;

    image.addEventListener('click', () => {
        openPopup(zoomPopup);
        setZoomPopupContent({ name: name, src: link });
    });

    like.addEventListener('click', handleLikeButton);
    deleteButton.addEventListener('click', handleDeleteButton);

    return cardElement;
}

function insertCard(cardElement, position) {
    if (position === elementPositionType.BEFORE) {
        cardList.prepend(cardElement);
    } else {
        cardList.append(cardElement);
    }
}

function closeAddCardPopup() {
    closePopup(addCardPopup);
}

function handleOverlayClose(popup, closePopUp) {
    popup.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopUp();
        }
    });

    window.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closePopUp();
        }
    });
}

initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    insertCard(card);
});

handleOverlayClose(profilePopup, closeProfilePopup);
handleOverlayClose(addCardPopup, closeAddCardPopup);
handleOverlayClose(zoomPopup, closeZoomPopup);

enableValidation(defaultValidationProps);

openProfileButton.addEventListener('click', () => {
    setProfileFormData();
    toggleButtonState(profileInputList, profileButtonElement, inactiveButtonClass);
    openPopup(profilePopup);
});

profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = profilePopupNameInput.value;
    profileAbout.textContent = profilePopupAboutInput.value;
    closeProfilePopup();
});

openAddCardButton.addEventListener('click', () => {
    openPopup(addCardPopup);
});

addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const cardData = {
        name: addCardPopupTitleInput.value,
        link: addCardPopupUrlInput.value
    };

    const card = createCard(cardData);
    insertCard(card, 'before');

    addCardForm.reset();
    toggleButtonState(addCardInputList, addCardButtonElement, inactiveButtonClass);
    closeAddCardPopup();
});

closeProfilePopupButton.addEventListener('click', () => {
    closeProfilePopup();
});

closeAddCardPopupButton.addEventListener('click', () => {
    closeAddCardPopup();
});

closeZoomPopupButton.addEventListener('click', () => {
    closeZoomPopup();
});
