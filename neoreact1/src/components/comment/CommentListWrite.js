import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
import CommentList from './CommentList';

const StyledSp = styled.p`
  border-bottom: 1px solid ${palette.gray[3]};
  padding-bottom: 0.7rem;
  margin-bottom: 0;

  span {
    margin-left: 0.3rem;
    color: ${palette.blue[3]};
  }
`;

const CommentListWrite = ({
  error,
  click,
  commentList,
  loginUser,
  onDelete,
  onEdit
}) => {
  if (!click) return null;
  if (error)
    return (
      <>
        <p>コメントの読み込みに失敗しました！</p>
        {console.log(error)}
      </>
    );
  return (
    <div style={{ marginTop: '1rem' }}>
      <StyledSp>
        コメント
        <span>{commentList.length}</span>
      </StyledSp>

      {commentList.map((c) => (
        <CommentList
          comment={c}
          key={c._id}
          loginUser={loginUser}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default CommentListWrite;
