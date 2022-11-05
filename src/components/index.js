import '../styles/index.css'

const initialCards = [
  { name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' },
  { name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' },
  { name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' },
  { name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' },
  { name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' },
  { name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' }
];

import { enableValidation } from './validate.js'
import { renderCard } from './card.js'
import { closePopup, openChangeAvatarPopup, openEditProfilePopup, openAddCardPopup, editAvatarPopup, handleSaveCardSubmit } from './modal.js'
import { popups, profileName, profileDescription, profileImage, profileImageOverlay } from './modal.js'
import { handleMouseClick, handleKeyboardKeyDown } from './utils.js'

// Main page fields and buttons
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

function handleEditProfileSubmit(event) {
  event.preventDefault();
  submitNewProfileData(document.forms["edit-profile"].name.value, document.forms["edit-profile"].description.value);
  closePopup(editProfilePopup);
}

function submitNewProfileData(name, description) {
  profileName.textContent = name;
  profileDescription.textContent = description;
}

function handleChangeAvatarSubmit(event) {
  event.preventDefault();
  submitNewAvatar(document.forms["change-avatar"].url.value);
  closePopup(editAvatarPopup);
}

function submitNewAvatar(url) {
  profileImage.src = url;
}

// event listeners for open/close buttons
editProfileButton.addEventListener('click', openEditProfilePopup);
addCardButton.addEventListener('click', openAddCardPopup);
profileImageOverlay.addEventListener('click', openChangeAvatarPopup);



// submit forms listeners
document.forms["edit-profile"].addEventListener('submit', handleEditProfileSubmit);
document.forms["add-card"].addEventListener('submit', handleSaveCardSubmit);
document.forms["change-avatar"].addEventListener('submit', handleChangeAvatarSubmit);

// mouse/keyboard listeners
popups.forEach(p => {
  p.addEventListener('click', handleMouseClick)
});
document.addEventListener('keydown', handleKeyboardKeyDown)

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

//fill cards
initialCards.forEach(c => { renderCard(c.name, c.link) })
