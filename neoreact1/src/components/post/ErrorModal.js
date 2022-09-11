import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import palette from '../../lib/palette';

const ErrorModalBlock = styled.div`
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

  .contents {
    position: relative;
    top: 2rem;
    width: 90%;
    max-width: 20rem;
    margin: 0 auto;
    border-radius: 0.3rem;
    padding: 16px 64px 16px 16px;
    background-color: #f1f1f1;

    animation: fadeInDown 0.5s;
  }
  .body {
    text-align: left;
  }
  .footer {
    position: relative;
    right: -2.5rem;
    text-align: right;
  }
  .errorModalBtn {
    cursor: pointer;
    color: white;
    border: none;
    width: 45px;
    height: 25px;
    line-height: 25px;
    border-radius: 4px;
    &:first-child {
      background-color: ${palette.blue[5]};
      &:hover {
        color: white;
      }
    }
  }
`;

const ErrorModal = ({ history, error, post }) => {
  if (!error || post) return null;

  const handleClose = () => {
    history.push('/');
  };

  return (
    <ErrorModalBlock>
      <div className="contents">
        <div className="body">削除された、又は存在しない投稿です。</div>
        <div className="footer">
          <button className="errorModalBtn" onClick={handleClose}>
            確認
          </button>
        </div>
      </div>
    </ErrorModalBlock>
  );
};

export default withRouter(ErrorModal);
