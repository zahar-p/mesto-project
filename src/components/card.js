
import { openImagePopup } from './modal.js'

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template');

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

export { renderCard }