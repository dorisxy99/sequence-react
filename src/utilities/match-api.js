import { sendRequest } from "./request";

const BASE_URL = '/api/match';

export function createMatch(body) {
  return sendRequest(BASE_URL, 'POST', body);
}

export function getMatch(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'GET');
}

export function getAllMatches() {
  return sendRequest(BASE_URL, 'GET');
}
