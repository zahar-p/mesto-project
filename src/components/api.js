const urlBase = 'https://nomoreparties.co/v1';
const cohortId = 'plus-cohort-16';
const authorizationToken = '251b89ee-22ba-4226-b520-08a3b73f3e6c';

const headersInfo = {
  authorization: authorizationToken
}

export function getUserInfo() {
  return fetch(
    `${urlBase}/${cohortId}/users/me`,
    { headers: headersInfo }
  )
}

export function getUserCards() {
  return fetch(
    `${urlBase}/${cohortId}/cards`,
    { headers: headersInfo }
  )
}