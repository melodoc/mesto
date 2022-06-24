import { initialCards, config, cardSelectors } from '../constants/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';

// open-close profile elements
const openProfileButton = document.querySelector('.profile__button_action_edit');

// input elements
const profilePopupNameInput = document.querySelector('.popup__input_type_name');
const profilePopupAboutInput = document.querySelector('.popup__input_type_about');

// submit form elements
const profileForm = document.querySelector('#profile .popup__form');
const addCardForm = document.querySelector('#add-card .popup__form');

// card template
const cardTemplate = document.querySelector('#card').content;
const openAddCardButton = document.querySelector('.profile__button_action_add');

const sharedPopup = new Popup(config.formSelector);
sharedPopup.setEventListeners();

const cardPopup = new PopupWithImage('#zoom-img');
cardPopup.setEventListeners();

function createCard(item) {
    return new Card(item, cardTemplate, ({ name, src }) => {
        cardPopup.open({ name, src });
    }).createCard(cardSelectors);
}

const renderedCards = new Section(
    {
        items: initialCards,
        renderer: (card) => {
            const createdCard = createCard(card);
            renderedCards.addItem(createdCard);
        }
    },
    config.cardListSelector
);

renderedCards.render();

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

const profileFormUserInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__text'
});

const profileFormPopup = new PopupWithForm('#profile .popup__form', ({ name, about }) => {
    profileFormUserInfo.setUserInfo({ name, about });
    profileFormPopup.close();
});

profileFormPopup.setEventListeners();

openProfileButton.addEventListener('click', () => {
    const { name, about } = profileFormUserInfo.getUserInfo();

    profilePopupNameInput.setAttribute('value', name);
    profilePopupAboutInput.setAttribute('value', about);

    formValidators[profileForm.getAttribute('name')].resetValidation();
    profileFormPopup.open();
});

const addCardFormPopup = new PopupWithForm('#add-card .popup__form', (inputValues) => {
    const createdCard = createCard({
        name: inputValues.title,
        link: inputValues.url
    });
    renderedCards.addItem(createdCard, true);
    addCardFormPopup.close();
});

addCardFormPopup.setEventListeners();

openAddCardButton.addEventListener('click', () => {
    formValidators[addCardForm.getAttribute('name')].resetValidation();
    addCardFormPopup.open();
});
