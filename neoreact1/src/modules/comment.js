import {
  createAction,
  handleActions,
} from 'redux-actions';
import createSaga, {
  createTypes,
} from '../lib/createSaga';
import * as api from '../lib/api';
import { takeLatest } from '@redux-saga/core/effects';

const CHANGE_COMMENT = 'comment/CHANGE_COMMENT';
const INITIALIZE_COMMENT ='comment/INITIALIZE_COMMENT';

const[REMOVE_COMMENT,REMOVE_COMMENT_SUCCESS,REMOVE_COMMENT_FAILURE]=createTypes('comment/REMOVE_COMMENT');

const [
  WRITE_COMMENT,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAILURE,
] = createTypes('comment/WRITE_COMMENT');
const [
  GET_COMMENT,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
] = createTypes('comment/GET_COMMENT');

const[UPDATE_COMMENT,UPDATE_COMMENT_SUCCESS,UPDATE_COMMENT_FAILURE]=createTypes('comment/UPDATE_COMMENT');


export const changeComment = createAction(
  CHANGE_COMMENT,
  (commentInput) => commentInput
);

export const initializeComment = createAction(
  INITIALIZE_COMMENT
);

export const removeComment = createAction(REMOVE_COMMENT,({postId,commentId})=>({postId,commentId}));

export const updateComment = createAction(UPDATE_COMMENT,({postId,commentId,replyComment})=>({postId,commentId,replyComment}))

export const writeComment = createAction(
  WRITE_COMMENT,
  ({ commentInput, postId }) => ({
    commentInput,
    postId,
  })
);

export const getComment = createAction(
  GET_COMMENT,
  (postId) => ({
    postId,
  })
);

const removeCommentSaga = createSaga(REMOVE_COMMENT,api.removeComment)

const updateCommentSaga = createSaga(UPDATE_COMMENT,api.updateComment);

const writeCommentSaga = createSaga(
  WRITE_COMMENT,
  api.writeComment
);
const getCommentSaga = createSaga(
  GET_COMMENT,
  api.getComment
);

export function* commentSaga() {
  yield takeLatest(
    WRITE_COMMENT,
    writeCommentSaga
  );
  yield takeLatest(GET_COMMENT, getCommentSaga);
  yield takeLatest(REMOVE_COMMENT,removeCommentSaga);
  yield takeLatest(UPDATE_COMMENT,updateCommentSaga);
}

const init = {
  commentList: [],
  commentInput: '',
  error: null,
};

const comment = handleActions(
  {
    [CHANGE_COMMENT]: (
      state,
      { payload: commentInput }
    ) => ({
      ...state,
      commentInput,
    }),
    [INITIALIZE_COMMENT]: (state) => init,
    [GET_COMMENT_SUCCESS]: (
      state,
      { payload: commentList }
    ) => ({
      ...state,
      commentList: commentList,
      error: null,
    }),
    [GET_COMMENT_FAILURE]: (
      state,
      { payload: error }
    ) => ({
      ...state,
      error,
    }),
    [REMOVE_COMMENT_SUCCESS]:(state,{payload:commentList})=>({
      ...state,
      commentList
    }),
    [REMOVE_COMMENT_FAILURE]:(state,{payload:error})=>({
      ...state,
      error,
    }),
    [UPDATE_COMMENT_SUCCESS]:(state,{payload:commentList})=>({
      ...state,
      commentList
    }),
    [UPDATE_COMMENT_FAILURE]:(state,{payload:error})=>({
      ...state,
      error
    }),
    [WRITE_COMMENT_SUCCESS]: (
      state,
      { payload: commentList }
    ) => ({
      ...state,
      commentList:
        state.commentList.concat(commentList),
      error: null,
    }),
    [WRITE_COMMENT_FAILURE]: (
      state,
      { payload: error }
    ) => ({
      ...state,
      error,
    }),
  },
  init
);

export default comment;
