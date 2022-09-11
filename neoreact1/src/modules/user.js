import { createAction, handleActions } from 'redux-actions';
import { call, takeLatest } from '@redux-saga/core/effects';
import createSaga, { createTypes } from '../lib/createSaga';
import * as api from '../lib/api';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createSaga(CHECK, api.check);

function checkFailureSaga() {
    try {
        localStorage.removeItem('user');
    } catch (e) {
        console.log(e);
    }
}

function* logoutSaga() {
    try {
        yield call(api.logout);
        localStorage.removeItem('user');
    } catch (e) {
        console.log(e);
    }
}

export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(LOGOUT, logoutSaga);
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
}

const init = {
    user: null,
    checkError: null,
};

const user = handleActions(
    {
        [TEMP_SET_USER]: (state, { payload: user }) => ({
            ...state,
            user,
        }),
        [CHECK_SUCCESS]: (state, { payload: user }) => ({
            ...state,
            user,
            checkError: null,
        }),
        [CHECK_FAILURE]: (state, { payload: checkError }) => ({
            ...state,
            user: null,
            checkError,
        }),
        [LOGOUT]: (state) => ({ ...state, user: null }),
    },
    init,
);

export default user;
