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
const profileNameInput = document.querySelector('#profile-name');
const profileDescriptionInput = document.querySelector('#profile-description');
const editProfileSubmitButton = document.querySelector('#edit-profile-submit');

const addCardPopup = document.querySelector('#add-card-window');
const pictureNameInput = document.querySelector('#card-name');
const pictureUrlInput = document.querySelector('#card-url');
const saveCardButton = document.querySelector('#add-card-submit');

const showPicturePopup = document.querySelector(`#display-picture`);
const popupImage = showPicturePopup.querySelector('.popup__image');
const popupImageDesc = showPicturePopup.querySelector('.popup__image-description');

const closePopupButtons = document.querySelectorAll('.popup__close-button');

function openPopup(window) {
  window.classList.add('popup_visible');
  window.classList.remove('popup_invisible');
}

function closePopup(window) {
  window.classList.remove('popup_visible');
  window.classList.add('popup_invisible');
}

function openEditProfileWindow() {
  profileDescriptionInput.value = profileDescription.textContent;
  profileNameInput.value = profileName.textContent;
  openPopup(editProfilePopup);
}

function openAddCardWindow() {
  openPopup(addCardPopup);
}

function openImageWindow(event) {
  const src = event.target.src;
  const alt = event.target.alt;
  popupImage.src = src;
  popupImage.alt = alt;
  popupImageDesc.textContent = alt;
  openPopup(showPicturePopup);
}

function closePopupWindow() {
  const popupWindow = document.querySelector('.popup_visible');
  closePopup(popupWindow);
}

function handleSubmitProfileButton(event) {
  event.preventDefault();
  submitNewProfileData(profileNameInput.value, profileDescriptionInput.value);
  closePopupWindow();
}

function handleSaveCardButton(event) {
  event.preventDefault();
  renderCard(pictureNameInput.value, pictureUrlInput.value);
  closePopupWindow();
  pictureNameInput.value = "";
  pictureUrlInput.value = "";
}

function createCard(pictureName, pictureUrl) {
  const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
  const image = newCard.querySelector('.element__image');
  const deleteButton = newCard.querySelector('.element__delete');

  newCard.querySelector('.element__text').textContent = pictureName;
  image.src = pictureUrl;
  image.alt = pictureName;
  image.addEventListener('click', openImageWindow);

  deleteButton.addEventListener('click', deleteButtonClicked);
  newCard.addEventListener('click', handleLikeButton);
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

function deleteButtonClicked(event) {
  event.target.closest('.element').remove();
}

// event listeners for open/close buttons
editProfileButton.addEventListener('click', openEditProfileWindow);
addCardButton.addEventListener('click', openAddCardWindow);
closePopupButtons.forEach(btn => btn.addEventListener('click', closePopupWindow))

// submit buttons
editProfileSubmitButton.addEventListener('click', handleSubmitProfileButton);
saveCardButton.addEventListener('click', handleSaveCardButton);

//fill cards
initialCards.forEach(c => { renderCard(c.name, c.link) })
