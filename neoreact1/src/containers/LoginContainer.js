import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AuthForm from '../components/auth/AuthForm';
import { changeForm, initialize, login } from '../modules/auth';
import { withRouter } from 'react-router';
import { check } from '../modules/user';
import ExAuthForm from '../components/auth/ExAuthForm';

const LoginContainer = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;

    dispatch(
      changeForm({
        form: 'login',
        key: name,
        value,
      })
    );
  };

  const onGoogleLogin = () => {};

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;

    if ([username, password].includes('')) {
      setError('すべてご入力してください！');
      return;
    }
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (auth) {
      dispatch(check());
    }
    if (authError) {
      setError(authError.response.data.message);
      return;
    }
  }, [auth, authError, dispatch]);
  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.log('ローカルストレージの問題が発生しました');
      }
    }
  }, [history, user]);

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <>
      <AuthForm
        type="login"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
      <ExAuthForm onGoogleLogin={onGoogleLogin} />
    </>
  );
};
export default withRouter(LoginContainer);
