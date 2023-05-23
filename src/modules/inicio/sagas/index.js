import { put, call, takeLatest } from "redux-saga/effects";
import {
  FND_CURRVAL,
  GET_CATEGORIES,
  GET_MESSAGES,
  POST_MESSAGE,
} from "../reducers/action-types";
import {
  setErrorMs,
  setLoading,
  setToFind,
  setCategories,
  setMessages,
  getMessages,
} from "../reducers/actions";
import { getAllCategories, getAllMessages, postMessage } from "./services";

function* findCurrentVal(acc) {
  try {
    yield put(setLoading(true));
    yield put(setErrorMs(undefined));
    // const res = yield call(currencyVal, acc.query);
    const data = undefined; // res.data;
    yield put(setCategories(data));
    return;
  } catch (err) {
    yield put(setErrorMs(err.message));
  } finally {
    yield put(setToFind(false));
    yield put(setLoading(false));
  }
}

function* getCategories(query) {
  try {
    yield put(setLoading(true));
    yield put(setErrorMs(undefined));
    const res = yield call(getAllCategories, query);
    const data = res.data;
    yield put(setCategories(data.categories));
    return;
  } catch (err) {
    yield put(setErrorMs(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* fnGetMessages(query) {
  try {
    yield put(setLoading(true));
    yield put(setErrorMs(undefined));
    const res = yield call(getAllMessages, query);
    const data = res.data;
    yield put(setMessages(data.messages));
    return;
  } catch (err) {
    yield put(setErrorMs(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* fnPostMessage(query) {
  try {
    yield put(setLoading(true));
    yield put(setErrorMs(undefined));
    yield call(postMessage, query.message);
    yield put(getMessages(query.message.userPortal.user_code));
    return;
  } catch (err) {
    yield put(setErrorMs(err.message));
  } finally {
    yield put(setLoading(false));
  }
}

export default function* mdInicio() {
  yield takeLatest(FND_CURRVAL, findCurrentVal);
  yield takeLatest(GET_CATEGORIES, getCategories);
  yield takeLatest(GET_MESSAGES, fnGetMessages);
  yield takeLatest(POST_MESSAGE, fnPostMessage);
}
