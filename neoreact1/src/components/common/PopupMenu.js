import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import palette from '../../lib/palette';

const PopupMenuBlock = styled.div`
  .menu-wrapper {
    background: white;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    position: absolute;
    overflow: auto;
    outline: 1px solid;
  }
  .menu {
    width: 5.1rem;
    font-size: 0.75rem;
    background: white;
    li {
      z-index: 999;
      padding: 0.3rem 0.4rem;
      cursor: pointer;
      border-top: 1px solid #d2d2d7;
    }
    li:hover {
      background-color: ${palette.blue[4]};
      color: white;
    }
    li:first-child {
      border-top: none;
    }
  }
`;

const PopupMenu = ({
  history,
  postUsername,
  onClickUser,
  onGetUserInfo,
  loginUser,
  outsideRef,
}) => {
  const onClick = () => {
    const loginUsername = loginUser.username ;
    history.push(`/userInfo?username=${postUsername}&meFlag=${loginUsername === postUsername}`);
  };

  return (
    <PopupMenuBlock>
      <div className="menu-wrapper">
        <ul className="menu" ref={outsideRef}>
          {loginUser && <li onClick={onClick}>会員情報</li>}
          <li
            onClick={() => {
              history.push(`/?username=${postUsername}`);
              onClickUser();
            }}
          >
            投稿を見る
          </li>
        </ul>
      </div>
    </PopupMenuBlock>
  );
};

export default withRouter(PopupMenu);
