/*
The FormValidator class that sets up form field validation:
     + accepts a settings object with selectors and form classes in the constructor;
     + takes as the second parameter an element of the form that is being validated;
     + has private methods that process the form: check the validity of the field, change the state of the submit button, set all handlers;
     + has a public enableValidation and toggleButtonState method that enables form validation.
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
 * Configures form field validation from {@link validationProps} for formList
 *
 * @param {validationProps} validationProps - The {@link validationProps} selectors of form
 * @param formList form list of elements
 */
export class FormValidator {
    constructor(validationProps, formList) {
        this.validationProps = validationProps;
        this.formList = formList;
    }

    _showInputError (formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.validationProps.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this.validationProps.errorClass);
    }

    _hideInputError (formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.validationProps.inputErrorClass);
        errorElement.classList.remove(this.validationProps.errorClass);
        errorElement.textContent = '';
    }
    
    _checkInputValidity (formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    }

    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.validationProps.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this.validationProps.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this.validationProps.inputSelector));
        const buttonElement = formElement.querySelector(this.validationProps.submitButtonSelector);

        this.toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this.toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation() {
        this.formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners(formElement);
        });
    }
}
