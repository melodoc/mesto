import { Popup } from './Popup.js';
/** *
 * PopupWithForm is responsible for popup with form opening and closing
 *
 * @param popupSelector - Popup with form selector
 * @param formSubmitHandler - formSubmitHandler
 */
export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'));
        this._submitBtn = this._popupElement.querySelector('.popup__button_action_submit');
        this._formSubmitHandler = formSubmitHandler;
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitHandler(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupElement.reset();
    }
}
