import { renderCard } from './card.js'

// popups and buttons
const showPicturePopup = document.querySelector(`#display-picture`);
const editProfilePopup = document.querySelector('#edit-profile-window');
const editAvatarPopup = document.querySelector('#change-avatar');
const addCardPopup = document.querySelector('#add-card-window');

const popupImage = showPicturePopup.querySelector('.popup__image');
const popupImageDesc = showPicturePopup.querySelector('.popup__image-description');

export const popups = document.querySelectorAll('.popup');

function openPopup(window) {
  window.classList.toggle('popup_visible');
}

export function closePopup(window) {
  window.classList.toggle('popup_visible');
}

export function openChangeAvatarPopup() {
  document.forms["change-avatar"].url.value = profileImage.src;
  openPopup(editAvatarPopup);
}

export function openEditProfilePopup() {
  document.forms["edit-profile"].name.value = profileName.textContent;
  document.forms["edit-profile"].description.value = profileDescription.textContent;
  openPopup(editProfilePopup);
}

export function openAddCardPopup() {
  openPopup(addCardPopup);
}

export function openImagePopup(event) {
  const src = event.target.src;
  const alt = event.target.alt;
  popupImage.src = src;
  popupImage.alt = alt;
  popupImageDesc.textContent = alt;
  openPopup(showPicturePopup);
}

// SUBMIT handlers
export function handleSaveCardSubmit(event) {
  event.preventDefault();
  renderCard(document.forms["add-card"].name.value, document.forms["add-card"].url.value);
  closePopup(addCardPopup);
  document.forms["add-card"].name.value = "";
  document.forms["add-card"].url.value = "";
}


export function closeActivePopup() {
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