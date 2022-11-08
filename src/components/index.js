import '../styles/index.css'

let userId = '';
const savingButtonText = 'Сохранение...';

import { enableValidation, disablePopupButton } from './validate.js'
import { renderCard } from './card.js'
import { closePopup, openChangeAvatarPopup, openEditProfilePopup, openAddCardPopup, editAvatarPopup } from './modal.js'
import { popups, profileName, profileDescription, profileImage, profileImageOverlay, editProfilePopup, addCardPopup } from './modal.js'
import { handleMouseClick, handleKeyboardKeyDown } from './utils.js'
import { getUserInfo, getUserCards, saveProfileData, saveCard, saveProfileAvatar } from './api.js'

// Main page fields and buttons
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const submitProfileDataButton = editProfilePopup.querySelector('.popup__submit-button')
const submitAvatarButton = editAvatarPopup.querySelector('.popup__submit-button')
const submitCardButton = addCardPopup.querySelector('.popup__submit-button')


function handleEditProfileSubmit(event) {
  event.preventDefault();
  patchProfileData(document.forms["edit-profile"].name.value, document.forms["edit-profile"].description.value);
}

function submitNewProfileData(name, description) {
  profileName.textContent = name;
  profileDescription.textContent = description;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

// SUBMIT profile data
function patchProfileData(name, about) {
  // вот этот код как в лекции, в разметке меняет, визуально не меняет  
  submitProfileDataButton.textContent = savingButtonText;
  saveProfileData(name, about)
    .then(data => {
      submitNewProfileData(data.name, data.about)
      closePopup(editProfilePopup);
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    })
    .finally(
      submitProfileDataButton.textContent = 'Сохранить'
    );
}

// SUBMIT avatar change
function handleChangeAvatarSubmit(event) {
  event.preventDefault();
  const link = document.forms["change-avatar"].url.value
  submitAvatarButton.textContent = savingButtonText
  saveProfileAvatar(link)
    .then(data => {
      submitNewAvatar(data.avatar);
      closePopup(editAvatarPopup);
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    })
    .finally(
      submitAvatarButton.textContent = 'Сохранить'
    );
}

function submitNewAvatar(url) {
  profileImage.src = url;
}

// SUBMIT new card
function handleSaveCardSubmit(event) {
  event.preventDefault();
  submitCardButton.textContent = savingButtonText
  saveCard(document.forms["add-card"].name.value, document.forms["add-card"].url.value)
    .then(data => {
      renderCard(userId, data);
      closePopup(addCardPopup);
      document.forms.reset;
      disablePopupButton(document.forms["add-card"].querySelector('.popup__submit-button'))
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    })
    .finally(
      submitCardButton.textContent = 'Создать'
    );
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

// почему то без этого не ловится Esc, если фокус не в инпуте
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


function populateUserInfo({ about, avatar, cohort, name, _id }) {
  userId = _id;
  submitNewAvatar(avatar);
  submitNewProfileData(name, about);
}

//fill user and cards
Promise.all([getUserInfo(), getUserCards()])
  .then(([userData, cards]) => {
    populateUserInfo(userData);
    cards.forEach(
      c => renderCard(userId, c)
    );
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
