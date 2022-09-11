import client from './client';
import qs from 'qs';

export const login = ({ username, password }) =>
  client.post('/users/login', {
    username,
    password,
  });

export const register = ({ username, password, email, phone }) =>
  client.post('/users/', {
    username,
    password,
    email,
    phone,
  });

export const check = () => client.get('/users/check');

export const logout = () => client.post('/users/logout');

export const createPost = ({ title, body, tags }) =>
  client.post('/posts', { title, body, tags });

export const getPostList = ({ option, searchKeyword, page, username, tag }) => {
  const queryString = qs.stringify({
    option,
    searchKeyword, 
    page,
    username,
    tag,
  });
  return client.get(`/posts?${queryString}`);
};
export const getPost = ({ postId }) => client.get(`/posts/${postId}`);

export const removePost = ({ postId }) => client.delete(`/posts/${postId}`);

export const updatePost = ({ postId, title, body, tags }) => client.patch(`/posts/${postId}`,{title,body,tags});

export const getUserInfo = ({ username, meFlag }) => {
  const query = qs.stringify({
    username,
    meFlag,
  });
  return client.get(`/users/userInfo?${query}`);
};

export const updateUser = ({ userId, password, email, phone }) =>
  client.patch(`/users/userInfo/${userId}`, {
    password,
    email,
    phone,
  });
  
export const writeComment = ({ commentInput, postId }) =>
  client.post('/posts/comment', {
    commentInput,
    postId,
  });

export const getComment = ({ postId }) =>
  client.get(`/posts/comment/${postId}`);

export const removeComment = ({postId,commentId}) =>
  client.delete(`/posts/comment/${postId}/${commentId}`);

export const updateComment = ({postId,commentId,replyComment}) =>
  client.patch(`/posts/comment/${postId}/${commentId}`,{replyComment});

export const updateLike = (postId,likes) => client.patch(`/posts/like/${postId}`,likes);


