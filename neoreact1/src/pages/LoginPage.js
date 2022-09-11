import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginContainer from '../containers/LoginContainer';
import GnbContainer from '../containers/GnbContainer';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
  return (
    <>
      <Helmet>
          <title>ログイン - Tomato World</title>
      </Helmet>
      <GnbContainer />
      <AuthTemplate>
        <LoginContainer />
      </AuthTemplate>
    </>
  );
};

export default LoginPage;
