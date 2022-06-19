/*
Class FormValidator sets up form field validation:
     + accepts a settings object with selectors and form classes in the constructor;
     + takes as the second parameter an element of the form that is being validated;
     + has private methods that process the form: check the validity of the field, change the state of the submit button, set all handlers;
     + has a public enableValidation method that enables form validation.
*/
/**
 * A cardData object
 * @typedef {Object} validationProps
 * @property {string} formSelector - The selector of form
 * @property {string} inputSelector - The selector of input
 * @property {string} submitButtonSelector - The selector of submit button
 * @property {string} inactiveButtonClass - The class for inactive button
 * @property {string} inputErrorClass - The class for input error
 * @property {string} errorClass - The class of visible error
 */
/** *
 * Configures form field validation from {@link validationProps} for formElement
 *
 * @param formElement formElement
 * @param {validationProps} validationProps - The {@link validationProps} selectors of form
 */
export class FormValidator {
    constructor(formElement, validationProps) {
        this.formElement = formElement;
        this.validationProps = validationProps;
        this._inputList = Array.from(this.formElement.querySelectorAll(this.validationProps.inputSelector));
        this._buttonSubmit = this.formElement.querySelector(this.validationProps.submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.validationProps.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this.validationProps.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.validationProps.inputErrorClass);
        errorElement.classList.remove(this.validationProps.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonSubmit.classList.add(this.validationProps.inactiveButtonClass);
            this._buttonSubmit.disabled = true;
        } else {
            this._buttonSubmit.classList.remove(this.validationProps.inactiveButtonClass);
            this._buttonSubmit.disabled = false;
        }
    }

    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    _setEventListeners() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}
