import React from 'react';
import GnbContainer from '../containers/GnbContainer';
import WriteTemplate from '../components/write/WriteTemplate';
import WriteContainer from '../containers/WriteContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
  return (
    <>
      <GnbContainer />
      <Helmet>
          <title>新しい記事を書く - Tomato World</title>
      </Helmet>
      <WriteTemplate>
        <WriteContainer />
      </WriteTemplate>
    </>
  );
};

export default WritePage;
