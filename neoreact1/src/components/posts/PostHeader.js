import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
import SearchBox from './SearchBox';

const PostHeaderBlock = styled.div`
    padding-left: 2px;
    padding-right: 2px;
    padding-bottom: 0.5rem;
    width: 100%;
    display: flex;
    line-height: 1rem;
    border-width: 0 0 1px 0;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;

    .icon {
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        background: ${palette.blue[5]};
        width: 35px;
        height: 35px;
        font-size: 1rem;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }

    button {
        cursor: pointer;
        font-weight: bold;
        background-color: white;
        &:hover {
            background-color: white;
        }
    }
`;

const PostHeader = ({ searchKeyword, option, onChangeinput, onChangeOption, onSubmit, writeButton }) => {
    return (
        <PostHeaderBlock>
            <SearchBox
                searchKeyword={searchKeyword}
                option={option}
                onChangeinput={onChangeinput}
                onChangeOption={onChangeOption}
                onSubmit={onSubmit}
            />
            {writeButton}
        </PostHeaderBlock>
    );
};

export default PostHeader;
