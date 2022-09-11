import { createAction, handleActions } from 'redux-actions';
import createSaga, { createTypes } from '../lib/createSaga';
import * as api from '../lib/api';
import { takeLatest } from '@redux-saga/core/effects';

const [GET_POST, GET_POST_SUCCESS, GET_POST_FAILURE] = createTypes('post/GET_POST');
const INIT_POST = 'post/INIT_POST';
const [REMOVE_POST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE] =
  createTypes('post/REMOVE_POST');

export const getPost = createAction(GET_POST, (postId) => ({
  postId,
}));
export const initPost = createAction(INIT_POST);
export const removePost = createAction(REMOVE_POST, (postId) => ({
  postId,
}));

const getPostSaga = createSaga(GET_POST, api.getPost);
const removePostSaga = createSaga(REMOVE_POST, api.removePost);

export function* postSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(REMOVE_POST, removePostSaga);
}

const init = {
  post: null,
  error: null,
};

const post = handleActions(
  {
    [GET_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [GET_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [REMOVE_POST_SUCCESS]: (state) => ({
      ...state,
      post: null,
    }),
    [REMOVE_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [INIT_POST]: () => init,
  },
  init
);

export default post;
