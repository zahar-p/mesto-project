const initialCards = [
  { name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' },
  { name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' },
  { name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' },
  { name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' },
  { name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' },
  { name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' }
];

// Main page fields and buttons
const profileName = document.querySelector('.profile__title-text');
const profileDescription = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template');

// popups and buttons
const editProfilePopup = document.querySelector('#edit-profile-window');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close-button');

const addCardPopup = document.querySelector('#add-card-window');
const addCardCloseButton = addCardPopup.querySelector('.popup__close-button');

const showPicturePopup = document.querySelector(`#display-picture`);
const popupImage = showPicturePopup.querySelector('.popup__image');
const popupImageDesc = showPicturePopup.querySelector('.popup__image-description');
const showPictureCloseButton = showPicturePopup.querySelector('.popup__close-button');

const popups = document.querySelectorAll('.popup');

function openPopup(window) {
  window.classList.toggle('popup_visible');
}

function closePopup(window) {
  window.classList.toggle('popup_visible');
}

function openEditProfilePopup() {
  document.forms["edit-profile"].name.value = profileName.textContent;
  document.forms["edit-profile"].description.value = profileDescription.textContent;
  openPopup(editProfilePopup);
}

function openAddCardPopup() {
  openPopup(addCardPopup);
}

function openImagePopup(event) {
  const src = event.target.src;
  const alt = event.target.alt;
  popupImage.src = src;
  popupImage.alt = alt;
  popupImageDesc.textContent = alt;
  openPopup(showPicturePopup);
}

function handleEditProfileSubmit(event) {
  event.preventDefault();
  submitNewProfileData(document.forms["edit-profile"].name.value, document.forms["edit-profile"].description.value);
  closePopup(editProfilePopup);
}

function handleSaveCardSubmit(event) {
  event.preventDefault();
  renderCard(document.forms["add-card"].name.value, document.forms["add-card"].url.value);
  closePopup(addCardPopup);
  document.forms["add-card"].name.value = "";
  document.forms["add-card"].url.value = "";
}

function createCard(pictureName, pictureUrl) {
  const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
  const image = newCard.querySelector('.element__image');
  const deleteButton = newCard.querySelector('.element__delete');
  const likeButton = newCard.querySelector('.element__like');

  newCard.querySelector('.element__text').textContent = pictureName;
  image.src = pictureUrl;
  image.alt = pictureName;
  image.addEventListener('click', openImagePopup);

  deleteButton.addEventListener('click', handleDeleteCardButton);
  likeButton.addEventListener('click', handleLikeButton);
  return newCard;
}

function renderCard(pictureName, pictureUrl) {
  cardsContainer.prepend(createCard(pictureName, pictureUrl));
}

function submitNewProfileData(name, description) {
  profileName.textContent = name;
  profileDescription.textContent = description;
}

function handleLikeButton(event) {
  const target = event.target;
  let cnt = target.nextElementSibling;
  target.classList.toggle('element__like_checked')
  if (target.classList.contains('element__like_checked')) {
    cnt.textContent = Number(cnt.textContent) + 1;
  } else {
    cnt.textContent = Number(cnt.textContent) - 1;
  }
}

function handleDeleteCardButton(event) {
  event.target.closest('.element').remove();
}

function closeActivePopup() {
  popups.forEach(p => {
    if (p.classList.contains('popup_visible')) {
      const form = p.querySelector('.popup__form')
      closePopup(p);
      if (form) {
        form.reset()
      }
    }
  });
}

// event listeners for open/close buttons
editProfileButton.addEventListener('click', openEditProfilePopup);
addCardButton.addEventListener('click', openAddCardPopup);

// Mouse click
function handleMouseClick(evt) {
  if (evt.target.classList.contains('popup') ||
    evt.target.classList.contains('popup__close-button')) {
    closeActivePopup();
  }
}
popups.forEach(p => {
  p.addEventListener('click', handleMouseClick)
});

// Keyboard key up
function handleKeyboardKeyUp(evt) {
  if (evt.key === 'Escape') {
    closeActivePopup();
  }
}
document.addEventListener('keyup', handleKeyboardKeyUp)

// submit forms listeners
document.forms["edit-profile"].addEventListener('submit', handleEditProfileSubmit);
document.forms["add-card"].addEventListener('submit', handleSaveCardSubmit);

//fill cards
initialCards.forEach(c => { renderCard(c.name, c.link) })

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

function enableValidation(args) {
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

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
}); 