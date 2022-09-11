import React, { useRef } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import palette from '../../lib/palette';
import PopupMenu from '../common/PopupMenu';
import { useMenu } from '../../lib/useMenu';

const PostItemBlock = styled.div`
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-bottom: 1px solid ${palette.gray[3]};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0;
    color: ${palette.gray[7]};
    .contents {
        flex: 1;
        cursor: pointer;
        strong {
            font-size: 1.1rem;
            color: ${palette.gray[9]};
        }
        &:hover {
            strong {
                text-decoration: underline;
            }
        }
        div {
            max-width: 95%;
            margin-top: 1rem;
            font-size: 0.8rem;
            word-break: break-all;
        }
    }

    .info {
        display: flex;
        width: 20%;
        font-size: 0.75rem;
        color: ${palette.gray[5]};

        .writer {
            position: relative;
            display: flex;
            justify-content: flex-start;
            flex: 1;
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }

        .date {
            display: flex;
            justify-content: flex-start;
        }
    }

    .popupMenu {
        position: absolute;
        top: 1.2rem;
        left: 0;
    }

    @media (max-width: 1580px) {
        .info {
            flex-direction: column;
            align-items: flex-end;
            width: 25%;
            div {
                padding: 0.1rem;
            }
        }
    }

    @media (max-width: 425px) {
        align-items: flex-start;
        .date {
            display: none;
        }
    }
`;

const PostItem = ({ post, history, loginUser, onGetUserInfo }) => {
    const { title, body, user, _id, createDate } = post;

    const outsideRef = useRef(null);
    const usernameRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useMenu(outsideRef, usernameRef);

    const onClickUser = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <PostItemBlock>
            <div
                className="contents"
                onClick={() => {
                    history.push(`/${user.username}/${_id}`);
                }}
            >
                <strong>{title}</strong>
                <div>{body.length === 150 ? `${body}...more` : body}</div>
            </div>
            <div className="info">
                <div className="writer" onClick={onClickUser} ref={usernameRef}>
                    {user.username}
                    <div className="popupMenu">
                        {isMenuOpen && (
                            <PopupMenu
                                loginUser={loginUser}
                                postUsername={user.username}
                                onClickUser={onClickUser}
                                outsideRef={outsideRef}
                            />
                        )}
                    </div>
                </div>
                <div className="date">{createDate}</div>
            </div>
        </PostItemBlock>
    );
};

const PostList = ({ posts, loading, history, loginUser, onGetUserInfo }) => {
    return (
        <>
            {!loading &&
                posts &&
                posts.map((post) => (
                    <PostItem post={post} key={post._id} history={history} loginUser={loginUser}/>
                ))}
        </>
    );
};

export default withRouter(PostList);
