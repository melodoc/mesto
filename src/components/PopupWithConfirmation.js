import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this._handleConfirm = handleConfirm.bind(this);
        console.info(popupSelector);
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', this._handleConfirm);
    }

    open() {
        console.info();
        super.open();
        // evt.target.closest('.card').remove();
    }
}
