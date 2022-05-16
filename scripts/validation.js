const showInputError = (formElement, inputElement, errorMessage, validationProps) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationProps.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationProps.errorClass);
};

const hideInputError = (formElement, inputElement, validationProps) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationProps.inputErrorClass);
    errorElement.classList.remove(validationProps.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationProps) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationProps);
    } else {
        hideInputError(formElement, inputElement, validationProps);
    }
};

const hasInvalidInput = (inputList) => {
    // iterate through this array with the some method
    return inputList.some((inputElement) => {
        // If the field is not valid, the callback will return true
        // Array traversal will stop and the whole function
        // hasInvalidInput will return true

        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, validationProps) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationProps.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationProps.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement, validationProps) => {
    const inputList = Array.from(formElement.querySelectorAll(validationProps.inputSelector));
    const buttonElement = formElement.querySelector(validationProps.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationProps);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationProps);
            toggleButtonState(inputList, buttonElement, validationProps);
        });
    });
};

export const enableValidation = (validationProps) => {
    const formList = Array.from(document.querySelectorAll(validationProps.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationProps);
    });
};
