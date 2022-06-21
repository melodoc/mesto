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
        this._form = document.querySelector(this.popupSelector);
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitBtn = this._form.querySelector('.popup__button_action_submit');
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
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitHandler(this._getInputValues());
        });
    }

    close(element) {
        super.close(element);
        this._form.reset();
    }
}
