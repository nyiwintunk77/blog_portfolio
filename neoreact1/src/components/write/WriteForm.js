import React from 'react';
import styled from 'styled-components';
import {
  MAX_BODY,
  MAX_TITLE,
} from '../../lib/constants';
import {
  BODY_PLACEHOLDER,
  TITLE_PLACEHOLDER,
} from '../../lib/msg';
import palette from '../../lib/palette';

const StyledInput = styled.input`
  font-size: 1.3rem;
  border: none;
  outline: none;
  border-bottom: 1px solid ${palette.gray[4]};
  width: 100%;
  margin-bottom: 1rem;
  box-sizing: border-box;

  &:focus {
    border-bottom: 1px solid ${palette.blue[4]};
  }

  & + & {
    margin-top: 1rem;
  }
`;

const StyledBodyDiv = styled.div`
  textarea {
    width: 100%;
    height: 300px;
    font-size: 1rem;
    border: none;
    outline: none;
    border-bottom: 1px solid
      ${({ bodyLength }) =>
        bodyLength > MAX_BODY
          ? '#ffa8a8'
          : '#ced4da'};
    padding-top: 0.7rem;
    resize: none;
    overflow: auto;
    margin-top: 1rem;
    font-family: Arial, Helvetica, sans-serif;

    &:focus {
      border-bottom: 1px solid
        ${({ bodyLength }) =>
          bodyLength > MAX_BODY
            ? '#ff0000'
            : '#4dabf7'};
    }
  }
`;

const StyledTitleLength = styled.div`
  margin-top: -2.5rem;
  text-align: right;
  color: ${({ titleLength }) =>
    titleLength >= MAX_TITLE
      ? '#a5d8ff'
      : '#adb5bd'};
`;

const StyledBodyLength = styled.div`
  margin-top: -1.7rem;
  float: right;
  display: flex;
  justify-content: flex-end;
  width: 4rem;
  position: relative;
  z-index: 1;
  color: ${({ bodyLength }) => {
    if (bodyLength === MAX_BODY) return '#a5d8ff';
    if (bodyLength > MAX_BODY) return '#ff0000';
    else return '#adb5bd';
  }};
`;

const WriteForm = ({ onChange, title, body }) => {
  const bodyLength = body.length;
  const titleLength = title.length;

  return (
    <>
      <StyledInput
        placeholder={TITLE_PLACEHOLDER}
        name="title"
        onChange={onChange}
        value={title}
        maxLength={MAX_TITLE}
      />
      <StyledTitleLength
        titleLength={titleLength}
      >
        {titleLength}/{MAX_TITLE}
      </StyledTitleLength>
      <StyledBodyDiv bodyLength={bodyLength}>
        <textarea
          placeholder={BODY_PLACEHOLDER}
          name="body"
          onChange={onChange}
          value={body}
        ></textarea>
        <StyledBodyLength bodyLength={bodyLength}>
          {bodyLength}/{MAX_BODY}
        </StyledBodyLength>
      </StyledBodyDiv>
    </>
  );
};

export default WriteForm;
