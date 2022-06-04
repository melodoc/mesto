const showInputError = (formElement, inputElement, validationProps) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationProps.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
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
        showInputError(formElement, inputElement, validationProps);
    } else {
        hideInputError(formElement, inputElement, validationProps);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

export const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement, validationProps) => {
    const inputList = Array.from(formElement.querySelectorAll(validationProps.inputSelector));
    const buttonElement = formElement.querySelector(validationProps.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationProps.inactiveButtonClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationProps);
            toggleButtonState(inputList, buttonElement, validationProps.inactiveButtonClass);
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
