import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

import mdInicio from "../modules/inicio/reducers";

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  counter: 0,
};

/**
 * best-pratices
 * - Avoid having only one reducer.
 *   + So in store.js all you need to do is combine your different reducers.
 * - Proxy access to the state
 *   + you need to allow your components to access the state via selector.
 * - Prefix the name of your actions
 *   + Actions are in uppercase letters separated by ’_’. Here an example with this action: SET_USERS.
 * - Keep the immutability and readability of your reducers
 *   + const newState = {...state,
 * - Do not use the default case
 *   + Avoid functional use for default case: switch{ default: return { value: 'bar' } }
 * - Use custom middlewares
 *   + Avoids code duplication.
 * - Avoid redux related rerender
 *   + re-render caused by the use of redux really has to be prevented
 * - Do not create a reference in the selector
 *   + const defaultUser = {}
 * - Do not transform your data in the components
 * - Don’t use useReducer for your business data
 */

function mainState(state = initialState, action) {
  return state;
}

const allReducers = combineReducers({ mainState, mdInicio });

const logger = (store) => (next) => (action) => {
  // agrupamos lo que vamos a mostrar en
  // consola usando el tipo de la acción
  console.group(action.type);
  // mostramos el estado actual del store
  console.debug("current state", store.getState());

  // mostramos la acción despachada
  console.debug("action", action);

  // empezamos a contar cuanto se tarda en
  // aplicar la acción
  console.time(action.type);

  // pasamos la acción al store
  next(action);

  // terminamos de contar
  console.timeEnd(action.type);

  // mostramos el estado nuevo
  console.debug("new state", store.getState());
  // terminamos el grupo
  console.groupEnd();
};

// Delete logger middleware if it isn't usefull.
const mainStore = createStore(
  allReducers,
  applyMiddleware(logger, sagaMiddleware)
);

//console.log(mySaga);
sagaMiddleware.run(rootSaga);

/**
 * Siempre es posible suscribirse al Redux para auditar lo que sucede. 
 * - Is possible to subscribe to the objet to check what is happening. 
mainStore.subscribe(() => {
  console.log(mainStore.getState())
});
 */

export default mainStore;
