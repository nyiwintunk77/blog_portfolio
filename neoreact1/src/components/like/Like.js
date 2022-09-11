import Button from '../common/Button';
import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
import { AiOutlineLike,AiTwotoneLike } from 'react-icons/ai';

const LikeBlock = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: flex-end;

  #likeButton {
    font-size: 0.8rem;
    font-weight: normal;
    background-color: white;
    color: ${palette.gray[6]};
    border: 1px solid ${palette.gray[5]};
    padding: 4px 8px 5.5px 8px;
    display: flex;

    &:hover {
      color: ${palette.gray[5]};
    }
    #text {
      margin-left: -0.07rem;
      margin-right: -0rem;
    }
    #number {
      margin-left: 0.3rem;
      color: ${palette.blue[3]};
      align-self: flex-end;
    }
    .icon {
      margin-right: 0.4rem;
      transform: scaleX(-1);
      align-self: center;
    }
  }
  #listUsername {
    margin-right: 20rem; 
    font-size:0.8rem;  
  }
`;
const StyledP = styled.p`
  border-bottom: 1px solid ${palette.gray[3]};
  padding-bottom: 0.7rem;
  margin-bottom: 0;

  span {
    margin-left: 0.3rem;
    color: ${palette.blue[3]};
  }
`;

const Like =({onClick, addlike, iine}) => {

  const onLiked = (e) =>{
    e.preventDefault();
    onClick();
  }
  return (
    <>
      <StyledP>
        いいね!
        <span>{addlike.length}</span>
      </StyledP>
      <LikeBlock>
        <ul id="listUsername">{addlike.map((like)=><li key={like}>{like},</li>)}</ul>
        <Button id="likeButton" onClick={onLiked} >
          {
          iine ? <AiTwotoneLike className="icon" />: 
                 <AiOutlineLike className='icon' />
          }
          <span id="text">いいね</span>
        </Button>
      </LikeBlock>
    </>
  );
};

export default Like;
