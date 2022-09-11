import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import palette from '../../lib/palette';

const SearchBoxBlock = styled.div`


    .contentSearch {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .searchSelect {
        display: flex;
        align-items: center;
        border-radius: 4px;
        box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.15);
        padding-bottom: 0.1rem;
        padding-left: 0.4rem;
        padding-right: 0.4rem;
        font-size: 0.8rem;
        height: 2rem;
    }

    .searchInput {
        width: 200px;
        border: none;
        margin-left: 0.5rem;
        font-size: 0.8rem;
        border: 0;
        border-radius: 4px;
        padding: 0.5rem;
        outline: none;
        background-color: ${palette.gray[2]};
        box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.15);
    }

    input[type='search']::-webkit-search-cancel-button {
        -webkit-appearance: none;
        height: 1rem;
        width: 1rem;
        outline: none;
        content: url(https://www.tomatopt.work/img/flat-clear.png);
        cursor: pointer;
    }

    .searchBtn {
        border: none;
        background: none;
        color: black;
        cursor: pointer;
        &:hover {
            background: none;
        }
        margin-left: 0.5rem;
    }
`;

const SearchBox = ({ onChangeOption, option, onChangeinput, searchKeyword, onSubmit }) => {
    return (
        <SearchBoxBlock>
            <form className="contentSearch" onSubmit={onSubmit}>
                <select onChange={onChangeOption} defaultValue={option} className="searchSelect">
                    <option value="title">タイトル</option>
                    <option value="content">内容</option>
                </select>
                <input
                    onChange={onChangeinput}
                    value={searchKeyword}
                    className="searchInput"
                    placeholder="入力して検索してください。。"
                    type="search"
                />
                <FaSearch size={20} onClick={onSubmit} className="searchBtn" />
            </form>
        </SearchBoxBlock>
    );
};

export default SearchBox;
