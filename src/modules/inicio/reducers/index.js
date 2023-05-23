import {
  SET_ERRORMS,
  SET_LOADING,
  SET_TOFINDV,
  SET_ITEMVAL,
  SET_CATEGORIES,
  SET_MESSAGES,
} from "./action-types";

const initialState = {
  item: undefined,
  loading: false,
  toFind: true,
  error: undefined,
  categories: undefined,
  messages: undefined,
};

// export default function mainState(state = initialState, action) { return state; }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORMS:
      return { ...state, error: action.error };
    case SET_LOADING:
      return { ...state, loading: action.loading };
    case SET_ITEMVAL:
      return { ...state, item: action.item };
    case SET_TOFINDV:
      return { ...state, toFind: action.toFind };
    case SET_CATEGORIES:
      return { ...state, categories: action.messages };
    case SET_MESSAGES:
      return { ...state, messages: action.messages };
    default:
      return state;
  }
};

export default reducer;
