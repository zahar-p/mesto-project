
import { openImagePopup } from './modal.js'
import { deleteCard, likeCard, unlikeCard } from './api.js'

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template');

function createCard(userId, { likes, _id, name, link, owner, ...rest }) {
  const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
  const likeCntHoder = newCard.querySelector('.element__like-counter');
  const image = newCard.querySelector('.element__image');
  const deleteButton = newCard.querySelector('.element__delete');
  const likeButton = newCard.querySelector('.element__like');

  newCard.id = _id;
  newCard.querySelector('.element__text').textContent = name;
  image.src = link;
  image.alt = name;
  image.addEventListener('click', openImagePopup);
  likeCntHoder.textContent = likes.length;
  deleteButton.dataset.cardId = _id
  likeButton.dataset.cardId = _id

  if (owner._id !== userId) {
   deleteButton.classList.add('element__delete_hidden')
  }
  if (likes.some(user => user._id === userId)) {
    likeButton.classList.add('element__like_checked')
  }
  deleteButton.addEventListener('click', handleDeleteCardButton);
  likeButton.addEventListener('click', handleLikeButton);
  return newCard;
}

function renderCard(userId, card) {
  cardsContainer.prepend(createCard(userId, card));
}

function handleLikeButton(event) {
  const target = event.target;
  const cnt = target.nextElementSibling;
  const liked = !target.classList.contains('element__like_checked')

  let cardHandlePromise = null;

  if (liked) {
    cardHandlePromise = likeCard(target.dataset.cardId)
  } else {
    cardHandlePromise = unlikeCard(target.dataset.cardId)
  }

  cardHandlePromise
    .then(data => {
      target.classList.toggle('element__like_checked')
      cnt.textContent = data.likes.length;
    })
    .catch(err => {
      console.log(err)
    })
}

function handleDeleteCardButton(event) {
  deleteCard(event.target.dataset.cardId)
    .then(data => {
      event.target.closest('.element').remove()
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
}

export { renderCard }