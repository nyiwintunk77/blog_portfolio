import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MyPage from '../components/auth/MyPage';
import { withRouter } from 'react-router';

const MyPageContainer = ({ history }) => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  useEffect(() => {
    if (user === null) {
      history.push('/');
    }
  }, [history, user]);

  const myInfo = JSON.parse(localStorage.getItem('auth'));

  return <MyPage myInfo={myInfo} />;
};

export default withRouter(MyPageContainer);
