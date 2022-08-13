console.log('script added');

let editProfileButton = document.querySelector('.profile__edit-button');
let closeEditProfileButton = document.querySelector('.popup__close-button');
let submitEditProfileButton = document.querySelector('.popup__submit-button');
let addCardButton = document.querySelector('.profile__add-button');

function openEditProfile() {
  console.log('open edit profile clicked')
  let popupWindow = document.querySelector('.popup');
  // console.log(popupWindow);
  popupWindow.classList.add('popup_visible');
}

function submitEditProfile(evt) {
  console.log('submit edit profile')
  evt.preventDefault();
  let profileName = document.querySelector('#profile-name');
  let profileDescription = document.querySelector('#profile-text');
  let mainProfileName = document.querySelector('.profile__title-text');
  let mainProfiledescription = document.querySelector('.profile__description');


  if (profileName.value !== '' && profileDescription.value !== '') {
    console.log(`profileName ${profileName.value}`);
    console.log(`profileDescription ${profileDescription.value}`);
    mainProfileName.textContent = profileName.value;
    mainProfiledescription.textContent = profileDescription.value;
    // closeEditProfileWindow();
  } else {
    console.log('Имя или описание профайла не введены!');
    // closeEditProfileWindow();
  }
  closeEditProfileWindow();

}

function closeEditProfileWindow() {
  console.log('close edit profile clicked')
  let popupWindow = document.querySelector('.popup');
  // console.log(popupWindow);
  popupWindow.classList.remove('popup_visible');
}

function addCard() {
  console.log('add card clicked');
}

function buttonClicked(event) {
  // console.log(event);
  if (event.target.classList.contains('element__like')) {
    let elementText = event.path[1].querySelector('.element__text').textContent;
    // console.log(elementText)
    if (event.target.classList.contains('element__like_unchecked')) {
      event.target.classList.remove('element__like_unchecked')
      event.target.classList.add('element__like_checked')
      console.log(`${elementText} liked!`);
    } else if (event.target.classList.contains('element__like_checked')) {
      event.target.classList.remove('element__like_checked')
      event.target.classList.add('element__like_unchecked')
      console.log(`${elementText} unlike! :(`);
    } else {
      // just for debugging
      console.log(`Some thing wrong clicked !!!!!!!!!!!!!!!!!!!!!`);
    }
  } else {
    console.log(`clicked: ${event.target.classList}`)
  }
}

addEventListener('click', buttonClicked)

editProfileButton.addEventListener('click', openEditProfile);
closeEditProfileButton.addEventListener('click', closeEditProfileWindow);
submitEditProfileButton.addEventListener('click', submitEditProfile);
addCardButton.addEventListener('click', addCard);