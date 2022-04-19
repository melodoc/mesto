const openProfileButton = document.querySelector('.profile__button_action_edit');
const closeProfileButton = document.querySelector('.popup__button_action_close');
const popup = document.querySelector('.popup');
const popupOpenedClass = 'popup_popup_opened';

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
