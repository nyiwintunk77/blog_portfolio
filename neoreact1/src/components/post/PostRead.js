import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
import ErrorModal from './ErrorModal';
import Loading from '../common/Loading';
import { formatDate } from '../../lib/format';
import PopupMenu from '../common/PopupMenu';
import { Helmet } from 'react-helmet-async';

const PostReadBlock = styled.div`
    word-break: break-all;
    .header-wrapper {
        border-bottom: 1px solid ${palette.gray[3]};
        padding-bottom: 0.3rem;
        margin-bottom: 1rem;
        margin-left: 0.5rem;
        margin-top: 3rem;
        .title {
            font-size: 1.3rem;
            font-weight: bold;
        }
    }

    .header-container {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        margin-top: 0.8rem;
        margin-left: 0.5rem;
        font-size: 0.5rem;
        .headerInfo {
            display: flex;
        }

        .username,
        .createDate {
            margin-right: 0.5rem;
            color: ${palette.gray[6]};
        }
        .username {
            cursor: pointer;
        }
        .username:hover {
            color: ${palette.gray[9]};
        }
    }
    .menu-wrapper {
        top: 1.2rem;
        left: 0rem;
    }

    .tag {
        font-size: 0.7rem;
        display: inline-block;
        padding: 0 2px;
        color: ${palette.gray[4]};
        margin-left: 1rem;
        cursor: pointer;
    }

    .contentBody {
        font-size: 0.9rem;
        white-space: break-spaces;
        word-break: break-all;
        margin-bottom: 3rem;
        margin-left: 1rem;
        margin-right: 1rem;
    }
`;

const LoadingBlock = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const PostRead = ({ post, user, error, loading, editDelete, onTagClick, usernameRef, outsideRef, isMenuOpen, onClickUser,likes}) => {


    if (loading) {
        return (
            <LoadingBlock>
                <Loading />
            </LoadingBlock>
        );
    }

    if (error || !post) {
        return <ErrorModal error={error} post={post} />;
    };

    const { title, body, postUsername, createDate, tags} = {
        ...post,
        postUsername: post.user.username,
    };
    return (
        <PostReadBlock>
            <Helmet>
                <title>{title} - Tomato World</title>
            </Helmet>
            <div className="header-wrapper">
                <div>
                    <span className="title">{title}</span>
                </div>
                <div className="header-container">
                    <div className="headerInfo">
                        <div className="username" onClick={onClickUser} ref={usernameRef}>
                            {postUsername}
                        </div>
                        {isMenuOpen && (
                            <PopupMenu auth={user} postUsername={postUsername} onClickUser={onClickUser} outsideRef={outsideRef} />
                        )}
                        <div className="createDate">{formatDate(createDate)}</div>
                    </div>
                    {editDelete}
                </div>
            </div>

            <div className="contentBody">{body}</div>

            {tags.map((tag, index) => (
                <span className="tag" key={index} onClick={() => onTagClick(tag)}>
                    #{tag}
                </span>
            ))}
            {likes}
        </PostReadBlock>
    );
};

export default PostRead;
