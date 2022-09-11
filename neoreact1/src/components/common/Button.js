import React from 'react';
import { withRouter } from 'react-router';
import styled, { css } from 'styled-components';
import palette from '../../lib/palette';

const ButtonBlock = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background: ${palette.blue[5]};
  color: white;
  font-size: 1rem;
  padding: 0.25rem 1rem;
  font-weight: bold;
  white-space: nowrap;
  &:hover {
    background: ${palette.blue[4]};
  }
  & + button {
    margin-left: 1rem;
  }

  ${props =>
    props.fullWidth &&
    css`
      margin-top: 1rem;
      padding-top: 0.7rem;
      padding-bottom: 0.7rem;
      font-size: 1.2rem;
      width: 100%;
    `}
`;

const Button = ({ to, history, ...rest }) => {
  const onClick = e => {
    if (to) {
      history.push(to);
    }

    if (rest.onClick) {
      rest.onClick(e);
    }
  };
  return <ButtonBlock {...rest} onClick={onClick} />;
};

export default withRouter(Button);
