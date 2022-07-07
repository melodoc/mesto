import { config, cardSelectors, profileSelectors, requestParams, loadingState } from '../constants/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { Api } from '../components/Api.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';

// open-close profile elements
const openProfileButton = document.querySelector('.profile__button_action_edit');

// input elements
const profilePopupNameInput = document.querySelector('.popup__input_type_name');
const profilePopupAboutInput = document.querySelector('.popup__input_type_about');
const profilePopupSaveButton = document.querySelector('.popup__button_action_submit');

//profile names
const profileAvatar = document.querySelector(profileSelectors.avatarWrapperSelector);

// submit form elements
const profileForm = document.querySelector('#profile .popup__form');
const addCardForm = document.querySelector('#add-card .popup__form');

// card template
const cardTemplate = document.querySelector('#card').content;
const openAddCardButton = document.querySelector('.profile__button_action_add');

// cards container
const cardsContainer = document.querySelector('.photo-grid__list');

// cards button
const deleteCardPopupSaveButton = document.querySelector('#delete-confirmation .popup__button_action_submit');

cardsContainer.textContent = loadingState.text;

const sharedPopup = new Popup(config.formSelector);
sharedPopup.setEventListeners();

const cardPopup = new PopupWithImage('#zoom-img');
cardPopup.setEventListeners();

const apiClient = new Api(requestParams);

const createCard = (item) => {
    return new Card(
        item,
        cardTemplate,
        ({ name, src }) => {
            cardPopup.open({ name, src });
        },
        handleCardConfirm,
        handleLikeButton
    ).createCard(cardSelectors);
};

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

apiClient
    .getCards()
    .then((cards) => {
        cardsContainer.textContent = '';
        renderedCards.setCards(cards);
    })
    .catch((err) => {
        console.error(err);
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

const profileFormUserInfo = new UserInfo({
    nameSelector: profileSelectors.nameSelector,
    aboutSelector: profileSelectors.aboutSelector,
    avatarSelector: profileSelectors.avatarSelector
});

profileFormUserInfo.setUserInfo({
    name: loadingState.text,
    about: loadingState.text,
    avatar: loadingState.img
});

apiClient
    .getUserInformation()
    .then((value) => {
        const { name, about, avatar } = value;
        profileFormUserInfo.setUserInfo({ name, about, avatar });
    })
    .catch((err) => {
        console.error(err);
    });

// Handlers for events
const handleProfileFormPopup = ({ name, about }) => {
    profilePopupSaveButton.textContent = 'Сохранение...';
    const { avatar } = profileFormUserInfo.getUserInfo();
    apiClient
        .editProfile(name, about)
        .then(() => {
            profileFormUserInfo.setUserInfo({ name, about, avatar });
            console.info('Успешно обновлены данные профиля');
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            profilePopupSaveButton.textContent = 'Сохранить';
            profileFormPopup.close();
        });
};

const handleOpenProfileButton = () => {
    const { name, about } = profileFormUserInfo.getUserInfo();

    profilePopupNameInput.setAttribute('value', name);
    profilePopupAboutInput.setAttribute('value', about);

    formValidators[profileForm.getAttribute('name')].resetValidation();
    profileFormPopup.open();
};

const handleAddCardFormPopup = (inputValues) => {
    apiClient
        .addNewCard(inputValues.title, inputValues.url)
        .then((value) => {
            const createdCard = createCard({
                name: inputValues.title,
                link: inputValues.url,
                owner: value.owner,
                _id: value._id
            });

            renderedCards.addItem(createdCard, true);
            console.info('Успешно добавлена карточка', value);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            addCardFormPopup.close();
        });
};

const handleLikeButton = (evt) => {
    evt.target.classList.toggle('card__like-button_state_active');
    const currentCard = evt.target.closest('.card');
    const cardId = currentCard.querySelector('.card__image').id;
    const isLiked = evt.target.classList.contains('card__like-button_state_active');
    const likeCount = currentCard.querySelector('.card__like-counter');

    if (isLiked) {
        apiClient
            .setLikeById(cardId)
            .then((value) => {
                likeCount.textContent = value.likes?.length ?? 0;
                console.info('Добавлен лайк для карточки:', cardId);
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        apiClient
            .deleteLikeById(cardId)
            .then((value) => {
                likeCount.textContent = value.likes?.length ?? 0;
                console.info('Убран лайк с карточки:', cardId);
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

const handleCardDelete = (evt) => {
    evt.preventDefault();
    const cardId = popupDeleteConfirmation.getCardId();
    deleteCardPopupSaveButton.textContent = 'Удаление...';
    apiClient
        .deleteCardById(cardId)
        .then(() => {
            document.getElementById(cardId).closest('.card').remove();
            console.info('Удалена карточка:', cardId);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            deleteCardPopupSaveButton.textContent = 'Да';
            popupDeleteConfirmation.close();
        });
};

const handleCardConfirm = (id) => {
    popupDeleteConfirmation.open(id);
};

const handleUpdateAvatar = (evt) => {
    evt.preventDefault();
    const { name, about } = profileFormUserInfo.getUserInfo();
    const avatar = document.querySelector('#update-avatar .popup__form').querySelector('.popup__input').value;
    profilePopupSaveButton.textContent = 'Сохранение...';
    apiClient
        .updateUserAvatar(avatar)
        .then((value) => {
            profileFormUserInfo.setUserInfo({ name, about, avatar });
            console.info('Успешно обновлен аватар профиля', value);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            deleteCardPopupSaveButton.textContent = 'Сохранить';
            popupAvatarUpdate.close();
        });
};

// classes initialization

const profileFormPopup = new PopupWithForm('#profile .popup__form', handleProfileFormPopup);
profileFormPopup.setEventListeners();
openProfileButton.addEventListener('click', handleOpenProfileButton);

const addCardFormPopup = new PopupWithForm('#add-card .popup__form', handleAddCardFormPopup);

addCardFormPopup.setEventListeners();

openAddCardButton.addEventListener('click', () => {
    formValidators[addCardForm.getAttribute('name')].resetValidation();
    addCardFormPopup.open();
});

const popupDeleteConfirmation = new PopupWithConfirmation('#delete-confirmation .popup__form', handleCardDelete);
popupDeleteConfirmation.setEventListeners();

const popupAvatarUpdate = new PopupWithConfirmation('#update-avatar .popup__form', handleUpdateAvatar);
popupAvatarUpdate.setEventListeners();

profileAvatar.addEventListener('click', (evt) => {
    popupAvatarUpdate.open();
});
