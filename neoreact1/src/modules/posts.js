import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from '@redux-saga/core/effects';
import createSaga, { createTypes } from '../lib/createSaga';
import * as api from '../lib/api';

const [POST_LIST, POST_LIST_SUCCESS, POST_LIST_FAILURE] =
  createTypes('posts/POST_LIST');

export const postsList = createAction(
  POST_LIST,
  ({ searchKeyword, option, tag, username, page }) => ({
    searchKeyword,
    option,
    tag,
    username,
    page,
  })
);

const postsListSaga = createSaga(POST_LIST, api.getPostList);

export function* postsSaga() {
  yield takeLatest(POST_LIST, postsListSaga);
}

const init = {
  posts: null,
  error: null,
  lastPage: 1,
};

const posts = handleActions(
  {
    [POST_LIST_SUCCESS]: (state, { payload: posts, meta: res }) => ({
      ...state,
      posts,
      error: null,
      lastPage: parseInt(res.headers['last-page'], 10),
    }),
    [POST_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      posts: null,
      error,
    }),
  },
  init
);

export default posts;
