
import { openImagePopup } from './modal.js'

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template');

function createCard(userId, { likes, _id, name, link, owner, ...rest }) {
  const newCard = cardTemplate.content.querySelector('.element').cloneNode(true);
  const likeCntHoder = newCard.querySelector('.element__like-counter');
  const image = newCard.querySelector('.element__image');
  const deleteButton = newCard.querySelector('.element__delete');
  const likeButton = newCard.querySelector('.element__like');

  console.log(likes)
  newCard.querySelector('.element__text').textContent = name;
  image.src = link;
  image.alt = name;
  image.addEventListener('click', openImagePopup);
  likeCntHoder.textContent = likes.length;
  
  if (owner._id !== userId) {
    deleteButton.classList.add('element__delete_hidden')
  }

  
  if (likes.find( user => { user._id === userId })) {
    likeButton.classList.add('element__like_checked')
  }

  deleteButton.addEventListener('click', handleDeleteCardButton);
  likeButton.addEventListener('click', handleLikeButton);
  return newCard;
}

function renderCard(userId, card) {
  console.log(userId)
  console.log(card)
  cardsContainer.prepend(createCard(userId, card));
}

function handleLikeButton(event) {
  const target = event.target;
  const cnt = target.nextElementSibling;
  target.classList.toggle('element__like_checked')
  // я поспешил добавить счетчик лайков здест, взаимодействие с сервером это следующая итерация.
  // в части про взаимодействие с сервером я это сделаю как надо. Давайте оставим как есть, чтобв не убирать счетчик в этой ветке?
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