export const cardSelectors = {
    header: '.card__header',
    image: '.card__image',
    like: '.card__like-button',
    deleteButton: '.card__trash-button'
};

export const elementPositionType = {
    AFTER: `after`,
    BEFORE: `before`
};

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_action_submit',
    cardListSelector: '.photo-grid__list',
    inactiveButtonClass: 'popup__button_submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    popupOpenedSelector: '.popup_opened'
};

export const profileSelectors = {
    nameSelector: '.profile__name',
    aboutSelector: '.profile__text',
    avatarSelector: '.profile__avatar'
}

export const requestParams = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
    headers: {
        authorization: '3c1fcffa-d896-45ce-aee1-75cf9173f520',
        'Content-Type': 'application/json'
    }
};

export const loadingText = 'Загрузка...';