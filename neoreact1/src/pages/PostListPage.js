import React from 'react';
import GnbContainer from '../containers/GnbContainer';
import PostListContainer from '../containers/PostListContainer';
import PagingContainer from '../containers/PagingContainer';
import Template from '../components/common/Responsive';
import { Helmet } from 'react-helmet-async';

const PostListPage = () => {
    return (
        <>
            <Helmet>
                <title>Tomato World</title>
            </Helmet>
            <GnbContainer />
            <div style={{ height: 'calc(80vh)', overflowY: 'auto' }}>
                <Template main>
                    <PostListContainer />
                </Template>
            </div>
            <div style={{ width: '60%', margin: '0 auto' }}>
                <PagingContainer />
            </div>
        </>
    );
};

export default PostListPage;
