import React from 'react';
import GnbContainer from '../containers/GnbContainer';
import AuthTemplate from '../components/auth/AuthTemplate';
import MyPageContainer from '../containers/MyPageContainer';
import { Helmet } from 'react-helmet-async';

const MyPage = () => {
  return (
    <>
      <Helmet>
          <title>私の情報 - Tomato World</title>
      </Helmet>
      <GnbContainer />
      <AuthTemplate>
        <MyPageContainer />
      </AuthTemplate>
    </>
  );
};

export default MyPage;
