import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this._handleConfirm = handleConfirm.bind(this);
        this._cardId;
    }

    getCardId() {
        return this._cardId;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', this._handleConfirm);
    }

    open(id) {
        super.open();
        this._cardId = id;
    }
}
