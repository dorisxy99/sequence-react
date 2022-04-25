import { sendRequest } from "./request";

const BASE_URL = '/api/match';

export function createMatch(body) {
  return sendRequest(BASE_URL, 'POST', body);
}

export function joinMatch(body) {
  return sendRequest(`${BASE_URL}/join`, 'POST', body);
}

export function playCard(body) {
  return sendRequest(`${BASE_URL}/playcard`, 'POST', body);
}

export function getMatch(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'GET');
}

export function getAllMatches() {
  return sendRequest(BASE_URL, 'GET');
}
