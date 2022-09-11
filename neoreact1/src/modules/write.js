import {
  createAction,
  handleActions,
} from 'redux-actions';
import createSaga, {
  createTypes,
} from '../lib/createSaga';
import * as api from '../lib/api';
import { takeLatest } from '@redux-saga/core/effects';

const CHANGE_FIELD = 'write/CHANGE_FIELD';
const INITIALIZE = 'write/INITIALIZE';
const [
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
] = createTypes('write/CREATE_POST');
const [UPDATE_POST,UPDATE_POST_SUCCESS,UPDATE_POST_FAILURE]=createTypes('write/UPDATE_POST');

const OLD_POST = "write/OLD_POST";
export const oldPost = createAction(OLD_POST,(oldpost)=>oldpost)

export const updatePost = createAction(UPDATE_POST,({postId,title,body,tags})=>({postId,title,body,tags}))
export const changeField = createAction(
  CHANGE_FIELD,
  ({ key, value }) => ({
    key,
    value,
  })
);

export const initialize =
  createAction(INITIALIZE);

export const createPost = createAction(
  CREATE_POST,
  ({ title, body, tags }) => ({
    title,
    body,
    tags,
  })
);

const createPostSaga = createSaga(
  CREATE_POST,
  api.createPost
);
const updatePostSaga = createSaga(UPDATE_POST,api.updatePost);

export function* writeSaga() {
  yield takeLatest(CREATE_POST, createPostSaga);
  yield takeLatest(UPDATE_POST,updatePostSaga);
}

const init = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
  oldpostId:null
};

const write = handleActions(
  {
    [CHANGE_FIELD]: (
      state,
      { payload: { key, value } }
    ) => ({
      ...state,
      [key]: value,
    }),
    [INITIALIZE]: (state) => init,
    [CREATE_POST]: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [CREATE_POST_SUCCESS]: (
      state,
      { payload: post }
    ) => ({
      ...state,
      post,
    }),
    [CREATE_POST_FAILURE]: (
      state,
      { payload: postError }
    ) => ({
      ...state,
      postError,
    }),
    [OLD_POST]:(state,{payload:post})=>({
      ...state,
      oldpostId:post._id,
      title:post.title,
      body:post.body,
      tags:post.tags,
    }),
    [UPDATE_POST_SUCCESS]:(state,{payload:post})=>({...state,post}),
    [UPDATE_POST_FAILURE]:(state,{payload:postError})=>({
      ...state,
      postError,
    }),
  },
  init
);

export default write;
