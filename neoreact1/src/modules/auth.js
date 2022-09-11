import { createAction, handleActions } from "redux-actions";
import immer from "immer";
import { takeLatest } from "@redux-saga/core/effects";
import createSaga, { createTypes } from "../lib/createSaga";
import * as api from "../lib/api";

const CHANGE_FORM = "auth/CHANGE_FORM";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createTypes("auth/LOGIN");
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createTypes("auth/REGISTER");
const INITIALIZE = 'auth/INITIALIZE';

export const changeForm = createAction(CHANGE_FORM, ({ form, key, value }) => ({
  form,
  key,
  value,
}));

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const initialize = createAction(INITIALIZE);

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

export const register = createAction(
  REGISTER,
  ({ username, password, email, phone }) => ({
    username,
    password,
    email,
    phone,
  })
);

const loginSaga = createSaga(LOGIN, api.login);
const registerSaga = createSaga(REGISTER, api.register);

export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
}

const init = {
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    phone: "",
  },
  login: {
    username: "",
    password: "",
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FORM]: (state, { payload: { form, key, value } }) =>
      immer(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: init[form],
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({ ...state, auth }),
    [LOGIN_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      authError,
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({ ...state, auth }),
    [REGISTER_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      authError,
    }),
    [INITIALIZE]: (state) => init,
  },
  init
);

export default auth;