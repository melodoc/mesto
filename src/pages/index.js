import { config, cardSelectors, profileSelectors, requestParams, loadingState } from '../constants/constants.js';
import { renderLoading, buttonType, messageType } from '../utils/utils.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
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

// Buttons
const profilePopupSaveButton = document.querySelector('#profile .popup__button_action_submit');
const updateAvatarButton = document.querySelector('#update-avatar .popup__button_action_submit');
const deleteCardPopupSaveButton = document.querySelector('#delete-confirmation .popup__button_action_submit');
const addCardFormButton = document.querySelector('#add-card .popup__button_action_submit');

//profile names
const profileAvatar = document.querySelector(profileSelectors.avatarWrapperSelector);
const profileAvatarInput = document.querySelector('#update-avatar .popup__form').querySelector('.popup__input');

// submit form elements
const profileForm = document.querySelector('#profile .popup__form');
const addCardForm = document.querySelector('#add-card .popup__form');

// card template
const cardTemplate = document.querySelector('#card').content;
const openAddCardButton = document.querySelector('.profile__button_action_add');

// cards container
const cardsContainer = document.querySelector('.photo-grid__list');

cardsContainer.textContent = loadingState.text;

const popupImage = new PopupWithImage('#zoom-img');
popupImage.setEventListeners();

const apiClient = new Api(requestParams);

const createCard = (item) => {
    return new Card(
        item,
        // получать с сервера и передавать в конструктор
        'e33c29cd8084db82bb563ae9',
        cardTemplate,
        ({ name, src }) => {
            popupImage.open({ name, src });
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

Promise.all([apiClient.getUserInformation(), apiClient.getCards()])
    .then(([userInformation, cards]) => {
        console.log(userInformation._id);
        const { name, about, avatar } = userInformation;
        profileFormUserInfo.setUserInfo({ name, about, avatar });

        cardsContainer.textContent = '';
        renderedCards.setCards(cards);
    })
    .catch((err) => {
        console.error(err);
    });

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

// Handlers for events
const handleProfileFormPopup = ({ name, about }) => {
    renderLoading(profilePopupSaveButton, buttonType.LOADING);
    apiClient
        .editProfile(name, about)
        .then(() => {
            profileFormUserInfo.setUserNameInfo({ name, about });
            popupEditProfile.close();
            console.info('Успешно обновлены данные профиля');
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            renderLoading(profilePopupSaveButton, buttonType.UPLOADED);
        });
};

const handleOpenProfileButton = () => {
    const { name, about } = profileFormUserInfo.getUserInfo();

    profilePopupNameInput.setAttribute('value', name);
    profilePopupAboutInput.setAttribute('value', about);

    formValidators[profileForm.getAttribute('name')].resetValidation();
    popupEditProfile.open();
};

const handleAddCardFormPopup = (inputValues) => {
    renderLoading(addCardFormButton, buttonType.LOADING);
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
            popupAddCard.close();
            console.info('Успешно добавлена карточка', value.name);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            renderLoading(addCardFormButton, buttonType.UPLOADED);
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
    renderLoading(deleteCardPopupSaveButton, buttonType.LOADING, messageType.DELETE);
    apiClient
        .deleteCardById(cardId)
        .then(() => {
            document.getElementById(cardId).closest('.card').remove();
            popupDeleteConfirmation.close();
            console.info('Удалена карточка:', cardId);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            renderLoading(deleteCardPopupSaveButton, buttonType.UPLOADED, messageType.DELETE);
        });
};

const handleCardConfirm = (id) => {
    popupDeleteConfirmation.open(id);
};

const handleUpdateAvatar = (evt) => {
    evt.preventDefault();
    renderLoading(updateAvatarButton, buttonType.LOADING);
    apiClient
        .updateUserAvatar(profileAvatarInput.value)
        .then((value) => {
            profileFormUserInfo.setUserAvatar(profileAvatarInput.value);
            popupAvatarUpdate.close();
            console.info('Успешно обновлен аватар профиля', value);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            renderLoading(updateAvatarButton, buttonType.UPLOADED);
        });
};

// classes initialization

const popupEditProfile = new PopupWithForm('#profile .popup__form', handleProfileFormPopup);
popupEditProfile.setEventListeners();
openProfileButton.addEventListener('click', handleOpenProfileButton);

const popupAddCard = new PopupWithForm('#add-card .popup__form', handleAddCardFormPopup);

popupAddCard.setEventListeners();

openAddCardButton.addEventListener('click', () => {
    formValidators[addCardForm.getAttribute('name')].resetValidation();
    popupAddCard.open();
});

const popupDeleteConfirmation = new PopupWithConfirmation('#delete-confirmation .popup__form', handleCardDelete);
popupDeleteConfirmation.setEventListeners();

const popupAvatarUpdate = new PopupWithConfirmation('#update-avatar .popup__form', handleUpdateAvatar);
popupAvatarUpdate.setEventListeners();

profileAvatar.addEventListener('click', (evt) => {
    popupAvatarUpdate.open();
});
