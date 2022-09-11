import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PostReadList from '../components/post/PostReadList';

const PostReadListContainer = ({ history }) => {
  const { posts, post } = useSelector(({ posts, post }) => ({
    posts: posts.posts,
    post: post.post,
  }));

  const currentIndex = post && posts.findIndex((p) => p._id === post._id);
  const firstIndex = useRef(0);
  const lastIndex = useRef(0);

  if (currentIndex - 2 < 0) {
    firstIndex.current = 0;
    lastIndex.current = 5;
  } else if (currentIndex + 3 > posts.length) {
    firstIndex.current = posts.length - 5 < 0 ? 0 : posts.length - 5;
    lastIndex.current = posts.length;
  } else {
    firstIndex.current = currentIndex - 2;
    lastIndex.current = currentIndex + 3;
  }

  const newPosts = posts && posts.slice(firstIndex.current, lastIndex.current);

  const onPostClick = (id) => {
    const post = newPosts.find((p) => p._id === id);
    const { user } = post;
    history.push(`/${user.username}/${id}`);
  };

  const onListClick = () => {
    history.push('/');
  };

  return (
    <PostReadList
      onPostClick={onPostClick}
      onListClick={onListClick}
      posts={newPosts}
      post={post}
    />
  );
};

export default withRouter(PostReadListContainer);
