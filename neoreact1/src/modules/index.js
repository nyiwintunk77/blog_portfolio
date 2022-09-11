import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import loading from './loading';
import { all } from '@redux-saga/core/effects';
import user from './user';
import { userSaga } from './user';
import posts, { postsSaga } from './posts';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userInfo, {
  userInformationSaga,
} from './userInfo';
import comment, { commentSaga } from './comment';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['posts'],
};

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  posts,
  write,
  post,
  userInfo,
  comment,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
    postSaga(),
    postsSaga(),
    userInformationSaga(),
    commentSaga(),
  ]);
}

export default persistReducer(
  persistConfig,
  rootReducer
);
