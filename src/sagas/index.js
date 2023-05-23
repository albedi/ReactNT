import { all, put, takeLatest } from "redux-saga/effects";
import mdInicio from "../modules/inicio/sagas";

function* fetchUser(action) {
  try {
    const user = { name: "Edgar" };
    yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

// Default debe estar en sobre la funcion generadora.
export default function* rootSaga() {
  // yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
  yield all([mySaga(), mdInicio()]);
}
