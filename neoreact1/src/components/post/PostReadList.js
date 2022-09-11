import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
import { withRouter } from 'react-router';
import moment from 'moment';
import { RiMenu3Line } from 'react-icons/ri';

const PostReadListBlock = styled.div`
  margin-top: 3rem;
  font-size: 1rem;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th {
    font-weight: normal;
    border-bottom: 2px solid;
    padding: 10px;
    :nth-child(odd) {
      text-align: left;
    }
    :nth-child(even) {
      font-weight: bold;
      cursor: pointer;
      text-align: right;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .icon {
    font-size: 23px;
    color: ${palette.gray[7]};
    :hover {
      color: ${palette.gray[6]};
    }
  }
  td {
    font-size: 0.8rem;
    border-bottom: 1px solid ${palette.gray[3]};
    padding: 10px;
    :nth-child(odd) {
      cursor: pointer;
      text-align: left;
      &:hover {
        text-decoration: underline;
      }
    }
    :nth-child(even) {
      text-align: right;
    }
  }
  .currentPost {
    font-weight: bold;
  }
  .button-group {
    margin-top: 1rem;
    font-size: 0.8rem;
    text-align: center;
    .prev {
      margin-right: 0.5rem;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .next {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const PostReadList = ({ onPostClick, onListClick, posts, post }) => {
  if (!post) return null;

  return (
    <PostReadListBlock>
      <table>
        <thead>
          <tr>
            <th>トマトblogカテゴリー</th>
            <th onClick={onListClick}>
              <RiMenu3Line className="icon" />
            </th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.map((p, index) => (
              <tr key={index}>
                <td
                  className={p._id === post._id ? 'currentPost' : ''}
                  onClick={() => onPostClick(p._id)}
                >
                  {p.title}
                </td>
                <td>{moment(p.createDate).format('YYYY-MM-DD HH:mm')}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </PostReadListBlock>
  );
};
export default withRouter(PostReadList);
