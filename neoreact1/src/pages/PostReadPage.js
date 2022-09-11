import React from 'react';
import Template from '../components/common/Responsive';
import CommentContainer from '../containers/CommentContainer';
import GnbContainer from '../containers/GnbContainer';
import PostReadContainer from '../containers/PostReadContainer';
import PostReadListContainer from '../containers/PostReadListContainer';

const PostReadPage = () => {
  return (
    <>
      <GnbContainer />
      <Template main>
        <PostReadContainer />
        <CommentContainer />
        <PostReadListContainer />
      </Template>
    </>
  );
};

export default PostReadPage;
