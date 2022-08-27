const initialCards = [
  { name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' },
  { name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' },
  { name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' },
  { name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' },
  { name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' },
  { name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' }
];

//form fields
const profileName = document.querySelector('.profile__title-text');
const profileDescription = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template');

// popups
const editProfilePopup = document.querySelector('#edit-profile-window');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const profileNameInput = editProfilePopup.querySelector('#profile-name');
const profileDescriptionInput = editProfilePopup.querySelector('#profile-description');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close-button');

const addCardPopup = document.querySelector('#add-card-window');
const addCardForm = addCardPopup.querySelector('.popup__form');
const pictureNameInput = addCardPopup.querySelector('#card-name');
const pictureUrlInput = addCardPopup.querySelector('#card-url');
const addCardCloseButton = addCardPopup.querySelector('.popup__close-button');

const showPicturePopup = document.querySelector(`#display-picture`);
const popupImage = showPicturePopup.querySelector('.popup__image');
const popupImageDesc = showPicturePopup.querySelector('.popup__image-description');
const showPictureCloseButton = showPicturePopup.querySelector('.popup__close-button');

function openPopup(window) {
  window.classList.toggle('popup_visible');
}

function closePopup(window) {
  window.classList.toggle('popup_visible');
}

function openEditProfilePopup() {
  profileDescriptionInput.value = profileDescription.textContent;
  profileNameInput.value = profileName.textContent;
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

function closeImagePopup() {
  closePopup(showPicturePopup);
}

function closeAddCardPopup() {
  closePopup(addCardPopup);
}

function closeEditProfilePopup() {
  closePopup(editProfilePopup);
}

function handleEditProfileSubmit(event) {
  event.preventDefault();
  submitNewProfileData(profileNameInput.value, profileDescriptionInput.value);
  closePopup(editProfilePopup);
}

function handleSaveCardSubmit(event) {
  event.preventDefault();
  renderCard(pictureNameInput.value, pictureUrlInput.value);
  closePopup(addCardPopup);
  pictureNameInput.value = "";
  pictureUrlInput.value = "";
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
  target.classList.toggle('element__like_checked')
}

function handleDeleteCardButton(event) {
  event.target.closest('.element').remove();
}

// event listeners for open/close buttons
editProfileButton.addEventListener('click', openEditProfilePopup);
editProfileCloseButton.addEventListener('click', closeEditProfilePopup);
addCardButton.addEventListener('click', openAddCardPopup);
addCardCloseButton.addEventListener('click', closeAddCardPopup);
showPictureCloseButton.addEventListener('click', closeImagePopup);

// submit forms
editProfileForm.addEventListener('submit', handleEditProfileSubmit);
addCardForm.addEventListener('submit', handleSaveCardSubmit);

//fill cards
initialCards.forEach(c => { renderCard(c.name, c.link) })
