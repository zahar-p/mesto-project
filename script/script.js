console.log('script added');

const initialCards = [
  { name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' },
  { name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' },
  { name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' },
  { name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' },
  { name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' },
  { name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' }
];

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const submitButtons = document.querySelectorAll('.popup__submit-button');

const cardsContainer = document.querySelector('.elements');
const cards = document.querySelectorAll('.element__like');
const cardImages = document.querySelectorAll('.element__image');
const deleteButtons = document.querySelectorAll('.element__delete');

function openEditProfileWindow() {
  openPopup('edit-profile-window');
}

function openAddCardWindow() {
  openPopup('add-card-window');
}

function openImageWindow(event) {
  console.log(`open image clicked`)
  console.dir(event.target)
  const popupWindow = document.querySelector(`#display-picture`);
  const src = event.target.src;
  const alt = event.target.alt;
  popupWindow.querySelector('.popup__image').src = src;
  popupWindow.querySelector('.popup__image').alt = alt;
  popupWindow.querySelector('.popup__image-description').textContent = alt;
  
  popupWindow.classList.add('popup_visible');
  popupWindow.classList.remove('popup_invisible');
}
function openPopup(type) {
  console.log(`open ${type} clicked`)
  let popupWindow = document.querySelector(`#${type}`);
  popupWindow.classList.add('popup_visible');
  popupWindow.classList.remove('popup_invisible');
}

function closePopupWindow() {
  let popupWindow = document.querySelector('.popup_visible');
  popupWindow.classList.remove('popup_visible');
  popupWindow.classList.add('popup_invisible');
}

function popupSubmitButtonClicked(event) {
  event.preventDefault();
  console.log(`submit for ${event.target.id} clicked`);
  console.dir(event.target);
  if (event.target.id === 'add-card-submit') {
    const pictureName = document.querySelector('#card-name').value;
    const pictureUrl = document.querySelector('#card-url').value;
    addCard(pictureName, pictureUrl);
  } else if (event.target.id = 'edit-profile-window') {
    const profileName = document.querySelector('#profile-name').value;
    const profileDescription = document.querySelector('#profile-description').value;
    submitNewProfileData(profileName, profileDescription);
  }
  closePopupWindow();
}

function addCard(pictureName, pictureUrl) {
  const template = document.querySelector('#card-template').content;
  const newCard = template.querySelector('.element').cloneNode(true);
  newCard.querySelector('.element__text').textContent = pictureName;
  newCard.querySelector('.element__image').src = pictureUrl;
  newCard.querySelector('.element__image').alt = pictureName;
  newCard.querySelector('.element__image').addEventListener('click', openImageWindow);
  newCard.addEventListener('click', likeButtonClicked);
  const deleteButton = newCard.querySelector('.element__delete');
  deleteButton.addEventListener('click', deleteButtonClicked);
  cardsContainer.prepend(newCard);
}

function submitNewProfileData(name, description) {
  const profileName = document.querySelector('.profile__title-text');
  const profileDescription = document.querySelector('.profile__description');
  profileName.textContent = name;
  profileDescription.textContent = description;
}

function likeButtonClicked(event) {
  const target = event.target;
  if (target.classList.contains('element__like_unchecked')) {
    target.classList.remove('element__like_unchecked')
    target.classList.add('element__like_checked')
    console.log(target.previousElementSibling.textContent);
  } else if (event.target.classList.contains('element__like_checked')) {
    target.classList.remove('element__like_checked')
    target.classList.add('element__like_unchecked')
    console.log(target.previousElementSibling.textContent);
  }
}

function deleteButtonClicked(event) {
  event.target.parentElement.remove();
}

// event listeners for existing cards
cards.forEach(card => card.addEventListener('click', likeButtonClicked));
cardImages.forEach(image => image.addEventListener('click', openImageWindow))
deleteButtons.forEach(button => button.addEventListener('click', deleteButtonClicked))

// event listeners for open/close buttons
editProfileButton.addEventListener('click', openEditProfileWindow);
addCardButton.addEventListener('click', openAddCardWindow);
closePopupButtons.forEach(btn => btn.addEventListener('click', closePopupWindow))

// submit buttons
submitButtons.forEach(button => button.addEventListener('click', popupSubmitButtonClicked));

//fill cards
initialCards.forEach(c => { addCard(c.name, c.link) })
