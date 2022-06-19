/*
The Popup class contains public methods:
     + open and close, which are responsible for opening and closing the popup.
     + setEventListeners, which adds a click listener for the popup closing icon 
        and when clicking on the darkened area around the form.

Contains the _handleEscClose private method, which contains the logic for closing the popup with the Esc key.
*/
/** *
 * Popup is responsible for popup opening and closing
 *
 * @param popupSelector - Popup selector
 */
export class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
        this.popupOpenedClass = 'popup_opened';
        this.popupClosedClass = 'popup__button_action_close';

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    open (element) {
        element.classList.add(this.popupOpenedClass);
        window.addEventListener('keydown', this._handleEscClose);
    }

    close (element) {
        element.classList.remove(this.popupOpenedClass);
        window.removeEventListener('keydown', this._handleEscClose);
    };

    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector(this.popupSelector);
            this.close(openedPopup);
        }
    };

    setEventListeners () {
        const popups = document.querySelectorAll('.popup');

        popups.forEach((popupElement) => {
            popupElement.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains(this.popupOpenedClass)) {
                    this.close(popupElement);
                }
                if (evt.target.classList.contains(this.popupClosedClass)) {
                    this.close(popupElement);
                }
            });
        });
        
    }
}
