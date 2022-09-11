import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../components/posts/PostList';
import { postsList } from '../modules/posts';
import PostHeader from '../components/posts/PostHeader';
import { FaPen } from 'react-icons/fa';
import { timeCalculation } from '../lib/common/aboutTime';
import { setTitle } from '../lib/postList/setTitle_Content';

const PostListContainer = ({ location, history }) => {
    const dispatch = useDispatch();
    const { posts, loading, user, error } = useSelector(({ posts, loading, user }) => ({
        posts: posts.posts,
        error: posts.error,
        loading: loading['posts/LIST_POSTS'],
        user: user.user,
    }));

    const [searchKeyword, setSearchkeyword] = useState('');
    const [option, setOption] = useState('title');

    const onChangeinput = (e) => {
        setSearchkeyword(e.target.value);
    };

    const onChangeOption = (e) => {
        setOption(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const url = qs.stringify({ option, searchKeyword });
        history.push(`/?${url}`);
    };

    useEffect(() => {
        location.search === '' && setSearchkeyword('');
    }, [location.search]);

    useEffect(() => {
        const { option, searchKeyword, tag, username, page } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        dispatch(postsList({ searchKeyword, option, tag, username, page }));
    }, [dispatch, location.search]);

    const newPosts = posts && posts.map((p) => ({ ...p, createDate: timeCalculation(p.createDate) }));

    return (
        <>
            <h2 style={{marginTop: '1rem'}}>{setTitle(location.search)}</h2>
            <PostHeader
                searchKeyword={searchKeyword}
                option={option}
                onChangeinput={onChangeinput}
                onChangeOption={onChangeOption}
                onSubmit={onSubmit}
                writeButton={
                    user && (
                        <Link className="icon" to="/write">
                            <FaPen />
                        </Link>
                    )
                }
            />
            <PostList loading={loading} posts={newPosts} error={error} loginUser={user}/>
        </>
    );
};

export default withRouter(PostListContainer);
