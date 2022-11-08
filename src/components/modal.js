import { handleKeyboardKeyDown } from './utils.js'

export const profileName = document.querySelector('.profile__title-text');
export const profileDescription = document.querySelector('.profile__description');
export const profileImage = document.querySelector('.profile__image');
export const profileImageOverlay = document.querySelector('.profile__image-overlay');


// popups and buttons
const showPicturePopup = document.querySelector(`#display-picture`);
export const editProfilePopup = document.querySelector('#edit-profile-window');
export const editAvatarPopup = document.querySelector('#change-avatar');
export const addCardPopup = document.querySelector('#add-card-window');

const popupImage = showPicturePopup.querySelector('.popup__image');
const popupImageDesc = showPicturePopup.querySelector('.popup__image-description');

export const popups = document.querySelectorAll('.popup');

function openPopup(popupWindow) {
  popupWindow.classList.add('popup_visible');
  document.addEventListener('keydown', handleKeyboardKeyDown)
}

export function closePopup(popupWindow) {
  popupWindow.classList.remove('popup_visible');
  document.removeEventListener('keydown', handleKeyboardKeyDown)
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
  document.forms["add-card"].reset();
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

export function closeActivePopup() {
  popups.forEach(p => {
    if (p.classList.contains('popup_visible')) {
      closePopup(p);
    }
  });
}