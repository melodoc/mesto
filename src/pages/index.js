import { config, cardSelectors, profileSelectors, requestParams, loadingText } from '../constants/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { Api } from '../components/Api.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import loader from '../images/loader.gif';
import './index.css';

// open-close profile elements
const openProfileButton = document.querySelector('.profile__button_action_edit');

// input elements
const profilePopupNameInput = document.querySelector('.popup__input_type_name');
const profilePopupAboutInput = document.querySelector('.popup__input_type_about');

//profile names
const profileName = document.querySelector(profileSelectors.nameSelector);
const profileAbout = document.querySelector(profileSelectors.aboutSelector);
const profileAvatar = document.querySelector(profileSelectors.avatarSelector);

// submit form elements
const profileForm = document.querySelector('#profile .popup__form');
const addCardForm = document.querySelector('#add-card .popup__form');

// card template
const cardTemplate = document.querySelector('#card').content;
const openAddCardButton = document.querySelector('.profile__button_action_add');

// cards container
const cardsContainer = document.querySelector('.photo-grid__list');

const sharedPopup = new Popup(config.formSelector);
sharedPopup.setEventListeners();

const cardPopup = new PopupWithImage('#zoom-img');
cardPopup.setEventListeners();

const api = new Api(requestParams);

const createCard = (item) => {
    return new Card(item, cardTemplate, ({ name, src }) => {
        cardPopup.open({ name, src });
    }).createCard(cardSelectors);
};

const setLoadingState = () => {
    profileName.textContent = loadingText;
    profileAbout.textContent = loadingText;
    profileAvatar.src = loader;
    cardsContainer.textContent = loadingText;
};

setLoadingState();

const renderedCards = new Section(
    {
        items: [],
        renderer: (card) => {
            const createdCard = createCard(card);
            renderedCards.addItem(createdCard);
        }
    },
    config.cardListSelector
);

api.getCards().then((cards) => {
    cardsContainer.textContent = '';
    renderedCards.setCards(cards);
});

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

api.getUserInformation().then((value) => {
    profileName.textContent = value.name;
    profileAbout.textContent = value.about;
    profileAvatar.src = value.avatar;
});

const profileFormUserInfo = new UserInfo({
    nameSelector: profileSelectors.nameSelector,
    aboutSelector: profileSelectors.aboutSelector
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
