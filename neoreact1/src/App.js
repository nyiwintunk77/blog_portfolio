import React from 'react';
import { Route } from 'react-router';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReadPage from './pages/PostReadPage';
import WritePage from './pages/WritePage';
import './App.css';
import UserInfo from './pages/UserInfo';
import UpdateUserPage from './pages/UpdateUserPage';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <div className="App">
        <Helmet>
          <title>Tomato World</title>
        </Helmet>
        <Route component={PostListPage} path="/" exact />
        <Route component={LoginPage} path="/login" />
        <Route component={RegisterPage} path="/register" />
        <Route component={ReadPage} path="/:username/:postId" />
        <Route component={WritePage} path="/write" />
        <Route component={UserInfo} path="/userInfo" />
        <Route component={UpdateUserPage} path="/updateuser" /> 
    </div>
  );
}

export default App;
