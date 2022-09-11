import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from '@redux-saga/core/effects';
import createSaga, { createTypes } from '../lib/createSaga';
import * as api from '../lib/api';

const [USERINFO, USERINFO_SUCCESS, USERINFO_FAILURE] = createTypes('userInfo/USERINFO');
const [UPDATEUSER, UPDATEUSER_SUCCESS, UPDATEUSER_FAILURE] = createTypes('userInfo/UPDATEUSER');
const CHANGE_FORM = 'userInfo/CHANGE_FORM';
const INITIALIZE = 'userInfo/INITIALIZE';
const SET_ORIGINAL_USERINFO = 'user/SET_ORIGINAL_USERINFO';

export const getUserInfo = createAction(USERINFO, ({ username, meFlag }) => ({
    username,
    meFlag,
}));

export const updateUser = createAction(UPDATEUSER, ({ userId, password, email, phone }) => ({
    userId,
    password,
    email,
    phone,
}));

export const changeForm = createAction(CHANGE_FORM, ({ key, value }) => ({
    key,
    value,
}));

export const initialize = createAction(INITIALIZE);

export const setOriginalUserInfo = createAction(SET_ORIGINAL_USERINFO, (userInfo) => userInfo);

const getUserInfoSaga = createSaga(USERINFO, api.getUserInfo);
const updateUserSaga = createSaga(UPDATEUSER, api.updateUser);

export function* userInformationSaga() {
    yield takeLatest(USERINFO, getUserInfoSaga);
    yield takeLatest(UPDATEUSER, updateUserSaga);
}

const init = {
    userInfo: null,
    error: null,
    userId: '',
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    phone: '',
};

const userInfo = handleActions(
    {
        [USERINFO_SUCCESS]: (state, { payload: userInfo }) => ({
            ...state,
            userInfo,
            error: null,
        }),
        [USERINFO_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
        [SET_ORIGINAL_USERINFO]: (state, { payload: userInfo }) => ({
            ...state,
            userId: userInfo._id,
            username: userInfo.username,
            email: userInfo.email,
            phone: userInfo.phone,
            userInfo,
        }),
        [UPDATEUSER_SUCCESS]: (state, { payload: userInfo }) => ({
            ...state,
            userInfo
        }),
        [UPDATEUSER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
        [CHANGE_FORM]: (state, { payload: { key, value } }) => ({
            ...state,
            [key]: value,
        }),
        [INITIALIZE]: (state) => init,
    },
    init,
);

export default userInfo;
