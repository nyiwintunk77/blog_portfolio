import React from 'react';
import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

const WhiteBox = styled.div`
  background: white;
  width: 360px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  .logo {
    display: block;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
    padding-bottom: 2rem;
  }
  padding: 2rem;

  @media (max-width: 450px) {
    width: 80%;
  }
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo">Welcome to TOMATO</div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
