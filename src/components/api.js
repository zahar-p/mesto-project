const urlBase = 'https://nomoreparties.co/v1';
const cohortId = 'plus-cohort-16';
const authorizationToken = '251b89ee-22ba-4226-b520-08a3b73f3e6c';

const headerInfoJson = {
  authorization: authorizationToken,
  'Content-Type': 'application/json'
}

export function getUserInfo() {
  return fetch(
    `${urlBase}/${cohortId}/users/me`,
    { headers: headerInfoJson }
  )
}

export function getUserCards() {
  return fetch(
    `${urlBase}/${cohortId}/cards`,
    { headers: headerInfoJson }
  )
}

export function saveProfileData(name, about) {
  return fetch(
    `${urlBase}/${cohortId}/users/me`,
    {
      method: 'PATCH',
      headers: headerInfoJson,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }
  )
}

export function saveProfileAvatar(link) {
  return fetch(
    `${urlBase}/${cohortId}/users/me/avatar`,
    {
      method: 'PATCH',
      headers: headerInfoJson,
      body: JSON.stringify({
        avatar: link,
      })
    }
  )
}

export function saveCard(name, link) {
  return fetch(
    `${urlBase}/${cohortId}/cards`,
    {
      method: 'POST',
      headers: headerInfoJson,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }
  )
}

export function deleteCard(id) {
  return fetch(
    `${urlBase}/${cohortId}/cards/${id}`,
    {
      method: 'DELETE',
      headers: headerInfoJson
    })
}

export function likeCard(id) {
  return fetch(
    `${urlBase}/${cohortId}/cards/likes/${id}`,
    {
      method: 'PUT',
      headers: headerInfoJson
    })
}

export function unlikeCard(id) {
  return fetch(
    `${urlBase}/${cohortId}/cards/likes/${id}`,
    {
      method: 'DELETE',
      headers: headerInfoJson
    })
}