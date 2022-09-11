import React from 'react';
import styled from 'styled-components';
import { SiApache } from 'react-icons/si';
import palette from '../../lib/palette';

const WriteTemplateBlock = styled.div`
  margin: 0 auto;
  margin-top: 1.5rem;
  width: 50%;
  @media (max-width: 768px) {
    width: 95%;
  }
  .icon {
    color: ${palette.gray[6]};
    height: 30px;
    width: 30px;
    transform: rotate(15deg);
    position: relative;
    z-index: -1;
  }
  .write {
    display: inline-block;
    margin-bottom: 1rem;
    color: ${palette.gray[6]};
  }
`;

const WriteTemplate = ({ children }) => {
  return (
    <WriteTemplateBlock>
      <SiApache className="icon" />
      <div className="write">今日の記事</div>
      {children}
    </WriteTemplateBlock>
  );
};

export default WriteTemplate;
