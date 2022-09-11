import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import palette from '../../lib/palette';

const GnbMenuBlock = styled.div`
  position: absolute;

  .menu-wrapper {
    position: relative;
    width: 170px;
    height: auto;
    background: white;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
    top: 5rem;
    display: flex;
    justify-content: center;
    outline: 1px solid ${palette.gray[3]};
  }
  .menu {
    width: 150px;
    background: white;
    li {
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-top: 1px solid #d2d2d7;
      z-index: 999;
    }

    li:hover {
      background-color: ${palette.blue[1]};
    }
    li:first-child {
      border-top: none;
    }
  }

  @media (max-width: 768px) {
    .menu-wrapper {
      position: fixed;
      left: 0;
      top: 4rem;
      width: 100%;
    }
    .menu {
      width: 100%;
      border-bottom: 1px solid #d2d2d7;
      text-align: center;
    }
  }
`;

const GnbMenu = ({ outsideRef, history, onLogout, user }) => {
  return (
    <GnbMenuBlock>
      <div className="menu-wrapper">
        <ul className="menu" ref={outsideRef}>
          <li
            onClick={() => {
              history.push(`/userInfo?username=${user.username}&meFlag=true`);
            }}
          >
            My Info
          </li>
          <li
            onClick={() => {
              history.push('/write');
            }}
          >
            Write
          </li>
          <li style={{ color: 'red' }} onClick={onLogout}>
            Log Out
          </li>
        </ul>
      </div>
    </GnbMenuBlock>
  );
};

export default withRouter(GnbMenu);
