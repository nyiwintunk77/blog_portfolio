import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
import { withRouter } from 'react-router';

const ModalBlock = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const Section = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 6rem auto;
  border-radius: 0.3rem;

  padding: 16px 16px 16px 16px;
  background-color: rgba(255, 255, 255, 0.9);

  .body {
    padding: 1.5rem;
    text-align: center;
  }
`;

const Footer = styled.div`
  text-align: right;

  .modalBtn {
    cursor: pointer;
    color: white;
    font-size:15px;
    box-sizing: border-box;
    border: none;
    width: 70px;
    height: 25px;
    line-height: 25px;
    border-radius: 0.3rem;

    &:first-child {
      margin-right: 0.5rem;
      background-color: ${palette.blue[5]};

      &:hover {
        color: white;
      }
    }

    &:last-child {
      margin-left: 0.15rem;
      color: ${palette.blue[5]};
      background-color: white;

      &:hover {
        background-color: ${palette.blue[1]};
      }
    }
  }
`;

const CancleModal = ({ handleOpen, handleClose, handleGoBack }) => {
  if (!handleOpen) return null;

  return (
    
    <ModalBlock>
      <div className="overlay" onClick={handleClose} />
      <Section>
        <div className="body">キャンセルしますか？</div>
        <Footer>
          <button className='modalBtn' onClick={handleGoBack}>
            確認
          </button>
          <button className='modalBtn' onClick={handleClose}>
            キャンセル
          </button>
        </Footer>
      </Section>
    </ModalBlock>
    
  );
};

export default withRouter(CancleModal);
