import Button from '../common/Button';
import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
import { FaRegCommentDots } from 'react-icons/fa';

const CommentBlock = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: flex-end;

  #commentButton {
    font-size: 0.8rem;
    font-weight: normal;
    background-color: white;
    color: ${palette.gray[6]};
    border: 1px solid ${palette.gray[5]};
    padding: 4px 8px 5.5px 8px;
    display: flex;

    &:hover {
      color: ${palette.gray[5]};
    }
    #text {
      margin-left: -0.07rem;
      margin-right: -0rem;
    }
    #number {
      margin-left: 0.3rem;
      color: ${palette.blue[3]};
      align-self: flex-end;
    }
    .icon {
      margin-right: 0.4rem;
      transform: scaleX(-1);
      align-self: center;
    }
  }
`;

const Comment = ({
  loading,
  error,
  onClick,
  commentList,
}) => {
  if (error)
    return (
      <>
        <p>コメントの読み込みに失敗しました！</p>
        {console.log(error)}
      </>
    );
  if (loading) return null;
  return (
    <>
      <CommentBlock>
        <Button
          id="commentButton"
          onClick={onClick}
        >
          <FaRegCommentDots className="icon" />
          <span id="text">コメント</span>
          {commentList.length !== 0 ? (
            <span id="number">
              {commentList.length}
            </span>
          ) : null}
        </Button>
      </CommentBlock>
    </>
  );
};

export default Comment;
