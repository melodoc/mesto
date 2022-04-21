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
