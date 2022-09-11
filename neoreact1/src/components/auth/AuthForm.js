import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../lib/palette";
import Button from "../common/Button";

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[7]};
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  outline: none;
  border-bottom: 1px solid ${palette.gray[3]};
  border-radius: 4px;
  padding: 0.5rem;
  width: 100%;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  box-sizing: border-box;

  &:focus {
    border: 1px solid ${palette.grape[4]};
  }

  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  font-size: 0.8rem;
  a {
    text-decoration: none;
    color: ${palette.gray[6]};
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ErrorBlock = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 1rem;
  text-align: center;
`;

const textMap = {
  login: "LOG IN",
  register: "REGISTER",
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const title = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          placeholder="username"
          name="username"
          onChange={onChange}
          value={form.username}
        />
        <StyledInput
          placeholder="password"
          name="password"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === "register" && (
          <>
            <StyledInput
              placeholder="password confirm"
              name="passwordConfirm"
              type="password"
              onChange={onChange}
              value={form.passwordConfirm}
            />
            <StyledInput
              placeholder="email"
              name="email"
              type="email"
              onChange={onChange}
              value={form.email}
            />
            <StyledInput
              placeholder="phone"
              name="phone"
              type="tel"
              onChange={onChange}
              value={form.phone}
            />
          </>
        )}
        {error && <ErrorBlock>{error}</ErrorBlock>}
        <Button fullWidth style={{ marginTop: "1rem" }}>
          {title}
        </Button>
      </form>
      <Footer>
        {type === "login" ? (
          <Link to="/register">Sign Up</Link>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
