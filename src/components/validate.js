// Validation
const isValid = (form, input, args) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.patternErrorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, args);
  } else {
    hideInputError(form, input, args);
  };
};

const showInputError = (form, input, validationMessage, args) => {
  const errorElement = form.querySelector(`.${input.id}-error`)
  input.classList.add(args.inputErrorClass);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(args.errorClass);
}

const hideInputError = (form, input, args) => {
  const errorElement = form.querySelector(`.${input.id}-error`)
  input.classList.remove(args.inputErrorClass);
  errorElement.classList.remove(args.errorClass);
  errorElement.textContent = '';
}

const hasInvalidInput = (inputs) => {
  return inputs.some((i) => {
    return !i.validity.valid;
  });
}

const toggleButtonState = (inputs, button, args) => {
  if (hasInvalidInput(inputs)) {
    button.disabled = true;
    button.classList.add(args.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(args.inactiveButtonClass);
  }
}

export function enableValidation(args) {
  const popupForms = Array.from(document.querySelectorAll(args.formSelector));
  popupForms.forEach(f => {
    const submitButton = f.querySelector(args.submitButtonSelector);
    const formInputs = Array.from(f.querySelectorAll(args.inputSelector));
    toggleButtonState(formInputs, submitButton, args)
    formInputs.forEach(i => {
      i.addEventListener('input', () => {
        isValid(f, i, args)
        toggleButtonState(formInputs, submitButton, args)
      });
    });
  });
}