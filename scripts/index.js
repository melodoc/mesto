import { initialCards, config, cardSelectors } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';

// open-close profile elements
const openProfileButton = document.querySelector('.profile__button_action_edit');
const profilePopup = document.querySelector('#profile');

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
const cardTemplate = document.querySelector('#card').content;
const openAddCardButton = document.querySelector('.profile__button_action_add');
const addCardPopup = document.querySelector('#add-card');

// set profile form data functions
function setInputValue(input, value) {
    input.setAttribute('value', value);
}

function setProfileFormData() {
    setInputValue(profilePopupNameInput, profileName.textContent);
    setInputValue(profilePopupAboutInput, profileAbout.textContent);
}

const popup = new Popup(config.popupOpenedSelector);
const cardPopup = new PopupWithImage('#zoom-img');

popup.setEventListeners();
cardPopup.setEventListeners();

function createCard(item) {
    return new Card(item, cardTemplate, cardPopup.open).createCard(cardSelectors);
}

const onLoadCards = new Section(
    {
        items: initialCards,
        renderer: (card) => {
            const createdCard = createCard(card);
            onLoadCards.addItem(createdCard);
        }
    },
    config.cardListSelector
);

onLoadCards.render();

// enable validation for forms

const formValidators = {};
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const formValidator = new FormValidator(formElement, config);
        const formName = formElement.getAttribute('name');

        formValidators[formName] = formValidator;
        formValidator.enableValidation();
    });
};

enableValidation(config);

openProfileButton.addEventListener('click', () => {
    setProfileFormData();
    formValidators[profileForm.getAttribute('name')].resetValidation();
    popup.open(profilePopup);
});

profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = profilePopupNameInput.value;
    profileAbout.textContent = profilePopupAboutInput.value;
    popup.close(evt.target.closest(config.popupOpenedSelector));
});

openAddCardButton.addEventListener('click', () => {
    popup.open(addCardPopup);
});

addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const cardData = [
        {
            name: addCardPopupTitleInput.value,
            link: addCardPopupUrlInput.value
        }
    ];

    const additionalCards = new Section(
        {
            items: cardData,
            renderer: (card) => {
                const createdCard = createCard(card);
                additionalCards.addItem(createdCard, true);
            }
        },
        config.cardListSelector
    );

    additionalCards.render();

    addCardForm.reset();
    formValidators[addCardForm.getAttribute('name')].resetValidation();
    popup.close(evt.target.closest(config.popupOpenedSelector));
});
