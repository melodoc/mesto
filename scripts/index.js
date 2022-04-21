// open-close implementation
const openProfileButton = document.querySelector('.profile__button_action_edit');
const closeProfileButton = document.querySelector('.popup__button_action_close');
const popup = document.querySelector('.popup');
const popupOpenedClass = 'popup_opened';

function openProfile() {
    if (!popup.classList.contains(popupOpenedClass)) {
        popup.classList.add(popupOpenedClass);
    }
}

function closeProfile() {
    popup.classList.remove(popupOpenedClass);
}

openProfileButton.addEventListener('click', openProfile);
closeProfileButton.addEventListener('click', closeProfile);

// input manage

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__text');
const popUpNameInput = document.querySelector('.popup__input_type_name');
const popUpAboutInput = document.querySelector('.popup__input_type_about');

function setInputValue(input, value) {
    input.setAttribute('value', value);
}

function setInitialFormData() {
    setInputValue(popUpNameInput, profileName.textContent);
    setInputValue(popUpAboutInput, profileAbout.textContent);
}

setInitialFormData();

// submit form

const formElement = document.querySelector('.popup__form');

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popUpNameInput.value;
    profileAbout.textContent = popUpAboutInput.value;
    closeProfile();
}

formElement.addEventListener('submit', formSubmitHandler);
