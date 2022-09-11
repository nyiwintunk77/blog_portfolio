import React, { useState } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import palette from '../../lib/palette';
import RemoveModal from './RemoveModal';
import { GoPencil, GoTrashcan } from 'react-icons/go';

const EditDeleteBlock = styled.div`
  color: ${palette.gray[7]};
  cursor: pointer;
  .iconEdit {
    width: 15px;
    height: 15px;
    margin-right: 9px;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  .iconDeltete {
    width: 15px;
    height: 15px;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
`;

const EditDelete = ({ onEdit,onRemove, history }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(true);

  const handleClose = () => setShow(false);

  const handleRemove = () => {
    setShow(false);
    onRemove();
  };

  return (
    <EditDeleteBlock>
      <GoPencil className="iconEdit" onClick={onEdit}/>
      <GoTrashcan className="iconDeltete" onClick={handleClick} />

      <RemoveModal
        onRemove={handleRemove}
        handleClose={handleClose}
        show={show}
      />
    </EditDeleteBlock>
  );
};

export default withRouter(EditDelete);
