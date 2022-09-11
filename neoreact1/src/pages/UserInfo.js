import React from 'react';
import GnbContainer from '../containers/GnbContainer';
import UserInfoContainer from '../containers/UserInfoContainer';
import { Helmet } from 'react-helmet-async';

const UserInfo = () => {
  return (
    <>
      <Helmet>
        <title>会員情報 - Tomato World</title>
      </Helmet>
      <GnbContainer />
      <UserInfoContainer />
    </>
  );
};

export default UserInfo;
