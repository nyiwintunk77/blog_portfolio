import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import GnbContainer from '../containers/GnbContainer';
import RegisterContainer from '../containers/RegisterContainer';
import { Helmet } from 'react-helmet-async';

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>会員登録 - Tomato World</title>
      </Helmet>
      <GnbContainer />
      <AuthTemplate>
        <RegisterContainer />
      </AuthTemplate>
    </>
  );
};

export default RegisterPage;
