import {
  SET_LOADING,
  SET_TOFINDV,
  SET_ERRORMS,
  SET_ITEMVAL,
  FND_CURRVAL,
  GET_CATEGORIES,
  SET_CATEGORIES,
  GET_ALL_MESSAGES,
  GET_MESSAGES,
  SET_MESSAGES,
  POST_MESSAGE,
} from "./action-types";

export function setErrorMs(error) {
  return { type: SET_ERRORMS, error };
}

export function setLoading(loading) {
  return { type: SET_LOADING, loading };
}

export function setToFind(toFind) {
  return { type: SET_TOFINDV, toFind };
}

export function setItemValues(item) {
  return { type: SET_ITEMVAL, item };
}

export function fndCurrencyVal(query) {
  return { type: FND_CURRVAL, query };
}

export function getCategories(userCode) {
  return { type: GET_CATEGORIES, userCode };
}

export function setCategories(messages) {
  return { type: SET_CATEGORIES, messages };
}

export function getAllMessages() {
  return { type: GET_ALL_MESSAGES };
}

export function getMessages(userCode) {
  return { type: GET_MESSAGES, userCode };
}

export function setMessages(messages) {
  return { type: SET_MESSAGES, messages };
}

export function postMessage(message) {
  return { type: POST_MESSAGE, message };
}
