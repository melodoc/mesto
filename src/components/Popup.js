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
        this._popupElement = document.querySelector(popupSelector);
        this.popupOpenedClass = 'popup_opened';
        this.popupClosedClass = 'popup__button_action_close';
    }

    open() {
        console.info(this._popupElement);
        // console.info(this.popupOpenedClass);
        this._popupElement.classList.add(this.popupOpenedClass);
        console.info(this._popupElement.classList);
        window.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove(this.popupOpenedClass);
        window.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains(this.popupOpenedClass)) {
                this.close();
            }
            if (evt.target.classList.contains(this.popupClosedClass)) {
                this.close();
            }
        });
    }
}
