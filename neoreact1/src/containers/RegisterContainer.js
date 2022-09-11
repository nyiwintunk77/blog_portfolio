import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AuthForm from '../components/auth/AuthForm';
import { changeForm, initializeForm, register } from '../modules/auth';
import { withRouter } from 'react-router';
import { check } from '../modules/user';

const RegisterContainer = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;

    dispatch(
      changeForm({
        form: 'register',
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { username, password, passwordConfirm, email, phone } = form;

    if (password !== passwordConfirm) {
      setError('パスワードを入力してください！');
      return;
    }

    if ([username, password, passwordConfirm, email].includes('')) {
      setError('すべてご入力してください！');
      return;
    }
    dispatch(
      register({
        username,
        password,
        passwordConfirm,
        email,
        phone,
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(initializeForm('register'));
    };
  }, [dispatch]);

  useEffect(() => {
    if (auth) {
      dispatch(check());
    }
    if (authError) {
      setError(authError.response.data.message);
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [history, user]);

  return (
    <>
      <AuthForm
        type="register"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={error}
      />
    </>
  );
};

export default withRouter(RegisterContainer);
