import React from 'react';
import styled from 'styled-components';
import qs from 'qs';
import { withRouter } from 'react-router';
import Button from '../common/Button';
import palette from '../../lib/palette';

const PagingBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  button {
    border: none;
    outline: none;
    cursor: pointer;
    background: white;
    color: black;
    padding: 0.25rem 1rem;
    font-weight: 500;
    &:hover {
      background: none;
      text-decoration: underline;
    }

    &:disabled {
      color: ${palette.gray[6]};
      cursor: default;
      &:hover {
        text-decoration: none;
        font-weight: 500;
      }
    }
  }
  .currentPage {
    color: ${palette.blue[5]};
    font-weight: bold;
    &:hover {
      text-decoration: none;
    }
  }
  @media (max-width: 450px) {
    button {
      padding: 0.25rem 0.5rem;
    }
  }
`;

const clickPage = ({ page }) => {
  const query = qs.stringify({ page });
  return `/?${query}`;
};
const PostPaging = ({
  option,
  searchKeyword,
  tag,
  page,
  username,
  lastPage,
  history,
}) => {
  const goPage = page => {
    const PAGE = page.target.innerText;
    const url = qs.stringify({
      option,
      searchKeyword,
      tag,
      page: PAGE,
      username,
    });
    history.push(`/?${url}`);
  };

  let counter = [];

  for (let i = 1; i < lastPage + 1; i++) {
    counter.push(
      <Button
        key={i}
        onClick={goPage}
        className={i === page ? 'currentPage' : ''}
      >
        {i}
      </Button>
    );
  }

  const prePage = page === 1 ? undefined : clickPage({ page: page - 1 });
  const nextPage =
    page === lastPage ? undefined : clickPage({ page: page + 1 });
  if (lastPage === 0) return '検索結果はありません。';
  return (
    <PagingBlock>
      <Button disabled={page === 1} to={prePage}>
        前へ
      </Button>
      {counter}
      <Button disabled={page === lastPage} to={nextPage}>
        次へ
      </Button>
    </PagingBlock>
  );
};

export default withRouter(PostPaging);
