import React, { useState } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import palette from '../../lib/palette';

const UpdateModalBlock = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .contents {
    position: relative;
    top: 6rem;
    max-width: 18rem;
    width: 90%;
    margin: 0 auto;
    border-radius: 0.3rem;
    padding: 16px 64px 16px 16px;
    background-color: #f1f1f1;

    animation: fadeInDown 0.3s;
  }
  .body {
    text-align: left;
  }
  .footer {
    position: relative;
    right: -3rem;
    text-align: right;
  }
  .modalBtn {
    cursor: pointer;
    color: white;
    border: none;
    width: 58px;
    height: 25px;
    line-height: 25px;
    border-radius: 4px;
    &:first-child {
      background-color: ${palette.blue[5]};
      &:hover {
        color: white;
      }
    }
    &:last-child {
      margin-left: 0.5rem;
      color: ${palette.blue[5]};
      background-color: white;
      &:hover {
        background-color: ${palette.blue[1]};
      }
    }
  }
`;

const UpdateModal = ({ onComEdit, show, handleClose,replyComment,id }) => {
  const[comment,setComment]=useState(replyComment)
    if (!show) return null;

    const onChange=(e)=>{
        setComment(e.target.value);     
    }

    const onComEditChange=()=>{
      onComEdit(comment,id);
      console.log("COMMENTUPDATE:"+comment+"id:"+id)
    }

  return (
    <UpdateModalBlock>
      <div className="overlay" onClick={handleClose} />
      <div className="contents">
        <div className="body">
          <p>コメントを修正しますか？</p>
          <textarea onChange={onChange} value={comment}></textarea>
        </div>
        <div className="footer">
          <button className="modalBtn" onClick={onComEditChange}>
            Update
          </button>
          <button className="modalBtn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </UpdateModalBlock>
  );
};

export default withRouter(UpdateModal);
