import React from 'react';
import { withRouter } from 'react-router';
import styled, { css } from 'styled-components';
import palette from '../../lib/palette';

const NewBtnBlock = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  font-size: 1rem;
  padding: 1rem;

  ${(props) =>
    props.active &&
    css`
      color: ${palette.grape[6]};
      text-decoration: underline;
      font-weight: bold;
    `};
`;

const NewBtn = ({ to, history, ...rest }) => {
  const onClick = (e) => {
    if (to) {
      history.push(to);
    }

    if (rest.onClick) {
      rest.onClick(e);
    }
  };
  return <NewBtnBlock {...rest} onClick={onClick} />;
};

export default withRouter(NewBtn);
