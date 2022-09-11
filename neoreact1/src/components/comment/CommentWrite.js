import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
import Button from '../common/Button';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MAX_COMMENT } from '../../lib/constants';
import {
  COMMENT_PLACEHOLDER,
  COMMENT_VALUE,
} from '../../lib/msg';

const CommentWriteStyle = styled.div`
  margin-top: 1rem;
  margin-left: 0.5rem;

  #writeUsername {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  textarea {
    width: 97.5%;
    height: 60px;
    border: none;
    outline: none;
    resize: none;
    border: 1px solid ${palette.gray[3]};
    margin-left: 0.25rem;
    padding: 3px 0 0 3px;
    overflow: auto;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
  }
`;

const StyledButtonBlock = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: space-between;

  #textNumber {
    margin-left: 0.25rem;
    font-size: 0.8rem;
    color: ${({ value }) =>
      value.length > MAX_COMMENT
        ? '#ff0000'
        : '#adb5bd'};
  }

  #writeButton {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    font-weight: normal;
    background-color: white;
    color: ${({ commentLength }) =>
      commentLength ? '#adb5bd' : '#4dabf7'};
    border: 1px solid
      ${({ commentLength }) =>
        commentLength ? '#adb5bd' : '#4dabf7'};
    padding: 4px 8px 4px 8px;
    display: flex;
    align-items: center;

    &:hover {
      color: ${({ commentLength }) =>
        commentLength ? '#adb5bd' : '#74c0fc'};
      border: 1px solid
        ${({ commentLength }) =>
          commentLength ? '#adb5bd' : '#74c0fc'};
      cursor: ${({ commentLength }) =>
        commentLength ? 'default' : 'pointer'};
    }

    .icon {
      margin-right: 0.2rem;
    }
  }
`;

const ButtonBlock = ({
  value,
  username,
  postComment,
  setValue,
  postId,
  commentValue,
}) => {
  const onClick = () => {
    if (commentLength) return;
    postComment(commentValue, postId);
    setValue('');
  };

  const commentLength =
    value === '' || value.length > MAX_COMMENT;

  if (!username) return null;
  return (
    <StyledButtonBlock
      commentLength={commentLength}
      value={value}
    >
      <div id="textNumber">
        {value.length}/{MAX_COMMENT}
      </div>
      <Button id="writeButton" onClick={onClick}>
        <IoMdCheckmarkCircleOutline className="icon" />
        送信
      </Button>
    </StyledButtonBlock>
  );
};

const CommentWrite = ({
  click,
  loginUser,
  onChange,
  postComment,
  post,
  commentValue,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  useEffect(() => {
    setValue('');
  }, [click]);

  if (!click) return null;
  return (
    <>
      <CommentWriteStyle>
        <div>
          <div id="writeUsername">
            {loginUser}
          </div>
          <textarea
            placeholder={COMMENT_PLACEHOLDER}
            value={
              loginUser ? value : COMMENT_VALUE
            }
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
      </CommentWriteStyle>
      <ButtonBlock
        value={value}
        username={loginUser}
        setValue={setValue}
        postComment={postComment}
        postId={post && post.id}
        commentValue={commentValue}
      />
    </>
  );
};
export default CommentWrite;
