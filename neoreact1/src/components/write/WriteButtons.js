import React, { useState } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Button from '../common/Button';
import CancleModal from './CancleModal';
import { MdClose } from 'react-icons/md';
import { BsCheck2 } from 'react-icons/bs';
import palette from '../../lib/palette';
import {
  CANCEL_BT_TITLE,
  SUBMIT_BT_TITLE,
  SUBMIT_BT_WARN,
} from '../../lib/msg';

const WriteButtonsBlock = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  padding: 7px 7px 3px 7px;
  & + & {
    margin-left: 1rem;
  }
  &:first-of-type {
    background-color: ${palette.gray[4]};

    &:hover {
      background-color: ${palette.gray[3]};
    }
  }
  &:last-of-type {
    background-color: ${({ error }) =>
      error ? '#ced4da' : '#4dabf7'};

    cursor: ${({ error }) =>
      error ? 'default' : 'pointer'};

    &:hover {
      background-color: ${({ error }) =>
        error ? '#ced4da' : '#74c0fc'};
    }
  }
`;

const WriteButtons = ({
  onSubmit,
  onGoBack,
  error,
}) => {
  const [modalIsOpen, setModalIsOpen] =
    useState(false);

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <WriteButtonsBlock>
        <StyledButton
          onClick={openModal}
          title={CANCEL_BT_TITLE}
        >
          <MdClose color="white" size={30} />
        </StyledButton>

        <StyledButton
          onClick={onSubmit}
          error={error}
          title={
            error
              ? SUBMIT_BT_WARN
              : SUBMIT_BT_TITLE
          }
        >
          <BsCheck2 color="white" size={30} />
        </StyledButton>

        <CancleModal
          handleOpen={modalIsOpen}
          handleClose={closeModal}
          handleGoBack={onGoBack}
        ></CancleModal>
      </WriteButtonsBlock>
    </>
  );
};

export default withRouter(WriteButtons);
