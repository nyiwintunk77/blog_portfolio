import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { formatDate_day } from '../../lib/format';
import palette from '../../lib/palette';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

const CommentListBlock = styled.div`
  border-bottom: 1px solid ${palette.gray[3]};
  padding-top: 1rem;
  padding-bottom: 0.5rem;

  #userAndDate {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
    @media (max-width: 260px) {
      display: inline-block;
    }

    #listUsername {
      margin-right: 0.4rem;
      font-size: 0.9rem;
    }

    #date {
      font-size: 0.8rem;
      line-height: 1.9;
      color: ${palette.gray[6]};
    }
  }
  #comment {
    margin-left: 0.75rem;
    margin-bottom: 0.5rem;
    width: 98%;
    font-size: 0.8rem;
    line-height: 1.7;
    white-space: pre-wrap;
    word-break: break-all;
  }

  &:hover {
    ${({ checkUser }) =>
      checkUser &&
      css`
        .visible {
          visibility: visible;
          cursor: pointer;
          margin-left: 0.5rem;
          &:hover {
            color: ${palette.gray[4]};
          }
        }
      `}
  }

  .userCheck {
    visibility: hidden;
    display: flex;
    font-size: 0.7rem;
    float: right;
    margin-right: 1rem;
    padding: 2px 4px 2px 4px;
    color: ${palette.gray[5]};
  }
`;

const CommentList = ({ loginUser, comment,onDelete,onEdit }) => {

  const { _id,user, createdAt, replyComment } =comment;
  const checkUser = user.username === loginUser;


  const [show, setShow] = useState(false);
  const [deleteShow,setDelete]=useState(false);

  const handleClick = () => setShow(true);
  const handleDelete = () => setDelete(true);

  const handleClose = () => setShow(false);
  const handleDelClose = () => setDelete(false);

  const handleRemove = () =>{
    setDelete(false);
    onDelete(_id);
  }

  const handleUpdate = (comm) => {
    setShow(false);
    onEdit(comm,_id);
  };

  return (
    <CommentListBlock checkUser={checkUser}>
      <div className="userCheck">
        <div className="visible" onClick={handleClick}>修正　</div>
        <div className="visible" onClick={()=>{checkUser && handleDelete()}}>削除</div>
      </div>
      <div id="userAndDate">
        <div id="listUsername">
          {user.username}
        </div>
        <div id="date">
          {formatDate_day(createdAt)}
        </div>
      </div>
      <div id="comment">{replyComment}</div>
      <UpdateModal onComEdit={handleUpdate} handleClose={handleClose} show={show} replyComment={replyComment} id={_id}/>
      <DeleteModal onRemove={handleRemove}
        handleDelClose={handleDelClose}
        show={deleteShow}/>
    </CommentListBlock>
  );
};

export default CommentList;
