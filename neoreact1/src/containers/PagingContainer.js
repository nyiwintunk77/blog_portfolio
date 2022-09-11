import React from 'react';
import PostPaging from '../components/posts/PostPaging';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import qs from 'qs';

const PagingContainer = ({ location }) => {
  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading['posts/POST_LIST'],
  }));
  if (!posts || loading) return null;
  const {
    searchKeyword,
    option,
    username,
    tag,
    page = 1,
  } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  return (
    <PostPaging
      searchKeyword={searchKeyword}
      option={option}
      tag={tag}
      username={username}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default withRouter(PagingContainer);
